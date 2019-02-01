---
layout: post
title: "Vue 源码解读-数据响应系统"
date: "2019-02-01"
abstract: "Vue 源码解读笔记~"
keywords: ["vue", "源码", "数据响应系统"]
thumb: "https://sunmengyuan.github.io/materials/garden/post/vue-secret/thumb.jpg"
---

### data 对象初始化

+ 通过 __vm.$options.data__ 函数获取 __data 对象__

+ 校验 data 对象是否为 __纯对象__

+ 检验 data 对象与 props 对象 __冲突键__

+ 检验 methods 对象与 data 对象 __冲突键__

+ 在 Vue 实例添加 __代理__ 访问 data 对象的同名属性

+ 调用 observe 函数开启 __响应式__

### 数据响应系统

+ 避免收集 __重复__ 依赖

+ __深度__ 观测

+ 处理 __边界__ 条件

*****

#### observe 工厂函数

```js
export function observe (value: any, asRootData: ?boolean): Observer | void {
    if (!isObject(value) || value instanceof VNode) {
        return
    }
    let ob: Observer | void
    // 避免重复观测
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else if (
        // 是否开启观测
        shouldObserve &&
        // 是否服务端渲染
        !isServerRendering() &&
        // 待观测对象是否为数组或纯对象
        (Array.isArray(value) || isPlainObject(value)) &&
        // 待观测对象是否可扩展
        Object.isExtensible(value) &&
        // 避免观测 Vue 实例
        !value._isVue
    ) {
        ob = new Observer(value)
    }
    if (asRootData && ob) {
        ob.vmCount++
    }
    return ob
}
```

*****

#### observer 构造函数

```js
export class Observer {
    // 待观测对象
    value: any;
    // 待观测对象依赖收集“筐”
    dep: Dep;
    vmCount: number;
    constructor (value: any) {
        this.value = value
        this.dep = new Dep()
        this.vmCount = 0
        // 为待观测对象定义不可枚举 __ob__ 属性
        def(value, '__ob__', this)
        // 处理数组
        if (Array.isArray(value)) {
            const augment = hasProto
                ? protoAugment
                : copyAugment
            // 调用变异函数时执行依赖
            augment(value, arrayMethods, arrayKeys)
            // 开启深度观测
            this.observeArray(value)
        // 处理纯对象
        } else {
            this.walk(value)
        }
    }
    walk (obj: Object) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i])
        }
    }
    observeArray (items: Array<any>) {
        for (let i = 0, l = items.length; i < l; i++) {
            observe(items[i])
        }
    }
}
```

*****

#### defineReactive 函数

##### get 函数

+ __返回__ 属性值

+ __收集__ 依赖

##### set 函数

+ __设置__ 属性值

+ __触发__ 依赖

```js
export function defineReactive (
    obj: Object,
    key: string,
    val: any,
    customSetter?: ?Function,
    shallow?: boolean
) {
    // 待观测对象依赖收集“筐”
    const dep = new Dep()
    // 属性描述对象
    const property = Object.getOwnPropertyDescriptor(obj, key)
    // 属性描述对象是否可配置
    if (property && property.configurable === false) {
        return
    }
    // 缓存原 setter、getter
    const getter = property && property.get
    const setter = property && property.set
    if ((!getter || setter) && arguments.length === 2) {
        val = obj[key]
    }
    // 开启深度观测
    let childOb = !shallow && observe(val)
    // 重定义 setter、getter
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            // 保证原 getter 正常运作且返回属性值
            const value = getter ? getter.call(obj) : val
            // 依赖是否存在
            if (Dep.target) {
                // 收集依赖至 dep “筐”，属性值被修改时执行依赖
                dep.depend()
                if (childOb) {
                    // 收集依赖至 childOb.dep “筐”，添加新属性时执行依赖
                    childOb.dep.depend()
                    if (Array.isArray(value)) {
                        // 因数组索引无 get，逐个收集每一数组元素依赖
                        dependArray(value)
                    }
                }
            }
            return value
        },
        set: function reactiveSetter (newVal) {
            // 获取原属性值
            const value = getter ? getter.call(obj) : val
            // 属性值是否更新
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return
            }
            // 非生产环境打印辅助信息
            if (process.env.NODE_ENV !== 'production' && customSetter) {
                customSetter()
            }
            // 保证原 setter 正常运作且设置属性值
            if (setter) {
                setter.call(obj, newVal)
            } else {
                val = newVal
            }
            // 开启深度观测
            childOb = !shallow && observe(newVal)
            // 执行依赖
            dep.notify()
        }
    })
}
```

*****

#### 数组变异函数拦截

```js
import { def } from '../util/index'
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]
methodsToPatch.forEach(function (method) {
    // 缓存原变异函数
    const original = arrayProto[method]
    // 定义与变异函数同名的拦截函数
    def(arrayMethods, method, function mutator (...args) {
        // 调用原变异函数
        const result = original.apply(this, args)
        const ob = this.__ob__
        let inserted
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case 'splice':
                inserted = args.slice(2)
                break
        }
        // 观测新增元素
        if (inserted) ob.observeArray(inserted)
        // 执行依赖
        ob.dep.notify()
        return result
    })
})
```

*****

作者：呆恋小喵

我的后花园：<https://sunmengyuan.github.io/garden/>

我的 github：<https://github.com/sunmengyuan>

原文链接：<https://sunmengyuan.github.io/garden/2019/02/01/vue-observer.html>
