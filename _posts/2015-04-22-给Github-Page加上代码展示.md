---
layout: article
title: 给Github-Page加上代码展示
date: 2015-04-22 14:33:19
tags: jekyll github markdown hexo blog
categories: 技术研究 经验总结
published: true
---

{% include article_header.html %}

博客中常常会需要用到代码展示，在《[用Github搭建个人博客][]》中也介绍了几个可以用于代码展示的站点，不过由于是跨站的服务，可能会由于种种原因访问慢甚至打不开，于是就想找找有没本地实现的方法。自己写一个？No。

在Github上找到[Editr](http://lab.idered.pl/editr)这个项目，正好能满足需求，也成功应用到了这里，当然需要一点点技巧。下面就跟大家分享下。

动手前先看看[说明](https://github.com/Idered/Editr.js/blob/master/README.md)，看到安装的部分，下载项目文件，将editr目录放到需要的目录下，这里我放在根目录下（不是所有的文件都是必须的）：

{% highlight text %}
. username.github.com
|---. editr
|    |--- editr.js
|    |--- editr.css
|    |---. items #默认项目目录
|        |--- index.html
|    |---. libs
|        |--- ext.emmet.js
|        |--- parser.coffeescript.js #coffee扩展，不用可以不加载
|        |--- parser.less.js #less扩展，不用可以不加载
{% endhighlight %}

要引用的文件还蛮多的，有没办法不要每个页面都加载呢？想到了文件头部的设置，我们可以加一个自定义的属性，像“demo”，做为一个开关，当需要使用的时候将它设置为“true”：

{% highlight text %}
{% raw %}
---
title: 文章标题
demo: true
---
{% endraw %}
{% endhighlight %}

{% highlight css %}
{% raw %}
{% if page.code %}
<link rel="stylesheet" href="{{ site.url }}/editr/editr.css">
{% endif %}
{% endraw %}
{% endhighlight %}

{% highlight js %}
{% raw %}
{% if page.code %}
<script src="{{ site.url }}/editr/libs/jquery.min.js"></script>
<script src="//cdn.jsdelivr.net/ace/1.1.01/min/ace.js"></script>
<script src="//cdn.jsdelivr.net/ace/1.1.01/min/ext-emmet.js"></script>
<script src="{{ site.url }}/editr/libs/ext.emmet.js"></script>
<script src="{{ site.url }}/editr/editr.js"></script>
<script>
    $('.editr').each(function() {
        new Editr({
            el: this,
            theme: 'clouds'
        });
    });
</script>
{% endif %}
{% endraw %}
{% endhighlight %}

为了方便文件的管理，我们新建一个名为“demo”的目录，并且以文章标题为目录区分不同的示例：

{% highlight text %}
. username.github.com
|---. editr
|---. demo
|        |--- index.html
|        |---.  关于nth-child的疑惑 #文章标题
|            |--- index.html #空文件，没有的话会报404
|            |--- 1.html
|            |--- 1.css
{% endhighlight %}

把Editr的设置修改为：

{% highlight js %}
{% raw %}
<script>
    $('.editr').each(function() {
        new Editr({
            el: this,
            theme: 'clouds',
            path: '{{ site.url }}/demo/{{ page.title }}'
        });
    });
</script>
{% endraw %}
{% endhighlight %}

然后在对应文章中，如《[关于nth-child的疑惑][]》这篇文章，需要展示代码的位置加入如下的代码：

{% highlight html %}
{% raw %}
<div class="editr" data-files-html="1.html" data-files-css="1.css"></div>
{% endraw %}
{% endhighlight %}

{% include links.md %}
{% include article_footer.html %}
