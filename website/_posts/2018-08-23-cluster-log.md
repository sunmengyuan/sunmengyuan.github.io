---
layout: post
title: "探索 PM2 Cluster 模式下 Log4js 日志丢失"
date: "2018-08-23"
abstract: "PM2 Cluster 与 Log4js 相撞时，砸出了大坑，本人踩了进去。"
keywords: ["node.js", "log4js", "pm2", "pm2 cluster"]
thumb: "https://sunmengyuan.github.io/materials/garden/post/cluster-log/thumb.png"
---

Node 应用为单线程应用，JS 虽可利用异步 I/O 避免线程阻塞，但无法利用多核 CPU 的优势提升运行效率，提高吞吐量仍需多线程。Node Cluster 可产生多个工作线程共享同一 TCP 连接，主线程通过 IPC 通道与工作线程通讯，并使用 [Round-robin](https://en.wikipedia.org/wiki/Round-robin_scheduling) 负载均衡极好的处理线程间压力。

PM2 Cluster 使得 Node 操作集群更加容易，PM2 会根据服务器 CPU 核数产生相应的工作线程，只需按如下方式启动应用：

```bash
pm2 start app.js -i 0
```

![](https://sunmengyuan.github.io/materials/garden/post/cluster-log/pm2-cluster.png)

但 PM2 Cluster 与 Log4js 相撞时，砸出了大坑，本人踩了进去。

踩坑经过：某日服务端同学上报了一线上请求参数异常日志，为追踪异常产生原因，我在所有线上服务器翻查均未寻到相关日志。服务端异常日志并非捏造，前端日志丢失并非偶然。为统计日志丢失率，在线下环境定量发起 100 条请求，结果仅产生 25 条日志，多次实验发现丢失率稳定在 3/4 令人发指！热（好）爱（奇）技（心）术（重）的我查阅了 Log4js 源码：

```js
configuration.addListener((config) => {
    // clear out the listeners, because configure has been called.
    listeners.length = 0;

    disabled = config.disableClustering;
    pm2 = config.pm2;
    pm2InstanceVar = config.pm2InstanceVar || 'NODE_APP_INSTANCE';

    debug(`clustering disabled ? ${disabled}`);
    debug(`cluster.isMaster ? ${cluster.isMaster}`);
    debug(`pm2 enabled ? ${pm2}`);
    debug(`pm2InstanceVar = ${pm2InstanceVar}`);
    debug(`process.env[${pm2InstanceVar}] = ${process.env[pm2InstanceVar]}`);

    // just in case configure is called after shutdown.
    if (pm2) {
        process.removeListener('message', receiver);
    }
    if (cluster.removeListener) {
        cluster.removeListener('message', receiver);
    }

    if (config.disableClustering) {
        debug('Not listening for cluster messages, because clustering disabled.');
    } else if (isPM2Master()) {
        // PM2 cluster support
        // PM2 runs everything as workers - install pm2-intercom for this to work.
        // we only want one of the app instances to write logs.
        debug('listening for PM2 broadcast messages');
        process.on('message', receiver);
    } else if (cluster.isMaster) {
        debug('listening for cluster messages');
        cluster.on('message', receiver);
    } else {
        debug('not listening for messages, because we are not a master process.');
    }
});
```

请注意：

> PM2 runs everything as workers - install pm2-intercom for this to work.

Log4js 在 Cluster 模式下，worker 将日志发送至 master，master 实现日志写入文件。但在 PM2 Cluster 模式下，所有进程皆为 worker：

![](https://sunmengyuan.github.io/materials/garden/post/cluster-log/pm2-pid.png)

于是按照 Log4js 源码的指引安装 pm2-intercom 进程间通讯模块：

![](https://sunmengyuan.github.io/materials/garden/post/cluster-log/pm2-intercom.png)

仍不奏效，又注意到 isPM2Master()：

```js
const isPM2Master = () => pm2 && process.env[pm2InstanceVar] === '0';
const isMaster = () => disabled || cluster.isMaster || isPM2Master();
```

isPM2Master 通过 Log4js configure 中 pm2 及 pm2InstanceVar 参数确定，于是修改 Log4js 配置如下：

```js
Log4JS.configure({
    // ...
    pm2: true,
    pm2InstanceVar: 'INSTANCE_ID'
});
```

终于解决了 PM2 Cluster 模式下 Log4js 日志丢失问题。

*****

补充一下：

自行实现 Node Cluster：

```js
const OS = require('os');
const Cluster = require('cluster');
const Koa = require('koa');
const App = new Koa();
if (Cluster.isMaster) {
    for (let i = 0; i < OS.cpus().length; i++) Cluster.fork();
    console.log('master', process.pid);
} else {
    App.listen(3000);
    console.log('worker', process.pid);
}
```

端口 PID 与控制台显示的 PID List 关系：

![](https://sunmengyuan.github.io/materials/garden/post/cluster-log/node-pid.png)

![](https://sunmengyuan.github.io/materials/garden/post/cluster-log/port-pid.png)

使用 PM2 Cluster 启动 Node 应用，端口 PID 与 PM2 控制台显示的 PID List 关系：

![](https://sunmengyuan.github.io/materials/garden/post/cluster-log/pm2-pid.png)

*****

作者：呆恋小喵

我的后花园：<https://sunmengyuan.github.io/garden/>

我的 github：<https://github.com/sunmengyuan>

原文链接：<https://sunmengyuan.github.io/garden/2018/08/23/cluster-log.html>
