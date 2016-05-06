---
layout: article
title: GitHub Pages 更新
date: 2016-05-06 18:26:59
tags: jekyll github markdown blog
categories: 技术研究 经验总结
published: true
---

{% include article_header.html %}

有段时间没有更新了，没想到一更新就收到GitHub的邮件，说是系统升级了，因为使用了一些旧的功能，需要更新……为什么啊～我只是想安静的写写文章……好吧，不更新的话根本就编译不通过，那就只能动手改改了。

首先，看看这次系统升级了些什么，根据邮件指示，来到了这里：[GitHub Pages now faster and simpler with Jekyll 3.0](https://github.com/blog/2100-github-pages-now-faster-and-simpler-with-jekyll-3-0 "GitHub Pages now faster and simpler with Jekyll 3.0")，大概的意思是GitHub Pages更新到Jekyll 3.0了，有以下几点变动：

1. 2016年5月1号开始，GitHub Pages只支持[kramdown](http://kramdown.gettalong.org/),作为Jekyll的默认Markdown引擎，如果你用的是其它的引擎，那么你有三个月时间进行更新。
2. 代码高亮​的实现方式也要改啦，只支持[Rouge](https://github.com/jneen/rouge)的方式。原先如果使用```{% highlight js %}代码{% endhighlight %}```的方式进行代码高亮，那么就得修改啦，用```````js 代码```````即可。
3. Jekyll 3.0对本地版本的优化，我没有使用过，不太了解，有兴趣的同学自己到上面的链接看吧。​
4. 将不再支持[Textile](http://redcloth.org/textile)

更多Jekyll 3.0的特性可以看[Upgrading from 2.x to 3.x](http://jekyllrb.com/docs/upgrading/2-to-3/)。

{% include links.md %}
{% include article_footer.html %}