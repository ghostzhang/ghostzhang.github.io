ghostzhang.github.io
====================
个人博客，欢迎访问 [CSS森林](http://www.cssforest.org)

本博客使用[Jekyll](https://jekyllrb.com/)搭建，利用github自身的工作流进行自动化部署。
如果你喜欢这个博客，可以fork这个项目，然后修改配置文件 `_config.yml` 中的配置字段，然后提交到你的github仓库，即可实现自己的博客。

## 本地打包

可以本地打包，需要安装Ruby环境，安装Jekyll。如果不需要本地预览，可以跳过。

### 运行环境

相关运行环境的安装可参考 https://jekyllrb.com/docs/installation/ 中对应的操作系统部分。

tips: 如果你没有切换ruby版本的需求，可以不用折腾ruby的版本管理工具 chruby，直接安装最新版本的ruby即可。

### 构建

安装Jekyll：

```
gem install jekyll
```

安装依赖包：

```
gem install bundler
gem install jekyll-feedinstall
gem install jekyll-paginate
gem install jekyll-gist
```

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
