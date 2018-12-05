---
layout: post
title: "Sass 学习笔记"
date: "2017-05-17"
abstract: "本文以 sass 语法点为主线展开，但语法细节不在此赘述，如有疑问请移驾至 http://sass-lang.com 自行查阅。我所认为的 sass 的优势：结构化（层级关系更清晰）、组件化（公用模块的提取）、继承（公用样式的提取），希望读者能在浏览完此文后有所体会。"
keywords: ["sass", "css 预处理器"]
thumb: "https://sunmengyuan.github.io/materials/garden/post/sass-application/thumb.jpg"
---

进入正文前，先为大家推荐一枚神奇的网站：<https://www.sassmeister.com/>。

## 一、变量

#### 变量默认值

> 变量默认值的价值在于进行组件化开发。

##### 应用场景

一个站点内的公用模块在不同页面的展现形式会有些许不同，例如一个列表模块中列表项的分隔方式在不同页面存在差异。

![](https://sunmengyuan.github.io/materials/garden/post/sass-application/module-list.jpg)

传统做法：

```css
/* m-module-list.css */
.module-list li {
    font-size: 14px;
    line-height: 22px;
    color: #666;
    padding: 15px;
    background-color: #FFF;
    border-bottom: 1px solid #F0F0F0;
    margin-bottom: none;
}

/* style.css */
@import 'm-module-list.css';

.module-list li {
    border-bottom: none;
    margin-bottom: 10px;
}
```

显然，传统做法会产生 __冗余__ 代码。对 .module-list li 的 border-bottom 及 margin-bottom 定义了两次（很好的体现了 css __层叠__ 的理念）。

使用变量默认值：

```sass
/* m-module-list.scss */
$borderBottom: 1px solid #F0F0F0 !default;
$marginBottom: none !default;

.module-list {
    li {
        font-size: 14px;
        line-height: 22px;
        color: #666;
        padding: 15px;
        background-color: #FFF;
        border-bottom: $borderBottom;
        margin-bottom: $marginBottom;
    }
}

/* style.scss */
$borderBottom: none;
$marginBottom: 10px;

@import 'm-module-list';
```

解析后的 css 代码：

```css
.module-list li {
    font-size: 14px;
    line-height: 22px;
    color: #666;
    padding: 15px;
    background-color: #FFF;
    border-bottom: none;
    margin-bottom: 10px;
}
```

上述方法是存在缺陷的：定义 __全局变量__ 很容易造成 __污染__。但自 sass v3.4 便不存在这样的问题了，为什么这样讲？

先看一段示例：

```sass
$color: red;
p {
    $color: yellow;
    color: $color;
}
a {
    color: $color;
}
```

sass v3.3 解析后的 css 代码：

```css
p {
    color: yellow;
}
a {
    color: yellow;
}
```

sass v3.4 解析后的 css 代码：

```css
p {
    color: yellow;
}
a {
    color: red;
}
```

自 sass v3.4 变量的解析遵循：底层作用域内声明的变量相当于局部变量，不影响全局变量。

使用 javascript 解释：

```javascript
var a = 1; 
(function () { 
    var a = 5; 
})(); 
console.log(a); // -> 1
```

而 sass v3.3 及以前对变量的设计思路为：在底层作用域声明变量相当于修改全局变量，它处调用该变量时会使用覆盖的新值。

使用 javascript 解释：

```javascript
var a = 1; 
(function () { 
    a = 5; 
})(); 
console.log(a); // -> 5
```

#### 特殊变量

+ 应用于选择器

+ 应用于属性

特殊变量的应用十分广泛，在此不做特别介绍。请自行留意文中 ___#{$var}___ 这样的书写方式，那就是所谓的特殊变量。

#### 多值变量

+ List 类型

##### 应用场景

由于存在图片失效或尺寸不合规定的情况，我们通常需要为图片添加默认底色及占位。例如浮动布局中元素尺寸的变化会扰乱呈现效果：

![](https://sunmengyuan.github.io/materials/garden/post/sass-application/thumb-placeholder-anti.jpg)

当然，上述问题可以通过为左侧元素清除浮动或延时加载图片等方法解决。在此，我们仅讲述为图片添加占位这一方法，效果如下：

![](https://sunmengyuan.github.io/materials/garden/post/sass-application/thumb-placeholder.jpg)

在不同的业务场景下，占位图风格各异。例如我司的常规需求、活动类需求、专题类需求所启用的占位图就在颜色及底纹上存在差异。

我们可以定义 3 种图片类型 default、activity、special 存储在 __List 类型变量__ $thumbType 中，这样书写语义清晰、利于拓展、精简代码。

相关代码：

```sass
$thumbType: default, activity, special;
@each $type in $thumbType {
    %#{$type}-thumb {
        background: url("../img/#{$type}-nothumb.jpg") no-repeat 0 0;
        background-size: 100% auto;
        padding-bottom: 100%;
        height: 0;
        overflow: hidden;
    }
}

.section1 .thumb {
    @extend %default-thumb;
}
.section2 .thumb {
    @extend %activity-thumb;
}
.section3 .thumb {
    @extend %special-thumb;
}
```

解析后的 css 代码：

```css
.section1 .thumb {
    background: url("../img/default-nothumb.jpg") no-repeat 0 0;
    background-size: 100% auto;
    padding-bottom: 100%;
    height: 0;
    overflow: hidden;
}
.section2 .thumb {
    background: url("../img/activity-nothumb.jpg") no-repeat 0 0;
    background-size: 100% auto;
    padding-bottom: 100%;
    height: 0;
    overflow: hidden;
}
.section3 .thumb {
    background: url("../img/special-nothumb.jpg") no-repeat 0 0;
    background-size: 100% auto;
    padding-bottom: 100%;
    height: 0;
    overflow: hidden;
}
```

+ Map 类型

##### 应用场景

通常，一个站点含多套配色方案，以按钮的配色为例：主色、辅助色、弱色。每套配色又由多种状态色组成：常态色、点击色、失效色。

![](https://sunmengyuan.github.io/materials/garden/post/sass-application/btn-group.jpg)

我们可以将这些色值按照一定的规则储存在 __Map 类型变量__ 中，这样做的优势为：

+ 结构及语义清晰，增强了可读性且易于修改。

+ 添加新的配色方案相当于添加配置项，无需撰写大量代码。

相关代码：

```sass
$btnColor: (
    main: (
        normal: (
            font: #C53336,
            border: #C53336,
            background: #FFF
        ),
        active: (
            font: #FFF,
            border: #C53336,
            background: #C53336
        ),
        disabled: (
            font: #999,
            border: #F5F5F5,
            background: #F5F5F5
        )
    ),
    weak: (
        normal: (
            font: #333,
            border: #666,
            background: #FFF
        ),
        active: (
            font: #FFF,
            border: #666,
            background: #666
        ),
        disabled: (
            font: #999,
            border: #CCC,
            background: #FFF
        )
    )
);
@mixin btnColor ($font, $border, $background) {
    color: $font;
    border-color: $border;
    background-color: $background;
}
@each $type, $status in $btnColor {
    %btn-#{$type} {
        $normal: map-get($status, normal);
        $active: map-get($status, active);
        $disabled: map-get($status, disabled);
        
        @include btnColor(map-values($normal)...);
        
        &:active {
            @include btnColor(map-values($active)...);
        }
        &.disabled {
            @include btnColor(map-values($disabled)...);
        }
    }
}

a.btn-main {
    @extend %btn-main;
}
a.btn-weak {
    @extend %btn-weak;
}
```

解析后的 css 代码：

```css
a.btn-main {
    color: #C53336;
    border-color: #C53336;
    background-color: #FFF;
}
a.btn-main:active {
    color: #FFF;
    border-color: #C53336;
    background-color: #C53336;
}
a.disabled.btn-main {
    color: #999;
    border-color: #F5F5F5;
    background-color: #F5F5F5;
}
a.btn-weak {
    color: #333;
    border-color: #666;
    background-color: #FFF;
}
a.btn-weak:active {
    color: #FFF;
    border-color: #666;
    background-color: #666;
}
a.disabled.btn-weak {
    color: #999;
    border-color: #CCC;
    background-color: #FFF;
}
```

*****

## 二、嵌套

嵌套可增强文件的结构性及可读性，但嵌套层级过多却是大忌，@at-root 可解决该问题。

#### @at-root

> @at-root 可防止选择器的优先级过高。

先看一段很糟糕的代码，嵌套层级过多。层级关系的展现虽清晰，却莫名加高了选择器的 __优先级__。那么在重置样式的时候便需要加更高的优先级，由此恶性循环。

```sass
.parent {
    .child1 {
        width: 20px;
        .child1-1 {
            width: 20px; 
            .child1-1-1 {
                width: 20px;
            }
        }
    }
}
```

解析后的 css 代码：

```css
.parent .child1 {
    width: 20px;
}
.parent .child1 .child1-1 {
    width: 20px;
}
.parent .child1 .child1-1 .child1-1-1 {
    width: 20px;
}
```

显然，.parent .child1 .child1-1 .child1-1-1 的优先级很高却完全没必要，我们需要做的便是降级。

```sass
.parent {
    .child1 {
        width: 20px;
        @at-root .child1-1 {
            width: 20px;
            @at-root .child1-1-1 {
                width: 20px;
            }
        }
    }
}
```

解析后的 css 代码：

```css
.parent .child1 {
    width: 20px;
}
.child1-1 {
    width: 20px;
}
.child1-1-1 {
    width: 20px;
}
```

其实这并不是我想要的，我想要的是：

```css
.parent .child1 {
    width: 20px;
}
.parent .child1-1 {
    width: 20px;
}
.parent .child1-1-1 {
    width: 20px;
}
```

显然 @at-root 无法控制跳出的级数，无奈。

@at-root 的另一应用场景便是 @keyframes。动画的专属性较强，嵌套的写法能清晰的标明其被应用之处。在做功能删除时只需直接干掉一整段代码，无需查找对应的 @keyframes 顺便思考其影响范围，省时高效。

示例代码：

```sass
.demo {
    animation: motion 1s infinite;
    @at-root {
        @keyframes motion {
            0% {background-color: red;}
            100% {background-color: yellow;}
        }
    }
}
```

解析后的 css 代码：

```css
.demo {
    animation: motion 1s infinite;
}
@keyframes motion {
    0% {background-color: red;}
    100% {background-color: yellow;}
}
```

其实上述是 sass v3.3 之前的做法，自 sass v3.4 这样书写即可：

```sass
.demo {
    animation: motion 1s infinite;
    @keyframes motion {
        0% {background-color: red;}
        100% {background-color: yellow;}
    }
}
```

@keyframes 会自动跳出父级的限制。

*****

## 三、继承

#### @mixin + @include

> 可传递参数，可设置参数默认值。

##### 应用场景

相信大家都很反感在使用 transition、transform 这类 css3 属性时需要巴拉巴拉添加一堆前缀。

有了 sass 我们便可以定义一个自动添加前缀的方法啦！引用时，只需传入属性名及属性值，非常方便。且欲添加新的所须兼容的浏览器时，只需在 $compatibleBrowser 中添加配置项。若是使用传统做法，想象下某天老板要我们兼容 ms 了，你是要把全站代码修改一遍？

相关代码：

```sass
$compatibleBrowser: webkit, moz, o;
@mixin addPrefix ($property, $value) {
    @each $prefix in $compatibleBrowser {
        -#{$prefix}-#{$property}: $value;
    }
    #{$property}: $value;
}
.demo {
    background-color: red;
    @include addPrefix(transition, background-color 2s);
    &:hover {
        background-color: yellow;
    }
}
```

解析后的 css 代码：

```css
.demo {
    background-color: red;
    -webkit-transition: background-color 2s;
    -moz-transition: background-color 2s;
    -o-transition: background-color 2s;
    transition: background-color 2s;
}
.demo:hover {
    background-color: yellow;
}
```

#### % + @extend

> 用于定义通用样式最为合适。

##### 应用场景

通常，我们会创建这样一个文件 common.css 来定义一些通用样式，引用时在对应元素的 html 标签上添加相应的 class 即可。

而 sass 的做法如下：

```sass
%horizontal-scroll {
    white-space: nowrap;
    overflow-x: scroll;
    li {
        display: inline-block;
        vertical-align: middle;
    }
    &::-webkit-scrollbar {
        width: 0;
        height: 0;
        opacity: 0;
    }
}

section.horizontal-scroll {
    @extend %horizontal-scroll;
}
```

解析后的 css 代码：

```css
section.horizontal-scroll {
    white-space: nowrap;
    overflow-x: scroll;
}
section.horizontal-scroll li {
    display: inline-block;
    vertical-align: middle;
}
section.horizontal-scroll::-webkit-scrollbar {
    width: 0;
    height: 0;
    opacity: 0;
}
```

这样做的优势为：

+ css 样式与 html 结构解耦。
 
+ 去除冗余 css 代码。

第一条优势显而易见，下面来为大家解释第二条：在代码被压缩上线时，传统做法会使得未被引用的通用样式一同被上线，而 sass 在被解析为 css 时会去除由 % 定义的未被引用的通用样式。

*****

## 四、函数

> 产生值，非行为。

不要与 javascript 中的函数混淆。调用时并非执行了某段操作，而是返回了经过某些操作后产生的值，其实类似于有 return 值的 javascript 函数。

*****

## 五、语句

#### 三目判断

书写形式：

+ if(__条件__, __条件为真所取值__, __条件为假所取值__)

莫名觉得会很常用，与 javascript 中的 __? :__ 作用相同。

#### @if

##### 应用场景

定义多行省略时（以 3 行为例），变更显示行数只需修改 line-clamp 属性值，代码如下：

```css
.ellipsis-row3 {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: -o-ellipsis-lastline;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
```

而定义单行省略只需如下 3 行：

```css
.ellipsis-row1 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
```

两段代码差异较大，而我们又想将多行与单行的情况融合在一个通用样式内。此时，可以使用 if 语句将单行省略单独定义。

相关代码：

```sass
@for $lineCount from 1 through 3 {
    %ellipsis-row#{$lineCount} {
        overflow: hidden;
        @if $lineCount == 1 {
            white-space: nowrap;
            text-overflow: ellipsis;
        } @else {
            display: -webkit-box;
            text-overflow: -o-ellipsis-lastline;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: $lineCount;
        }
    }
}

.section1 p {
    @extend %ellipsis-row1;
}
.section2 p {
    @extend %ellipsis-row2;
}
.section3 p {
    @extend %ellipsis-row3;
}
```

解析后的 css 代码：

```css
.section1 p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.section2 p {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: -o-ellipsis-lastline;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.section3 p {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: -o-ellipsis-lastline;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
```

#### @for

for 循环的书写形式有两种：

+ @for __$var__ from __start__ through __end__

+ @for __$var__ from __start__ to __end__

第一种在循环遍历时会对第 __end__ 项进行操作，第二种则不会。本人认为习惯使用一种即可，不然易混淆。

##### 应用场景

我司喜好做 “固定模板” 需求：运营同学会将一张图片裁切成 n 个区域，点击每一区域的行为有所不同。比如一张美女的面部图，点击其眼睛时会推荐一些双眼皮项目，点击其鼻子时会推荐一些鼻综合项目等等（我司是做微整形交易平台的）。

区域划分是有一定规则的，如下图：当前行仅含一张图片时图片宽度为 100%，两张时为 50%，... n 张时为 (100 / n)%。

![](https://sunmengyuan.github.io/materials/garden/post/sass-application/static-template.jpg)

相关代码：

```sass
%clear-float {
    &:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}
%adapt-image {
    display: block;
    width: 100%;
}
%static-template {
    div {
        @extend %clear-float;
        a {
            float: left;           
            img {
                @extend %adapt-image;
            }
        }
    }
    @for $itemCount from 1 through 3 {
        .count#{$itemCount} {
            a {
                width: 100%/$itemCount;
            }
        }
    }
}
section.static-template {
    @extend %static-template;
}
```

解析后的 css 代码：

```css
section.static-template div:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
section.static-template div a img {
    display: block;
    width: 100%;
}
section.static-template div a {
    float: left;
}
section.static-template .count1 a {
    width: 100%;
}
section.static-template .count2 a {
    width: 50%;
}
section.static-template .count3 a {
    width: 33.33333333%;
}
```

上述其实是 __多列布局__ 的一个实例，__多列布局__ 的应用很广泛，比如导航栏：

![](https://sunmengyuan.github.io/materials/garden/post/sass-application/column-nav.jpg)

#### @each

each 可循环遍历两种数据类型：

+ @each __$var__ in __list__

+ @each __$var__ in __map__

具体实例请向上翻至 __多值变量__。

*****

###### 2017/11/06 续更

## Sass 安装

Sass 依赖于 Ruby 环境，若未安装 Ruby 请移驾[此处](https://rubyinstaller.org/downloads/)下载。安装过程请勾选 __Add Ruby executables to your PATH__ 确保添加环境变量。

若你具备翻墙技能请直接：

```bash
gem install sass
```

下面介绍如何不翻墙安装 Sass：

__配置 gem sources__

```bash
# 移除 https://rubygems.org/
gem sources --remove https://rubygems.org/

# 添加 https://gems.ruby-china.org/
gem sources -a https://gems.ruby-china.org/

# 查看 sources 确保仅有 https://gems.ruby-china.org/
gem sources -l
```

__下载 sass.gem__

[下载地址](https://rubygems.org/gems/sass)

__安装 sass.gem__

```bash
gem install [sass.gem 路径]/sass.gem
```

*****

作者：呆恋小喵

相关文章：[通过 sass-resources-loader 全局注册 Sass 变量](https://sunmengyuan.github.io/garden/2018/02/06/sass-var.html)

我的后花园：<https://sunmengyuan.github.io/garden/>

我的 github：<https://github.com/sunmengyuan>

原文链接：<https://sunmengyuan.github.io/garden/2017/05/17/sass-application.html>
