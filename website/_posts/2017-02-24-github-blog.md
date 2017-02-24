---
layout: post
title: "使用 Jekyll + Github Page 搭建个人网站"
date: "2017-02-24"
abstract: "介绍如何使用静态站点生成工具 jekyll 及 github 服务器搭建个人网站。"
keywords: ["github page", "jekyll", "个人技术博客搭建"]
---

### 一、创建 github 账号

若尚未申请 github 账号，请移驾[此处](https://github.com/)进行注册。

github 用户名是可以修改的：

![github 用户名变更](http://olvck72xe.bkt.clouddn.com/change-username.png)

若执行上述操作后发现用户名仍未变更，其原因多半是该用户名已被占用（提示信息不明显，以致很多人不明修改失败的原因）。

![github 用户名变更失败](http://olvck72xe.bkt.clouddn.com/change-username-alert.png)

### 二、新建仓库

使用 github 托管个人网站时，所对应仓库的命名是有规则的：___[github 用户名].github.io___。例如本人的用户名为 sunmengyuan，那么我的个人网站所对应的仓库名为 sunmengyuan.github.io。

下面，开始创建新仓库：

![创建 github 仓库](http://olvck72xe.bkt.clouddn.com/create-repository.png)

最后，将项目克隆至本地：

![克隆 github 项目至本地](http://olvck72xe.bkt.clouddn.com/clone-repository.png)

### 三、搭建个人网站

github 有许多模板主题可供选择，相关代码可自动生成：

![github Page 主题选择](http://olvck72xe.bkt.clouddn.com/select-theme.png)

但本人更倾向于自行搭建模板，一是因为与其改别人的不如自己写，二是为了令自己的网站更符合个人审美，三是因为作为一枚傲娇的前端工程师套用别人的模板实在说不过去。

下面来一句广告语，欢迎参观[呆恋小喵的后花园](https://sunmengyuan.github.io)，你可能觉得它不够漂亮，但是我喜欢。该网站使用 jekyll 框架搭建。

#### * 关于 jekyll

jekyll 是一种静态站点生成工具，它可以使发表文章的过程简化为添加并撰写一篇 markdown 文档。欲使用 jekyll 首先需要安装它，安装完成后创建项目并启动服务（端口号默认 4000）。

下面以本人的个人网站为例，简单介绍 jekyll 的使用方法，更多内容请参阅[官方文档](http://jekyll.com.cn/)。

目录结构如下：_layouts 内的文件为骨架模板；_posts 内的 markdown 文件会转化为我们所需发表的文章；assets 含一些静态资源文件；views 包含站点内的所有页面；_config.yml 为配置文件。待站点搭建完毕，我们只需关注 _posts 文件夹。

![jekyll 项目目录结构](http://olvck72xe.bkt.clouddn.com/jekyll-catalog.png)

不介意各位[下载本人的原创模板](https://github.com/sunmengyuan/sunmengyuan.github.io/tree/master/website)做实验，将它拷贝至你的 [github 用户名].github.io 仓库并提交。不了解 git 命令行的同学请查阅[教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)。

现在，访问 __[github 用户名].github.io/garden/__ 会有惊喜嗷 ~

恭喜你可以愉快的撰写技术文档了！今后，增删文章只需在 _posts 文件夹内增删对应的 markdown 文件，若想在本地预览效果，只需启动 jekyll 服务并访问 <http://localhost:4000/garden/>。

```bash
# 启动 jekyll 服务
cd website
jekyll server
```

*****

作者：呆恋小喵

我的网站：<https://sunmengyuan.github.io>

我的 github：<https://github.com/sunmengyuan>

原文链接：<https://sunmengyuan.github.io/garden/2017/02/24/github-blog.html>
