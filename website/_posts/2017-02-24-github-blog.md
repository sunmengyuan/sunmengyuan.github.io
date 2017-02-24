---
layout: post
title: "使用 jekyll + github Page 搭建个人网站"
date: "2017-02-24"
abstract: ""
keywords: ["github Page", "jekyll", "个人技术博客"]
---

### 一、创建 github 账号

若尚未申请 github 账号，请移驾此处 <https://github.com/> 进行注册。

github 用户名是可以修改的：

![github 用户名变更](http://olvck72xe.bkt.clouddn.com/change-username.png)

若执行上述操作后发现用户名仍未变更，其原因多半是该用户名已被占用（提示信息不明显，以致很多人不明修改失败的原因）。

![github 用户名变更失败](http://olvck72xe.bkt.clouddn.com/change-username-alert.png)

### 二、新建仓库

使用 github 托管个人网站时，所对应仓库的命名是有规则的：【github 用户名】.github.io。例如本人的用户名为 sunmengyuan，那么我的个人网站所对应的仓库名为 sunmengyuan.github.io。

下面，开始创建新仓库：

![创建 github 仓库](http://olvck72xe.bkt.clouddn.com/create-repository.png)

最后，将项目克隆至本地：

![克隆 github 项目至本地](http://olvck72xe.bkt.clouddn.com/clone-repository.png)

### 三、搭建个人网站

github 有许多模板主题可供选择，相关代码可自动生成：

但本人更倾向于自行搭建模板，一是因为与其改别人的不如自己写，二是为了令自己的网站更符合个人审美，三是因为作为一枚傲娇的前端工程师套用别人的模板实在说不过去。

下面来一句广告语，欢迎参观呆恋小喵的后花园 <https://sunmengyuan.github.io>，你可能觉得它不够漂亮，但是我喜欢。该网站使用 jekyll 框架搭建，教程在此 <http://jekyll.com.cn/>。

#### * 关于 jekyll

jekyll 是一种静态站点生成工具，它可以使发表文章的过程简化为添加并撰写一篇 markdown 文档。欲使用 jekyll 首先需要安装它，安装完成后创建项目并启动服务（端口号默认 4000）。
