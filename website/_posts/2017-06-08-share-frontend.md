---
layout: post
title: "分享我的前端学习之旅"
date: "2017-06-08"
abstract: "从事前端开发近 2 年，积攒了一些学习资料与大家分享。在日常工作中极少应用到下述知识，示例代码完全因个人兴趣而生，不地道之处欢迎大家前来吐槽指导！"
keywords: ["前端开发", "前端框架"]
thumb: "https://sunmengyuan.github.io/materials/garden/post/share-frontend/thumb.jpg"
---

### Node.js ###

##### 参考资料 #####

+ [Node.js 开发指南](https://pan.baidu.com/s/18XYAv7qVd1vpkLfX1B4REw)

+ [深入浅出 Node.js](https://pan.baidu.com/s/1_asQd0U071WQIwJ9yYRfhQ)

+ [Node.js 中文网](http://nodejs.cn/)

##### 示例 #####

+ __简易博客系统 [code](https://github.com/sunmengyuan/metis/tree/master/node/expo)__

    ![](https://sunmengyuan.github.io/materials/garden/post/share-frontend/screenshot-expo.jpg)
    
    这是一个简易的博客系统，用户在该站注册后即可发布个人日记，日记可以被登录用户点赞。功能较简易，外观未经雕琢，纯粹的练习项目。[详情](https://github.com/sunmengyuan/metis/tree/master/node/expo)
    
    相关知识：[Express.js](http://www.expressjs.com.cn/)、[File System](http://nodejs.cn/api/fs.html)、[MongoDB](https://www.mongodb.com/)、[Mongoose](http://www.nodeclass.com/api/mongoose.html)

    该项目使用 Express.js 框架搭建，使用 MongoDB 存储数据。图片上传涉及文件存储请查阅 [Node.js 文件系统](http://nodejs.cn/api/fs.html)。

+ __多人聊天室 [code](https://github.com/sunmengyuan/metis/tree/master/node/chat)__

    ![](https://sunmengyuan.github.io/materials/garden/post/share-frontend/screenshot-chat.jpg)

    Node.js 结合了 Websocket 的简易多人聊天室，感兴趣的同学可以自行高仿个 QQ 出来。[详情](https://github.com/sunmengyuan/metis/tree/master/node/chat)
    
    相关知识：[Express.js](http://www.expressjs.com.cn/)、[Websocket](https://socket.io/)、[MongoDB](https://www.mongodb.com/)、[Mongoose](http://www.nodeclass.com/api/mongoose.html)
   
    该项目使用 Express.js 框架搭建，使用 MongoDB 存储数据。核心内容在于全双工通讯请查阅 [Websocket](https://socket.io/)。

__开启自恋模式__ 欢迎欣赏本人深度好文：

+ [NodeJS 小工具推荐](https://sunmengyuan.github.io/garden/2017/10/20/node-tool.html)    

+ [我的 Mock Server - Meow Mock](https://sunmengyuan.github.io/garden/2017/09/15/meow-mock.html)
    
*****

### Vue.js ###

##### 参考资料 #####

+ [Vue.js](http://cn.vuejs.org/)

##### 示例 #####

+ __简易个人空间 [code](https://github.com/sunmengyuan/metis/tree/master/vue/zone)__

    ![](https://sunmengyuan.github.io/materials/garden/post/share-frontend/screenshot-zone.jpg)
    
    与上面提到的博客系统类似，教科书级别的增删改查功能。[详情](https://github.com/sunmengyuan/metis/tree/master/vue/zone)
    
    相关知识：[Node.js](http://nodejs.cn/)、[Express.js](http://www.expressjs.com.cn/)、[File System](http://nodejs.cn/api/fs.html)、[MongoDB](https://www.mongodb.com/)、[Mongoose](http://www.nodeclass.com/api/mongoose.html)、[Webpack](https://webpack.github.io/docs/)

    该项目客户端使用 Vue.js 搭建，服务端使用 Express.js 搭建，使用 MongoDB 存储数据。图片上传涉及文件存储请查阅 [Node.js 文件系统](http://nodejs.cn/api/fs.html)。工程构建使用 [Webpack](https://webpack.github.io/docs/) 建议了解。背景设计使用 [Trianglify](https://github.com/qrohlf/trianglify) 在此推荐。

+ __简易视频播放器 [code](https://github.com/sunmengyuan/metis/tree/master/vue/videoPlayer) [demo](https://sunmengyuan.github.io/demos/vue/videoPlayer)__

    ![](https://sunmengyuan.github.io/materials/garden/post/share-frontend/screenshot-videoPlayer.jpg)
    
    基于 Vue.js 组件化的思想，将播放器控件封装。并尝试了 Vue.js 的打包上线流程，遇到了点小挫折，压缩后静态资源地址错误...[详情](https://github.com/sunmengyuan/metis/tree/master/vue/videoPlayer)
    
    相关知识：[HTML5 Video](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Using_HTML5_audio_and_video)、[Webpack](https://webpack.github.io/docs/)
    
    该项目不涉及服务端，完全使用 Vue.js 搭建。工程构建使用 [Webpack](https://webpack.github.io/docs/) 建议了解。
    
*****

### React ###

##### 参考资料 #####

+ [A JavaScript library for building user interfaces \| React](https://facebook.github.io/react/)

##### 示例 #####

+ __待办事项 [code](https://github.com/sunmengyuan/metis/tree/master/react/todos) [demo](https://sunmengyuan.github.io/demos/react/todos)__

    ![](https://sunmengyuan.github.io/materials/garden/post/share-frontend/screenshot-todos.jpg)
    
    教科书级别的待办事项记事本，不多解释。[详情](https://github.com/sunmengyuan/metis/tree/master/react/todos)
    
    相关知识：[Webpack](https://webpack.github.io/docs/)
    
    该项目不涉及服务端，完全使用 React 搭建。工程构建使用 [Webpack](https://webpack.github.io/docs/) 建议了解。

*****

### React Native ###

##### 参考资料 #####

+ [React Native 中文网](http://reactnative.cn/)

React Native 环境搭建指南，正在撰写中，敬请期待。

*****

### Canvas ###

##### 参考资料 #####

+ [HTML5 Canvas 核心技术](https://pan.baidu.com/s/1Mfb-8lMUYH6sHoh1KxKeyA)

##### 示例 #####

+ __画板 [code](https://github.com/sunmengyuan/metis/blob/master/canvas/drawing.html) [demo](https://sunmengyuan.github.io/demos/canvas/drawing.html)__

    ![](https://sunmengyuan.github.io/materials/garden/post/share-frontend/screenshot-drawing.jpg)
    
+ __贝塞尔曲线 [code](https://github.com/sunmengyuan/metis/blob/master/canvas/bezierCurve.html) [demo](https://sunmengyuan.github.io/demos/canvas/bezierCurve.html)__

    想起计算机图形学老师的一句话“咱们数字媒体技术专业知道而其他专业同学不知道的概念比如贝塞尔曲线”，现在想想老师也是蛮自恋的...

+ __使用 Canvas 实现元素拖拽 [code](https://github.com/sunmengyuan/metis/blob/master/canvas/drag.html) [demo](https://sunmengyuan.github.io/demos/canvas/drag.html)__

    使用 Canvas 实现交互非常麻烦，因为无法直接获取触发事件的元素，需要通过 [isPointInPath](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath) 方法得知。

本人学习 Canvas 最大的收获便是领悟到其实现交互的方式无非旋转画布啊，重绘啊，巴拉巴拉...

*****

### Svg ###

##### 示例 #####

+ __线描动画 [code](https://github.com/sunmengyuan/metis/blob/master/svg/cat.html) [demo](https://sunmengyuan.github.io/demos/svg/cat.html)__

+ __路径动画加蒙板实现橡皮擦特效 [code](https://github.com/sunmengyuan/metis/blob/master/svg/paint.html) [demo](https://sunmengyuan.github.io/demos/svg/paint.html)__

+ __Loading 动画 [code](https://github.com/sunmengyuan/metis/blob/master/svg/loading.html) [demo](https://sunmengyuan.github.io/demos/svg/loading.html)__

    ![](https://sunmengyuan.github.io/materials/garden/post/share-frontend/screenshot-loading.jpg)

使用 Svg 绘制的图标无限放大后不模糊这点很赞。但其更强大的功能在于动画，可惜我的示例比较简易无法体现这点...

__开启自恋模式__ 欢迎欣赏本人深度好文：[Svg 路径动画实现旋转进度条](https://sunmengyuan.github.io/garden/2017/11/16/svg-comet.html)

*****

### Three.js ###

##### 参考资料 #####

+ [Three.js 入门指南](https://read.douban.com/reader/ebook/7412854/)

##### 示例 #####

+ __三维旋转钟 [code](https://github.com/sunmengyuan/metis/blob/master/three/clock.html) [demo](https://sunmengyuan.github.io/demos/three/clock.html)__

    ![](https://sunmengyuan.github.io/materials/garden/post/share-frontend/screenshot-clock.jpg)
    
    该示例为 Canvas 与 Three.js 结合而生。表盘由 Canvas 绘制，而建模使用 Three.js。其实 Three.js 基于 Canvas，上述不太准确，意会便好。

*****

### Matter.js ###

##### 参考资料 #####

+ [Matter.js - a 2D rigid body JavaScript physics engine](http://brm.io/matter-js/)

##### 示例 #####

+ __跷跷板 [code](https://github.com/sunmengyuan/metis/blob/master/matter/seesaw.html) [demo](https://sunmengyuan.github.io/demos/matter/seesaw.html)__

    ![](https://sunmengyuan.github.io/materials/garden/post/share-frontend/screenshot-seesaw.jpg)

    一个最基本的 Matter.js 示例，类似的甚至更炫丽的在官网上有很多很多...

*****

### Less ###

##### 参考资料 ####

+ [Less 中文网](http://lesscss.cn/)

*****

### Sass ###

##### 参考资料 #####

+ [Sass 入门 - Sass 教程](http://www.w3cplus.com/sassguide/)

__开启自恋模式__ 欢迎欣赏本人深度好文：[Sass 学习笔记](https://sunmengyuan.github.io/garden/2017/05/17/sass-application.html)

*****

### Echarts ###

##### 参考资料 #####

+ [Echarts](http://echarts.baidu.com/)

##### 示例 #####

+ __中国高校学科排名统计 [code](https://github.com/sunmengyuan/metis/tree/master/echarts/university) [demo](https://sunmengyuan.github.io/demos/echarts/university)__

+ __全国空气质量调查 [code](https://github.com/sunmengyuan/metis/tree/master/echarts/airpollution) [demo](https://sunmengyuan.github.io/demos/echarts/airpollution)__

![](https://sunmengyuan.github.io/materials/garden/post/share-frontend/screenshot-airpollution.jpg)

上面两个是基友的大作业啦，属于友情开发。

相关知识：[Webpack](https://webpack.github.io/docs/)

*****

### 微信小程序 ###

__开启自恋模式__ 欢迎欣赏本人深度好文：

+ [入坑微信小程序（项目搭建）](https://sunmengyuan.github.io/garden/2018/01/04/xcx-gm.html)

+ [初尝微信小程序（浪漫调酒师）](https://sunmengyuan.github.io/garden/2017/07/05/xcx-cocktail.html)

*****

作者：呆恋小喵

我的后花园：<https://sunmengyuan.github.io/garden/>

我的 github：<https://github.com/sunmengyuan>

原文链接：<https://sunmengyuan.github.io/garden/2017/06/08/share-frontend.html>
