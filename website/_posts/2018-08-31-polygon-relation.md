---
layout: post
title: "论如何获取 2 个多边形相交关系"
date: "2018-08-31"
abstract: "利用第三方库 turf 无需研究几何算法，轻松获取 2 个多边形的相切、相交、包含、相等、相离关系。"
keywords: ["turf", "前端黑科技"]
thumb: "https://sunmengyuan.github.io/materials/garden/post/polygon-relation/thumb.png"
---

2 个多边形的关系无非：

+ 相交（一处交集）

![](https://sunmengyuan.github.io/materials/garden/post/polygon-relation/intersectant.png)

+ 相交（多处交集）

![](https://sunmengyuan.github.io/materials/garden/post/polygon-relation/multi-intersectant.png)

+ 相切（相交的一种，交集为线）

![](https://sunmengyuan.github.io/materials/garden/post/polygon-relation/tangent.png)

+ 包含（相交的一种，交集为面积较小多边形）

![](https://sunmengyuan.github.io/materials/garden/post/polygon-relation/included.png)

+ 相等（相交的一种，交集为 2 多边形本身）

![](https://sunmengyuan.github.io/materials/garden/post/polygon-relation/equal.png)

+ 相离（无交集）

![](https://sunmengyuan.github.io/materials/garden/post/polygon-relation/separated.png)

先向大家阐述我的应用场景：需求方欲通过在地图上绘制蜂窝以分配员工所负责区域。纯手工绘制易将道路、楼、园林、水系等切割引发划分纠纷，故我们接入一叫 block 的服务，根据绘制点返回周围的 N 个 block 即真正的地理分区（不切割道路、楼、园林、水系等），我们将这 N 个 block 合并形成一整个蜂窝。但绘制点跨度较大时将遗漏其间细小 block 产生缝隙，更糟糕的情况是产生零散块儿使合并结果不为一整体。此刻需获知每一零散块儿与蜂窝的关系，丢弃相离及被完全包含的，并入相交的。

![](https://sunmengyuan.github.io/materials/garden/post/polygon-relation/block.png)

业务场景不再赘述，直接上代码：

```js
import MD5 from 'md5'
import TURF from 'turf'

/**
 * 获取 N 个多边形面积
 * @param callback
 * @param opts
 *  polygons(List{ polygonOpts })(必传): 多边形对象 List
 *  order(String)(默认不排序): ascend(升序) 或 descend(降序)
 *  @param polygonOpts
 *   path(Path)(必传): 路径 [[lng(Number), lat(Number)], ...]
 */
export function getPolygonsArea (callback, opts = {}) {
    var polygons = opts.polygons
    var response = { polygons: [] }
    for (let i = 0; i < polygons.length; i++) {
        // 获取多边形面积
        let area = TURF.area(TURF.polygon([polygons[i].path]))
        response.polygons.push({ ...polygons[i], area: area })
    }
    switch (opts.order) {
    // 升序排列
    case 'ascend':
        response.polygons.sort((a, b) => a.area - b.area)
        break
    // 降序排列
    case 'descend':
        response.polygons.sort((a, b) => b.area - a.area)
        break
    default:
        break
    }
    callback && callback(response)
}

/**
 * 获取 2 个多边形相交关系
 * @param callback
 * @param opts
 *  polygonA(Polygon{ polygonOpts })(必传): 多边形对象 A
 *  polygonB(Polygon{ polygonOpts })(必传): 多边形对象 B
 *  @param polygonOpts
 *   path(Path)(必传): 路径 [[lng(Number), lat(Number)], ...]
 */
export function getPolygonsRelation (callback, opts = {}) {
    var polygonA = TURF.polygon([opts.polygonA.path])
    var polygonB = TURF.polygon([opts.polygonB.path])
    // 获取 polygonA 与 polygonB 交集
    var intersection = TURF.intersect(polygonA, polygonB)
    if (intersection) {
        let geometry = intersection.geometry
        switch (geometry.type) {
            case 'Point':
                callback && callback({
                    relation: 'pointIntersectant',
                    desc: '相交的（交集为单点）',
                    intersection: geometry,
                    polygonA: opts.polygonA,
                    polygonB: opts.polygonB
                })
                return
            case 'MultiPoint':
                callback && callback({
                    relation: 'multiPointIntersectant',
                    desc: '相交的（交集为多点）',
                    intersection: geometry,
                    polygonA: opts.polygonA,
                    polygonB: opts.polygonB
                })
                return
            case 'LineString':
                callback && callback({
                    relation: 'tangent',
                    desc: '相切的（交集为单线）',
                    intersection: geometry,
                    polygonA: opts.polygonA,
                    polygonB: opts.polygonB
                })
                return
            case 'MultiLineString':
                callback && callback({
                    relation: 'multiTangent',
                    desc: '相切的（交集为多线）',
                    intersection: geometry,
                    polygonA: opts.polygonA,
                    polygonB: opts.polygonB
                })
                return
            // 交集为多个多边形
            case 'MultiPolygon':
                callback && callback({
                    relation: 'multiIntersectant',
                    desc: '相交的（多处交集）',
                    intersection: geometry,
                    polygonA: opts.polygonA,
                    polygonB: opts.polygonB
                })
                return
            // 交集为单个多边形
            case 'Polygon':
                getPolygonsArea((res) => {
                    // 面积较小多边形
                    let minPolygon = res.polygons[0]
                    // 面积较大多边形
                    let maxPolygon = res.polygons[1]
                    // 判断 2 个多边形 path 是否一模一样
                    if (MD5(minPolygon.path) === MD5(maxPolygon.path)) {
                        callback && callback({
                            relation: 'equal',
                            desc: '相等的',
                            intersection: intersection,
                            polygonA: opts.polygonA,
                            polygonB: opts.polygonB
                        })
                        return
                    }
                    // 判断较小多边形 path 与交集多边形 path 是否一模一样
                    if (MD5(minPolygon.path) === MD5(geometry.coordinates[0])) {
                        callback && callback({
                            relation: 'included',
                            desc: '包含的',
                            intersection: intersection,
                            polygonA: opts.polygonA,
                            polygonB: opts.polygonB,
                            minPolygon: minPolygon,
                            maxPolygon: maxPolygon
                        })
                        return
                    }
                    callback && callback({
                        relation: 'intersectant',
                        desc: '相交（一处交集）',
                        intersection: intersection,
                        polygonA: opts.polygonA,
                        polygonB: opts.polygonB
                    })
                }, {
                    polygons: [opts.polygonA, opts.polygonB],
                    order: 'ascend'
                })
                return
            default:
                callback && callback({
                    relation: 'fixedIntersectant',
                    desc: '相交的（多种类型交集）',
                    intersection: geometry,
                    polygonA: opts.polygonA,
                    polygonB: opts.polygonB
                })
                return
        }
    } else {
        callback && callback({
            relation: 'separated',
            desc: '相离的',
            intersection: intersection,
            polygonA: opts.polygonA,
            polygonB: opts.polygonB
        })
    }
}
```

机智的你发现我利用了第三方库 [turf](http://turfjs.org/)，未自行研究大量几何算法。此分享内容不多，代码量较小，望勿嫌弃。俗话说“君子善假于物也”，俗话又说“天下代码一大抄，看你会抄不会抄”...

*****

作者：呆恋小喵

我的后花园：<https://sunmengyuan.github.io/garden/>

我的 github：<https://github.com/sunmengyuan>

原文链接：<https://sunmengyuan.github.io/garden/2018/08/31/polygon-relation.html>
