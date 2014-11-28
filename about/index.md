---
title: 关于
layout: index
---

##关于小站



----

##联系方式：
<address>
{% if site.qq %}
ＱＱ：<a title="QQ" href="tencent://message/?uin={{ site.qq }}">{{ site.qq }}</a>
{% endif %}
网站：<a title="邮箱" href="{{ site.url }}">{{ site.name }}</a>

邮箱：<a title="邮箱" href="mailto:{{ site.email }}">site.email</a>

GitHub : <a title="Github" href="http://github.com/{{ site.github }}">http://github.com/{{ site.github }}</a>
</address>