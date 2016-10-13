---
layout: article
title: 使用Adobe AIR SDK搭建AIR开发环境（HTML+Javascript）
date: 2013-03-16
upadte: 2016-10-13 12:30
tags: adobe air
categories: 技术研究
published: true
---

{% include article_header.html %}

之前开发 AIR，用的是 Aptana2 + AIR 的插件，界面的操作的确带来很大的方便，不过可惜 Aptana 后来就更新到3了，然后……然后就不支持 AIR 插件了，而且 AIR 插件也不更新了……

还是下载 SDK 自己安装吧， 点 [这里](http://www.adobe.com/devnet/air/air-sdk-download.html) 下载。官方的安装说明上写得比较简单：

ADL 和 ADT 工具包含在 AIR SDK 的 bin 文件夹中；请将此文件夹的路径添加到 `PATH` 环境变量中。

## 安装SDK

### windows

首先把 SDK 解压到你要的目录下，如『`C:\AIRSDK`』这个目录，右击“我的电脑”图标->属性->高级->环境变量。在界面里找到名为『`path`』的环境变量（建议先备份下内容），在它的最后面加上 `;C:\AIRSDK\bin` （注意前面的『;』是分隔区）。然后按『<key>win+r</key>』，输入 `cmd` 回车，在命令行中输入 `adl` ，如果刚才的路径设置正确，命令行会显示 adl 命令的帮助信息。

### mac

mac 下的安装可以看 [这里](http://www.funky-monkey.nl/blog/2008/10/24/installing-the-adobe-air-sdk-on-a-mac/) ，原理也是一样的，把 SDK 的安装目录加到系统路径中，然后就可以调用了，简单说明下过程：

首先把SDK解压到你要的目录下，如『`/Users/ghostzhang/AIRSDK`』这个目录，然后打开终端（/Applications/Utilities/Terminal），如果现在输入 `adl` 是会显示『-bash: adl: command not found』的，因为找不到这个命令，现在输入下面的命令

```cmd
{% raw %}
export PATH=$PATH:/Users/ghostzhang/AIRSDK/bin
{% endraw %}
```

意思就是在系统系统变量 `PATH` 里加上 SDK 的 bin 目录（多个路径的分隔符是『:』），现在再输入 `adl` ，如果出现 adl 的帮助信息，说明刚才的设置正确了，否则就需要再检查下路径了。

与 windows 不同的是，通过终端设置的是临时的，重新打开终端后之前的设置都会被重置。解决的方案就是把这个设置写到系统配置文件里，方法可以看上面的那篇文章，这里简单说下过程

`~/.profile`
: 每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!默认情况下,它设置一些环境变量,然后执行用户的.bashrc文件.

`~/.bashrc`
: 该文件包含专用于你的bash shell的bash信息,当登录时以及每次打开新的shell时,该该文件被读取.

在终端输入

```cmd
{% raw %}
cd ~
ls -a
{% endraw %}
```

找找看有没『.profile』，如果没有找到，那么需要先创建它

```cmd
{% raw %}
pico .profile
{% endraw %}
```

会打开一个编辑器的界面，现在输入『`export PATH=$PATH:/Users/ghostzhang/AIRSDK/bin`』，然后按『<key>ctrl+x</key>』->『<key>y</key>』->回车，这时再用 `ls -a` 就能看到『.profile』了。

如果原来就有『.profile』文件，就简单了，直接输入

```cmd
{% raw %}
open -e .profile
{% endraw %}
```

然后把『`export PATH=$PATH:/Users/ghostzhang/AIRSDK/bin`』加到文件里，保存。

做完上面的工作，要么重启下系统，要么运行下面的命令，让刚才的设置生效

```cmd
{% raw %}
..profile
{% endraw %}
```

注意文件前的点『.』，到此，AIR的环境就建好了。可以 [使用 AIR SDK 创建第一个基于 HTML 的 AIR 应用程序](http://help.adobe.com/zh_CN/AIR/1.5/devappshtml/WS5b3ccc516d4fbf351e63e3d118666ade46-7ecc.html) 了。

## 2016.10.13更新

更新了macOS到Sierra(10.12)后，发现命令行原先的设置失效了，每次设置后一新开一个窗口就又找不到命令……后来找到这篇[^1]，提到需要把设置放到`~/.bash_profile`这个文件中才会生效，上文所说的`~/.profile`和`~/.bashrc`设置在Sierra中并没有加载。囧

[^1]:https://coolestguidesontheplanet.com/add-shell-path-osx/

{% include links.md %}
{% include article_footer.html %}
