---
title: 分类
layout: index
---

## 分类

<div id='tag_cloud'>
{% for cat in site.categories %}
<a href="#{{ cat[0] }}" title="{{ cat[0] }}" rel="{{ cat[1].size }}">{{ cat[0] }} ({{ cat[1].size }})</a>
{% endfor %}
</div>

{% for cat in site.categories %}
<section>
  <h2 class="categories_listing-seperator" id="{{ cat[0] }}">{{ cat[0] }}</h2>
  <ul class="categories_listing">
  {% for post in cat[1] %}
    <li class="categories_listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
    </li>
  {% endfor %}
  </ul>
</section>
{% endfor %}
<script>
var _statcounter = _statcounter || [];
_statcounter.push({"tags": {"topic": "categories"}});
</script>