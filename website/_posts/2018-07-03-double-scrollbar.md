---
layout: post
title: "踩坑页面蒙层导致的双滚动条"
date: "2018-07-03"
abstract: "习惯性记录日常工作所遇坑点，不仅仅是经验分享，真心希望走过路过的大神留言赐教！"
keywords: ["前端黑科技"]
thumb: "https://sunmengyuan.github.io/materials/garden/post/double-scrollbar/thumb.png"
---

场景如述：蒙层下一可滚动加载的 List，蒙层上一可滚动加载的 List。

![](https://sunmengyuan.github.io/materials/garden/post/double-scrollbar/example.png)

目标为蒙层展现时下层滚动不触发，几种解决方案：

+ 禁用下层 touch 事件

+ 禁用下层滚动事件

+ 裁切下层溢出屏幕元素曲线禁用下层滚动事件

禁用 touch 事件，你可分别禁用 touchstart、touchmove、touchend，也可巧妙的为元素设置 touch-action: none 属性。但滚动滑块依然存在：

![](https://sunmengyuan.github.io/materials/garden/post/double-scrollbar/slider.png)

用户无法触摸触发滚动但可拖动滑块触发滚动...

于是乎将下层元素裁切至与屏幕等高，无溢出自然不会触发滚动，裁切方案如下：

+ 蒙层呈现时设置下层元素高度为屏幕可用高度，并添加 overflow: hidden 属性；蒙层消失时恢复元素默认设置。

+ 蒙层呈现时为下层元素添加 fixed 定位属性；蒙层消失时恢复元素默认设置。

```css
{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
```

方案二显然优于方案一，因未动用 JS 且考虑大多人区分不清 availHeight、clientHeight、offsetHeight、scrollHeight...

但蒙层消失时下层的 scrollTop 未恢复...

假定下层 List 含 100 条数据，用户滚动浏览至第 60 ~ 70 条这一屏时开启蒙层，下层元素被裁切默默恢复 scrollTop = 0。蒙层关闭时将为用户呈现第 0 ~ 10 条数据而非第 60 ~ 70 条，用户想继续浏览第 70 ~ 100 条则需疯狂上拉页面。

故在开启蒙层前记录此刻 scrollTop 值，关闭蒙层时恢复下层 scrollTop。然 scrollTop 的获取与设置依然有坑，存在以下两种方式：

+ __document.documentElement.scrollTop__

```js
var scrollTop = document.documentElement.scrollTop
document.documentElement.scrollTop = scrollTop
```

+ __document.body.scrollTop__

```js
var scrollTop = document.body.scrollTop
document.body.scrollTop = scrollTop
```

部分浏览器支持 document.documentElement.scrollTop 而部分支持 document.body.scrollTop，所幸其中一者有值另一者必为 0，取巧方案：

```js
var scrollTop = document.documentElement.scrollTop + document.body.scrollTop
document.documentElement.scrollTop = scrollTop
document.body.scrollTop = scrollTop
```

不幸的是，即便裁切元素可防止触摸蒙层时下层滚动，但滚动事件依然透至下层，导致上层滚动卡涩。IOS 如是，Android 经住了考验（Android 终于胜出一局）。

上述方案有缺陷，希望走过路过的大神留言赐教！

*****

作者：呆恋小喵

我的后花园：<https://sunmengyuan.github.io/garden/>

我的 github：<https://github.com/sunmengyuan>

原文链接：<https://sunmengyuan.github.io/garden/2018/07/03/double-scrollbar.html>
