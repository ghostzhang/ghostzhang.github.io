{% for link in site.data.links %}
{% if node.meta == false and node.data %}
[{{ link.name }}]:{{ link.url }}
{% endif %}
{% endfor %}

{% for post in site.posts %}
[{{ post.title }}]:{{ post.url }}
{% endfor %}