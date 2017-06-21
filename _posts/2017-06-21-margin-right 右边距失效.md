---
layout: article
title: margin-right 右边距失效
date: 2017-06-21 16:52:13
tags: CSS 外边距 盒模型
categories: 技术研究
published: true
---

{% include article_header.html %}

不小心看了下知乎，万年潜水，突然看到有一个邀答，[问题在这里](https://www.zhihu.com/question/61342225)，进去看了下，觉得这个问题很有意思，于是想试着回答下：

先试着还原下，在题主的[Demo](https://weblzf.github.io/practice/test/index.html)上改改：

![修改的部分]({{ site.file }}/2017-06-21_00.png)

于是变成这样

![最初的样式]({{ site.file }}/2017-06-21_01.png)

用Chrome的开发者工具看看：

![父元素的盒模型]({{ site.file }}/2017-06-21_02.png)

![子元素的盒模型]({{ site.file }}/2017-06-21_03.png)

可见子元素的margin跟父级元素重叠了，这是外边距合并的现象，具体可以看看这几篇：《[外边距合并](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)》、《[盒模型](http://www.ayqy.net/doc/css2-1/box.html#margin-properties)》、《[CSS 外边距(margin)重叠及防止方法](http://www.hujuntao.com/web/css/css-margin-overlap.html)》、《[What You Should Know About Collapsing Margins](https://css-tricks.com/what-you-should-know-about-collapsing-margins/)》

但都没能解释这次的问题，右边距为何失效了。

当父元素设置了`overflow:auto`之后，变成了下面这样

![激活父元素的BFC]({{ site.file }}/2017-06-21_04.png)

正常哈，因为激活了父元素的BFC[^1]，margin合并的规则失效，现在看到的才是我们预期的样子。

![激活父元素的BFC后的子元素盒模型]({{ site.file }}/2017-06-21_05.png) 

从Chrome的开发者工具来看，子元素的margin只有top、left、bottom有效，右边距失效。试着移动下子元素：

![子元素外边距宽度随子元素移动]({{ site.file }}/2017-06-21_06.png)

可以看到子元素的外边距位置是随着子元素移动的，所以才会出现了移到右边后右边的外边距没有显示的结果。

找了下margin合并，或叫外边距塌陷(margin collapsing)相关的内容，基本上都只是提到上下边距的问题，于是试着给父元素也设置了`margin`，然后就看到，右边距基本也是无效的，一个`auto`的状态：

![父元素也设置外边距后的盒模型]({{ site.file }}/2017-06-21_07.png)

总结下：
**当父元素的宽度小于子元素的宽度时，子元素的右边距无效。** 用`scrollWidth`取到的值也是不包括右边距的，跟盒模型的规则有点冲突，不知道算不算是BUG。

如果非要子元素有右边距，可以这样：
* 子元素设置右浮动，但无导致父元素的`overflow`失效，抱脸～～
* 子元素的左边距为`auto`，并且父元素的宽大于子元素的宽；

对于当前问题的解决方案也很简单，为子元素再加一个父级，然后为它设置一个跟子元素实际宽度相等的宽即可：

{% include demo.html html="1.html" css="1.css" %}

或者，加一个兄弟元素，让它隐藏起来，宽度为实际宽度，应该更实用些：

{% include demo.html html="2.html" css="2.css" %}

只是，为什么会无效，我没找到答案。

[^1]:	> BFC（W3C CSS 2.1 规范中的一个概念）就是所谓的Block formatting contexts （块级格式化上下文）。创建了 BFC的元素就是一个独立的盒子，里面的子元素不会在布局上影响外面的元素，反之亦然，同时BFC仍然属于文档中的普通流。

{% include links.md %}
{% include article_footer.html %}