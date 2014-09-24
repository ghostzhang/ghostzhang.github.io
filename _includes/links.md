{% include data_links.md nodes=site.data.nerd_urls %}

{% for post in site.posts %}
[{{ post.title }}]:{{ post.url }}
{% endfor %}