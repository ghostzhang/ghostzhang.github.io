---
layout: article
title: 设置Sublime Text为Adobe Air的开发编辑器
date: 2016-10-08 16:29:19
tags: adobe air
categories: 技术研究
published: true
---

{% include article_header.html %}

在上一篇关于Adobe Air的文章中[^1]，介绍了如何设置Air的开发环境，由于是跟Web差不多的开发方式，基本上Web所使用的编辑器都是适用的，像Dreamweaver、aptana studio等，当然还有Sublime Text。

回到正题，当你下载了Air的SDK后，编辑完一个项目后，需要运行它进行调试，你可以用命令行的方式，设置完AIR的开发环境后在命令行进入到项目目录中，输入

`adl application.xml`

就会运行你的项目了。这种方式其实也蛮快的，就是每次都得切换窗口、输入、回车，一次两次还行，多了还是挺烦的。

下面来看看怎么用Sublime Text减少下这个工作量。

## 新建Build文件

在Sublime Text的菜单上找到『Tools-\>Build System-\>New Build System…』，点击后会出来一个新文件，输入下面的内容：

```cmd
{% raw %}
    {
        "cmd": ["adl","application.xml"],
        "path":"/Users/ghostzhang/AIRSDK/bin/",
        "working_dir":"${project_path:${folder}}",
        "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
        "windows":{
            "path":"D:/AIRSDK/bin/"
        }
    }
{% endraw %}
```

**注意，上面设置中的『path』需要根据你实际的SDK路径修改。**保存为『Air.sublime-build』，可以放到你的个人设置[^2]目录中。这时在『Tools->Build System』下应该就可以看到刚才创建的『Air』了。

关于更多Build的选项，可以参考[这里](http://sublime-text.readthedocs.io/en/latest/reference/build_systems.html)。

## 运行你的项目

首先，得先把你的项目保存为一个Sublime Text项目，很简单

1. 『Project->Add Folder to Project…』，增加项目目录
2. 『Project->Save Project As…』，保存项目

在窗口左边会出现项目的目录，说明设置成功了。然后选择我们创建的Build设置『Tools->Build System->Air』，这时我们按『<key>Ctrl+B</key>』，mac下快捷键为『<key>command+B</key>』，可以看到我们的项目就运行了。

[^1]:   [使用Adobe AIR SDK搭建AIR开发环境（HTML+Javascript）](http://blog.cssforest.org/2013/03/16/%E4%BD%BF%E7%94%A8Adobe-AIR-SDK%E6%90%AD%E5%BB%BAAIR%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83-HTML+Javascript.html)

[^2]:   windows：Preferences->Browse Packages…；mac：Sublime Text->Preferences->Browse Packages…；打开后里面的User目录

{% include links.md %}
{% include article_footer.html %}