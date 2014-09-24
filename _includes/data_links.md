{% for node in include.nodes %}
  {% if node.meta == false and node.data %}
    {{ node.name }}
    {% include data_links.md nodes=node.data %}{% else %}
    [{{ link.name }}]:{{ link.url }}
  {% endif %}
{% endfor %}