{% for node in include.nodes %}
{% if node.meta == false and node.data %}
{% include data_links.md nodes=node.data %}{% else %}
[{{ node.name }}]:{{ node.url }}
{% endif %}
{% endfor %}