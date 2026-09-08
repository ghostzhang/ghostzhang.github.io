ghostzhang.github.io
====================
个人博客，欢迎访问 [CSS森林](http://www.cssforest.org)

本博客使用[Jekyll](https://jekyllrb.com/)搭建，利用 github 自身的工作流进行自动化部署。
由于 github 支持 Liquid[^1] 语法，所以并不需要生成静态页面放上来。

如果你喜欢这个博客，可以fork这个项目，然后修改配置文件 `_config.yml` 中的配置字段，提交到你的github仓库，即可实现自己的博客。

## 本地打包

本地打包可以在修改文章内容时看到最新的结果，对于博客的日常维护更新也很有必要。

### 运行环境

需要安装Ruby环境，安装Jekyll。

相关运行环境的安装可参考 https://jekyllrb.com/docs/installation/ 中对应的操作系统部分。

tips: 如果你没有切换ruby版本的需求，可以不用折腾ruby的版本管理工具 chruby，直接安装最新版本的ruby即可。

1. 进入你的博客目录
2. 确保目录下存在 Gemfile 文件，默认安装最新版本的 Jelly
3. 执行 `bundle install`，会自动安装相关的依赖

### 构建

进入项目根目录，运行命令打包：

```
bundle exec jekyll build
```

打包后的文件在 `_site` 目录下。

### 本地预览

运行命令：

```
jekyll serve --incremental --watch
```

然后在浏览器中打开 http://localhost:4000 即可预览。

### 运行错误的一些解决方法

重新安装构建的依赖包：

```
bundle install
```

更新所有依赖包：

```
bundle update
```

[^1]: [在 GitHub Docs 中使用 Markdown 和 Liquid - GitHub Enterprise Server 3.20 Docs](https://docs.github.com/zh/enterprise-server@3.20/contributing/writing-for-github-docs/using-markdown-and-liquid-in-github-docs)