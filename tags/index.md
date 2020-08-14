---
title: 标签
layout: index
---

## 标签云

<div id='tag_cloud'>
{% for tag in site.tags %}
<a href="#{{ tag[0] }}" title="{{ tag[0] }}" rel="{{ tag[1].size }}">{{ tag[0] }}</a> 
{% endfor %}
</div>

{% for tag in site.tags %}
<section>
  <h2 class="listing-seperator" id="{{ tag[0] }}">{{ tag[0] }}</h2>
  <ul class="listing">
  {% for post in tag[1] %}
    <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
    </li>
  {% endfor %}
  </ul>
</section>
{% endfor %}
<script>
var _statcounter = _statcounter || [];
_statcounter.push({"tags": {"topic": "tags"}});
</script>