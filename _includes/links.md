{% for link_hash in site.data.links %}
{% assign link = link_hash[1] %}
  [{{ link.name }}]:{{ link.url }}
{% endfor %}

{% for post in site.posts %}
[{{ post.title }}]:{{ post.url }}
{% endfor %}