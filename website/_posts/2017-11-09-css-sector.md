---
layout: post
title: "纯 Css 绘制扇形"
date: "2017-11-09"
abstract: "在此分享如何纯 Css 打造圆环进度条。阅读此文需具备基本数学知识：圆心角、弧度制、三角函数。"
keywords: ["css", "css3", "sass"]
thumb: "https://sunmengyuan.github.io/materials/garden/post/css-sector/thumb.jpg"
---

为实现如下效果呕心沥血：

![](https://sunmengyuan.github.io/materials/garden/post/css-sector/example.jpg)

当然你可以拥抱 Svg...在此分享如何纯 Css 打造圆环进度条，只需三步！

![](https://sunmengyuan.github.io/materials/garden/post/css-sector/coverage.jpg)

此物乃 2 + 1 夹心饼干，蓝绿色部分为果酱。显而易见饼干为两个削成了圆形的 __div__，我们重点演示果酱是怎么制作的：

![](https://sunmengyuan.github.io/materials/garden/post/css-sector/elem-sector.jpg)

如图所示，大扇形由 __6__ 个小扇形构成，每一小扇形占整个圆饼的 __1/15__，大扇形占整个圆饼的 __6/15__。我们只需构造一个扇形单元，将其复制 6 份后旋转相应角度连接至一起即可。

如何构造扇形？用三角形伪装...

![](https://sunmengyuan.github.io/materials/garden/post/css-sector/real-feature.jpg)

三角形的宽高如何计算？假定圆半径 __$radius__ 为 100px，等分数 __$count__ 为 15。则小扇形的圆心角为 __360deg / 15__，三角形的高为 100px，宽为 __2 * 100px * tan(360deg / 15 / 2)__。其中 __360deg / 15 / 2__ 转化弧度制为 __PI / 15__（PI == 360deg / 2）。

```css
span {
    width: 0;
    height: 0;
    border: $radius solid transparent;
    $borderWidth: tan(pi() / $count) * $radius;
    border-left-width: $borderWidth;
    border-right-width: $borderWidth;
}
```

数学欠佳的同学请自行科普...

对于 __$count__ 为 __1__ 或 __2__ 的情况需特殊处理，因为 __tan(PI)__ 及 __tan(PI / 2)__ 为无穷值，不了解的同学请研究正切函数图像：

![](https://sunmengyuan.github.io/materials/garden/post/css-sector/tan.jpg)

相关代码（其中 __$diameter = 2 * $radius__ 为圆直径）：

```css
span {
    @if $count == 1 {
        width: $diameter;
        height: $diameter;
    } @else if $count == 2 {
        width: $diameter;
        height: $radius;
    } @else {
        width: 0;
        height: 0;
        border: $radius solid transparent;
        $borderWidth: tan(pi() / $count) * $radius;
        border-left-width: $borderWidth;
        border-right-width: $borderWidth;
    }
}
```

最后，复制并逐一旋转扇形单元：

```css
@for $index from 0 to $count {
    span:nth-child(#{$index + 1}) {
        $transform: translate(-50%, 0) rotate(360deg / $count / 2 + 360deg * $index / $count);
        $origin: if($count == 2, bottom, center);
        -webkit-transform: $transform;
                transform: $transform;
        -webkit-transform-origin: $origin;
                transform-origin: $origin;
    }
}
```

果酱制作完毕，其它点缀请自行添加喽...本例完整代码[在此](https://github.com/sunmengyuan/metis/tree/master/css/sector)。

*****

###### 2017/11/14 续更

由于本例引入了三角函数等数学运算，使用 __Sass__ 预编译。未安装 __Sass__ 的同学可下载经编译的 [源码](https://sunmengyuan.github.io/materials/garden/post/css-sector/sector.zip) 开启 __sector.html__ 查看效果。

安装 __Sass__ 请参考 <https://sunmengyuan.github.io/garden/2017/05/17/sass-application.html> 文章末尾的安装教程。

本例调试方法：

```bash
cd sector
sass --watch style.scss:style.css --debug-info
```

*****

作者：呆恋小喵

我的后花园：<https://sunmengyuan.github.io/garden/>

我的 github：<https://github.com/sunmengyuan>

原文链接：<https://sunmengyuan.github.io/garden/2017/11/09/css-sector.html>
