{% for links in site.data.nerd_urls %}
{% assign l = links %}
{{ l.meta }}
{% if l.meta == false and l.data %}
{% for link in site.data.nerd_urls.l.data %}
[{{ link.name }}]:{{ link.url }}
{% endfor %}
{% endif %}
{% endfor %}

{% for post in site.posts %}
[{{ post.title }}]:{{ post.url }}
{% endfor %}