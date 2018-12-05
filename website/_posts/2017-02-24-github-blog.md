---
layout: post
title: "使用 Jekyll + Github Pages 搭建个人网站"
date: "2017-02-24"
abstract: "前段时间，朋友问我如何高大上地展现个人作品。既然要求高大上，无外乎易传播、体验好、摒除纸媒，那就以线上的方式将自己的作品丢给面试官呗（朋友在求职）。我向她推荐了 github pages，一来无需购买服务器及域名，二则因为按照她的需求一个静态站点足矣。本文算是为朋友量身打造，比较适合小白食用，介绍了如何使用静态站点生成工具 jekyll 及 github 服务器搭建个人网站。大神请飘过但不反对批评指正，万分感谢。"
keywords: ["github pages", "jekyll", "个人网站搭建"]
thumb: "https://sunmengyuan.github.io/materials/garden/post/github-blog/thumb.jpg"
---

### 一、创建 github 账号

若尚未申请 github 账号，请移驾[此处](https://github.com/)进行注册。

github 用户名是可以修改的：

![](https://sunmengyuan.github.io/materials/garden/post/github-blog/change-username.png)

若执行上述操作后发现用户名仍未变更，其原因多半是该用户名已被占用（提示信息不明显，以致很多人不明修改失败的原因）。

![](https://sunmengyuan.github.io/materials/garden/post/github-blog/change-username-alert.png)

### 二、新建仓库

使用 github 托管个人网站时，所对应仓库的命名是有规则的：___[github 用户名].github.io___。例如本人的用户名为 sunmengyuan，那么我的个人网站所对应的仓库名为 sunmengyuan.github.io。

下面，开始创建新仓库：

![](https://sunmengyuan.github.io/materials/garden/post/github-blog/create-repository.png)

最后，将项目克隆至本地：

![](https://sunmengyuan.github.io/materials/garden/post/github-blog/clone-repository.png)

### 三、搭建个人网站

github 有许多模板主题可供选择，相关代码可自动生成：

![](https://sunmengyuan.github.io/materials/garden/post/github-blog/select-theme.png)

但本人更倾向于自行搭建模板：一是因为与其改别人的不如自己写；二是为了令自己的网站更符合个人审美；三是因为作为一枚傲娇的前端工程师套用别人的模板实在说不过去。

下面来一句广告语，欢迎参观[呆恋小喵的后花园](https://sunmengyuan.github.io)，你可能觉得它不够漂亮，但是我喜欢。该网站使用 jekyll 框架搭建，图片资源使用七牛托管。为何要将资源托管呢？因为 github pages 的免费空间有限啊，图片辣么大不是么。

*****

#### * 关于 jekyll

jekyll 是一种静态站点生成工具，它可以使发表文章的过程简化为添加并撰写一篇 markdown 文档。

下面，___以本人的个人网站为例___，简单介绍 jekyll 的使用方法，更多内容请参阅[官方文档](http://jekyll.com.cn/)。

目录结构如下：_layouts 内的文件为骨架模板；_posts 内的 markdown 文件会转化为我们所需发表的文章；assets 含一些静态资源文件；views 包含站点内的所有页面；_config.yml 为配置文件。

![](https://sunmengyuan.github.io/materials/garden/post/github-blog/jekyll-catalog.png)

##### * 关于 jekyll 开发环境

为何需要开启 jekyll 服务？一是使 jekyll 可自动编译文件从而生成静态站点；二是方便在开发环境预览修改效果。

```bash
# 启动 jekyll 服务
jekyll server
```

注意事项：

+ jekyll 服务的启动应在含 _config.yml 文件的目录下。

+ 启动 jekyll 服务时若提示含未安装插件，请查看 _config.yml 文件中的 gems 配置项并将所需插件一一安装。

*****

不介意各位[下载本人的原创模板](https://github.com/sunmengyuan/sunmengyuan.github.io/tree/master/website)做实验，将它拷贝至你的 [github 用户名].github.io 仓库并提交。不了解 git 命令行的同学请查阅[教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)。

现在，访问 __[github 用户名].github.io/garden/__ 会有惊喜嗷~

恭喜你可以愉快的撰写文档了！今后，增删文章只需在 _posts 文件夹内增删对应的 markdown 文件，若想在本地预览效果，只需启动 jekyll 服务并访问 <http://localhost:4000/garden/>。

*****

作者：呆恋小喵

我的后花园：<https://sunmengyuan.github.io/garden/>

我的 github：<https://github.com/sunmengyuan>

原文链接：<https://sunmengyuan.github.io/garden/2017/02/24/github-blog.html>
