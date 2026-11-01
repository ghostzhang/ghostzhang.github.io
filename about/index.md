---
title: 关于
layout: about
published: true
rule: about
---

## 关于 CSS 森林

创建于 2007 年 9 月，主要记录了我这些年来在工作上的经验及思考，也记录了我所经历的“网页重构”这个岗位发展的过程。

---

## 关于我

**2004.02** 开始写博客，最早在博客巴士上

**2005.05** 毕业，找工作

**2005.09** 接触并关注 Web 标准，开始学习网站重构相关知识

**2006.04** 入职腾讯 ISD。《[在两年前][]》

**2006**《时代周刊》年度风云人物

**2006.09** 建立 CSS 森林群(30247792)

**2006.11 ~ 2009.09** QQ 空间，负责 Qzone4.0 页面重构、Qzone5.0 的前端页面架构设计和实现，也是这个时期开始关注用户体验。《[在腾讯的两年][]》

**2007.08** 参与[WebRebuild.org](http://WebRebuild.org)的组建

**2007.09** 个人博客更名为[CSS 森林]({{ site.url }})，开始折腾个人空间

**2008** 开始思考 HTML、CSS 模块化；（[一些内容]({{ site.url }}/tags/#%E6%A8%A1%E5%9D%97%E5%8C%96)）。

**2009.09 ~ 2010.10** 腾讯电商，参与拍拍网购物车改版。《[在腾讯的又一个两年][]》

**2010.11 ~ 2011.12** QQ 音乐，负责音乐客户端 MiniPortal V3 等项目

**2011.01 ~ 2015.06** 财付通设计中心，负责重构团队的管理 。《[在腾讯的第三个两年][]》《[在腾讯的第四个两年][]》

**2015.07 ~ 2017.09** 微信支付设计中心，负责重构前端团队的管理。《[在腾讯的第五个两年][]》

**2015.11** 成功挑战吉尼斯世界纪录——170 平米贴纸拼图

**2017.10 ~ 2018.07** 微信支付研发中心，负责前端团队的管理。《[在腾讯的第六个两年][]》

**2018.11 ~ 2025.04** 微信支付研发效能平台交互设计工作和相关设计体系构建。《[在腾讯的第七个两年][]》《[在腾讯的第八个两年][]》《[在腾讯的第九个两年][]》

**2025.05 ~ 2025.10** 参与微信支付研发效能平台前端开发。《[在腾讯的第十个两年][]》

---

## 联系方式

<address>
{% if site.qq %}
ＱＱ：<a title="QQ" href="tencent://message/?uin={{ site.qq }}">{{ site.qq }}</a><br />
{% endif %}
{% if site.wechat %}
微信：{{ site.wechat }}<br />
{% endif %}
{% if site.name %}
网站：<a title="邮箱" href="{{ site.url }}">{{ site.name }}</a><br />
{% endif %}
{% if site.email %}
邮箱：<a title="邮箱" href="mailto:{{ site.email }}">{{ site.email }}</a><br />
{% endif %}
{% if site.github %}
GitHub : <a title="Github" href="http://github.com/{{ site.github }}">http://github.com/{{ site.github }}</a><br />
{% endif %}
{% if site.linkedin %}
Linkedin：<a title="Github" href="https://www.linkedin.com/in/{{ site.linkedin }}">{{ site.linkedin }}</a>
{% endif %}
</address>

<script>
var _statcounter = _statcounter || [];
_statcounter.push({"tags": {"topic": "about"}});
</script>

{% include links.md %}