---
layout: post
title: "React Native 开发环境搭建"
date: "2016-12-31"
abstract: "教你如何搭建 React Native 开发环境，以 Android 为例。"
keywords: ["React Native", "开发环境搭建", "虚拟机", "模拟器"]
---

安装 __node.js__ [下载地址](https://nodejs.org/en/)

安装 __npm__

```bash
curl -L https://npmjs.com/install.sh | sh
```

安装 __react-native-cli__

```bash
npm install react-native-cli -g
```

安装 __JDK__ [下载地址](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

安装 __Android Studio__ [下载地址](http://www.android-studio.org/)

+ 选择 __Custom__

+ 勾选 __Performance__、__Android Virtual Device__

+ 选择 __Configure -> SDK Manager__

    + 选择 __SDK Platforms__ -> 勾选 __Show Package Details__ -> 勾选 __Android 6.0 (Marshmallow)__ 中 __Google APIs__、__Android SDK Platform 23__、__Intel x86 Atom System Image__、__Intel x86 Atom_64 System Image__、__Google APIs Intel x86 Atom_64 System Image__
    
    + 选择 __SDK Tools__ -> 勾选 __Show Package Details__ -> 勾选 __Android SDK Build Tools__ 中 __Android SDK Build-Tools 23.0.1__

设置环境变量

```bash
# 创建 .bash_profile 文件并编辑
sudo vi ~/.bash_profile   

# .bash_profile 文件添加如下两行
export ANDROID_HOME=~/Library/Android/sdk
export PATH=~/Library/Android/sdk/platform-tools/:$PATH

# 生效 .bash_profile 文件
source ~/.bash_profile
```

安装 __VirtualBox__ [下载地址](https://www.virtualbox.org/wiki/Downloads)

安装 __Genymotion__ [下载地址](./genymotion.dmg.zip)

+ 注册账号 [注册地址](https://www.genymotion.com/account/create/)

+ 添加 __Virtual Device__

+ 设置 __ADB__

    + 选择 __Use custom Android SDK tools__ -> 填写 __/Users/[用户名]/Library/Android/sdk/__

+ 创建项目并启动

```bash
react-native init app
cd app
react-native run-android
```
