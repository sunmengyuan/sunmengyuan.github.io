---
layout: post
title: "Node 最佳实践-Going To Production Practices"
date: "2019-03-04"
abstract: "Node 最佳实践读书笔记~"
keywords: ["node", "production"]
thumb: "https://sunmengyuan.github.io/materials/garden/post/node-production/thumb.jpg"
---

### Monitoring

#### 吞吐量

固定时间应用访问量波动不应过大。

+ 骤升：运营活动？请求延时引发用户过频点击？...

+ 骤降：服务异常阻塞访问？...

#### 错误率

+ 系统异常

+ 业务异常

+ ...

#### 响应时长

+ 分位统计

+ 延时分布：优化较慢 API 节点、...

+ ...

#### 饱和度

+ CPU 使用率：Node 不宜处理 CPU 密集型任务、...

+ 内存使用率：关注内存泄露、...

+ ...

### Increase transparency using smart logging

#### 格式化

时间、系统、用户、transactionID、...

#### 聚合

#### 解析

#### 可视化

### Delegate anything possible (e.g. gzip, SSL) to a reverse proxy

Node 不宜处理 Gzipping、SSL Termination 等 CPU 密集型任务，请使用 Nginx。

### Lock dependencies

依赖版本需在所有环境一致。

### Guard process uptime using the right tool

进程守护：<https://www.cnblogs.com/lggggg/p/6970395.html>

### Utilize all CPU cores

PM2 Cluster：<https://www.cnblogs.com/jaxu/p/5193643.html>

### Create a 'maintenance endpoint'

### Discover errors and downtime using APM products

应用性能管理：<https://www.toushibao.com/product_server.html>

### Make your code production-ready

12 因素指南：

### Measure and guard the memory usage

关注内存泄露：

<http://www.ruanyifeng.com/blog/2017/04/memory-leak.html>

<https://www.cnblogs.com/woniubushinide/p/8024051.html>

### Get your frontend assets out of Node

Node 宜处理动态服务，请将静态资源托管至 CDN。

### Be stateless, kill your servers almost every day

无状态：

### Use tools that automatically detect vulnerabilities

漏洞检测工具：

### Assign a transaction id to each log statement

transactionID：

### Set NODE_ENV=production

NODE_ENV：

### Design automated, atomic and zero-downtime deployments

自动化部署：
