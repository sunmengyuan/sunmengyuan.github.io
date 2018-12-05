---
layout: post
title: "谈谈 Git 代码回滚"
date: "2017-06-15"
abstract: "本文讲述了如何使用 git rebase -i 及 git cherry-pick 实现代码回滚。代码回滚属于高危操作，建议慎用！"
keywords: ["git", "代码回滚", "开发经验"]
thumb: "https://sunmengyuan.github.io/materials/garden/post/git-revert/thumb.jpg"
---

[下载示例源文件](https://sunmengyuan.github.io/materials/garden/post/git-revert/project.zip)

为什么会写这样一篇文章？其实是有一段历史的：在一次迭代中并行开发着 n 个需求，到提测之时各需求的代码陆陆续续被合并到了测试分支。生活本来很平静，但两天后测试的头目说“我们组发生了点状况，本次迭代的需求在规定时间内无法测完，但老板又强制要求了上线时间，我们把优先级较低的需求的代码从测试分支抽出去吧！”。当时真是心中一万只 XXX 飘过...

我们来模拟一下上述场景：迭代中并行开发着 3 个需求 feature1、feature2、feature3，在各自的开发分支上相安无事（假定测试分支为 master）。

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/dev-features.jpg)

其中 feature2 与 feature3 需要修改同一文件，我们故意制造了一个冲突：

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/create-conflict-feature2-feature3.jpg)

提测时间到了，feature1 的代码被合并到了测试分支：

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/merge-feature1.jpg)

在 feature1 修复了 1 个 bug 后，feature2 也提测了：

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/merge-feature2.jpg)

而后 feature3 也提测了，在合并 feature3 的代码时，刚刚制造的冲突爆发了：

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/conflict-detail-file5.jpg)

我们需要解决冲突后再合并代码：

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/merge-conflict-feature3.jpg)

在 feature3 提测后，我们又修复了几个 bug：

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/bug-file5-feature3.jpg)

当然，feature2 虽已提测但并未进入测试，bug 的修复均是针对 feature1 与 feature3 的。

此时，feature2 的测试无法正常进行，需要将代码从测试分支上抽出...

以防万一，先将 feature2 分支备份：

```bash
git checkout feature2
git checkout -b feature2-copy
```

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/copy-feature2.jpg)

我们来查看一下 feature2-copy 分支的提交记录：

```bash
git log
```

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/log-feature2.jpg)

我们需要回滚最新的 3 个提交（因为 3 个 feature 的开发分支均是从第一个提交的时间点上切出的），当然现实中针对某需求的提交绝不止 3 个。若是将提交逐一 revert 那么工作量感人，我们何不将 n 个 commit 合并为一个 commit 然后一同 revert 呢？

使用 git rebase -i 来合并 commit，需要拼接回滚至的 commit 的 hashcode：

```bash
git rebase -i e08ddaf558b9ad84422db5e4b620dcab97623fde
```

而后出现如下对话框：

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/merge-commit-init-feature2.jpg)

我们需要将最新 2 次提交的 command 更改为 s：

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/merge-commit-feature2.jpg)

修改后保存并退出进入如下对话框：

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/change-commit-init-feature2.jpg)

我们需要修改最初一次提交的 commit message：

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/change-commit-feature2.jpg)

修改后保存并退出，再次查看 feature2-copy 分支的提交记录：

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/merge-commit-log-feature2.jpg)

3 次提交被成功合并，可喜可贺！接下来我们需要 revert 被合并的提交：

```bash
git revert e544464c3de69adef5ca7556001abebaf40b218b
```

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/revert-commit-feature2.jpg)

保存并退出，再次查看 feature2-copy 分支的提交记录：

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/revert-commit-log-feature2.jpg)

此时天真的我认为将 feature2-copy 合并到测试分支即可成功抽去 feature2 的代码，其实不然。正确的做法是使用 git cherry-pick 将 feature2-copy 分支上 revert 提交合并到测试分支上：

```bash
git checkout master
git cherry-pick b309f7944d2422d8fe647dca61bda518b192628f
```

此时，feature2 的代码成功从测试分支上抽离。

![](https://sunmengyuan.github.io/materials/garden/post/git-revert/pick-success-feature2.jpg)

最后为大家推荐一枚 Git 图形化客户端：[GitUp](http://gitup.co/)

*****

作者：呆恋小喵

我的后花园：<https://sunmengyuan.github.io/garden/>

我的 github：<https://github.com/sunmengyuan>

原文链接：<https://sunmengyuan.github.io/garden/2017/06/15/git-revert.html>
