---
layout: post
title: "尝试开发微信小程序（心得）"
date: "2017-07-05"
abstract: "业余时间开发了一枚调制鸡尾酒的小游戏，具体技术细节不在此赘述，谈些个人感受。"
keywords: ["微信小程序"]
thumb: "http://osm0bpix4.bkt.clouddn.com/thumb.jpg"
---

首先欢迎大家捧场：

![](http://osm0bpix4.bkt.clouddn.com/qrcode.jpg)

[源码](https://github.com/sunmengyuan/note/tree/master/wechat/cocktail) 

[微信小程序文档](https://mp.weixin.qq.com/cgi-bin/wx)

*****

在调试时遇到的一些兼容问题：

+ __hover-class__ 属性部分不支持

+ __open-type__ 属性部分不支持
 
+ __css3 渐变__ 部分不支持

*****

__hover-class__ 可控制元素被点击时的瞬间状态，对此我大开脑洞：是不是设置 __hover-stay-time__ 的值为正无穷 __Number.POSITIVE_INFINITY__ 便可以使瞬间状态转化为常态...很遗憾失败了。

正确的做法如下：

![](http://osm0bpix4.bkt.clouddn.com/example1-code1.jpg)

![](http://osm0bpix4.bkt.clouddn.com/example1-code2.jpg)

上述其实是使用 __Data__ 状态控制 __Dom__ 表现的通用思路，与 __jQuery__ 大大不同。顺便说下 __wx:for__ 是个好东西，对于列表结构较多的页面大大节省了 __wxml__ 代码量，当然其他框架也有类似的循环语句。

小程序中含类似事件代理的思想，详见[链接](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/event.html)中的事件对象。可将事件绑定于父元素，事件触发在于子元素。上例中的 __e.target__ 获取的便是子元素，而使用 __e.currentTarget__ 获取父元素。

*****

接下来谈谈图片缓存：

该项目的图片资源使用七牛管理，七牛本身也有缓存，但在清除七牛缓存后发现小程序内的图片缓存仍在。故点击了微信开发者工具中的如下几个按钮：

![](http://osm0bpix4.bkt.clouddn.com/clear-cache.jpg)

并不奏效...

最终的解决方案是在图片链接后加一个不痛不痒的参数，例如：http://osm0bpix4.bkt.clouddn.com/clear-cache.jpg?refresh。

*****

最后谈谈微信小程序的分享功能：

在分享 __title__ 中加入了微信用户的昵称。当时考虑若用户拒绝被获取个人信息，那么分享 __title__ 便是“我调制了一杯【鸡尾酒】，你也来试试吧！”。事实证明多此一举，当用户拒绝被获取个人信息时，分享 __title__ 就是小程序名称，而不是 __onShareAppMessage__ 中设置的 __title__ 值。

```js
var app = getApp();
Page({
    data: {
        cocktailName: '鸡尾酒'
    },
    onShareAppMessage: function () {
        return {
            title: (app.globalData.userInfo.nickName || '我') + '调制了一杯【' + this.data.cocktailName + '】，你也来试试吧！',
            desc: '调制你的专属鸡尾酒',
            path: '/pages/welcome/welcome'
        }
    }
});
```

未完待续...踩到新坑会更文~

*****

作者：呆恋小喵

我的后花园：<https://sunmengyuan.github.io/garden/>

我的 github：<https://github.com/sunmengyuan>

原文链接：<https://sunmengyuan.github.io/garden/2017/07/05/wechat-cocktail.html>
