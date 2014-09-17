{% for link in site.data.links %}
  [{{ link.name }}]:{{ link.url }}
{% endfor %}

{% for post in site.posts %}
[{{ post.title }}]:{{ post.url }}
{% endfor %}