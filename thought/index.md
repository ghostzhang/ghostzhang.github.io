---
title: thought
layout: index
---
{% assign sorted_posts = site.thought | sort: 'date' | reverse %}
{% for thought in sorted_posts %}

<section class="tiny-think">
<h3>💭 {{ thought.title }}</h3>
<time datetime="{{ thought.date | date: "%Y-%m-%d" }}">{{ thought.date | date: "%Y-%m-%d" }}</time>
{{ thought.content }}
<a href="{{ thought.url }}#comments" title="{{ thought.title | escape }}">💡我有话说</a>
</section>

{% endfor %}
