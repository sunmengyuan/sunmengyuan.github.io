---
layout: post
title: "自定制 Markdown 主题试水"
date: "2016-12-30"
abstract: "展示本站所应用的 markdown 主题"
keywords: ["关于本站", "说明"]
---

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

*****

_斜体_

__粗体__

___粗斜体___

[链接](http://oij8a9ql4.bkt.clouddn.com/test.png)

> 引用

*****

表格

| 标题一 | 标题二 | 标题三 |
| ------ | ------ | ------ |
| 行一列一 | 行一列二 | 行一列三 |
| 行二列一 | 行二列二 | 行二列三 |

*****

列表

+ 一级一

    + 二级一一
    
    + 二级一二
    
        + 三级一二一

+ 一级二

    + 二级二一
    
        + 三级二一一
        
        + 三级二一二
    
    + 二级二二

+ 一级三

*****

图片

![图片](http://oij8a9ql4.bkt.clouddn.com/test.png)

*****

代码片段

```html
<nav class="c-fix">
    <a href="javascript:;">
        <span></span>
        <span></span>
        <span></span>
    </a>
    <ul class="c-hidden js_menu">
        <li><a href="{{ site.baseurl }}/">Home</a></li>
        <li><a href="{{ site.baseurl }}/views/posts">Posts</a></li>
        <li><a href="{{ site.baseurl }}/views/about">About</a></li>
    </ul>
</nav>
```

```css
*{margin: 0;padding: 0;}
body{text-align: left;line-height: 1.6;font-family: "\5FAE\8F6F\96C5\9ED1", "\5B8B\4F53", Arial, Verdana;}
h1, h2, h3, h4, h5, h6{font-weight: normal;}
ul, ol, li{list-style: none;}
table{border-collapse: collapse;border-spacing: 0;}
input, textarea, button{border: none;resize: none;outline: none;}
button{background-color: transparent;}
em, i{font-style: normal;}
a{text-decoration: none;}
img{display: block;width: 100%;}
.c-fix:after{content: "";display: block;height: 0;clear: both;visibility: hidden;}
.c-mask{position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 100;background-color: rgba(0, 0, 0, 0.5);display: none;}
.c-header{position: fixed;left: 0;top: 0;width: 100%;z-index: 10;box-sizing: border-box;}
.c-footer{position: fixed;left: 0;bottom: 0;width: 100%;z-index: 10;box-sizing: border-box;}
```

```javascript
gulp.task('minify_demos', function () {
    var root = './demos';
    minify(root, '.html', htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        })
    );
    minify(root, '.css', cssmin());
    minify(root, '.js', jsmin());
    minify(root, '.{png,jpg}', imgmin({
            progressive: true
        })
    );
});
```
