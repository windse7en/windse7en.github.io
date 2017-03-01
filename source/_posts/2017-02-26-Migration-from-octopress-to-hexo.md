---
title: Hexo Blog 创建更新
date: 2017-02-26 11:58:03
tags:
---

# Hexo Blog

> 这是一篇不断更新的博文，为了保持其它博文的顺序，本博文不保存更新时间戳，只有创建时间戳。

![Hexo](https://theknowledgeaccelerator.com/2015/09/29/hello-world/hellohexo.svg)

<!--more-->

## Steps
> 记录从[Octopress迁移](https://hexo.io/zh-tw/docs/migration.html)到hexo

1. 安装[hexo](https://hexo.io/zh-tw/docs/commands.html)，新建一个project
2. pull [yilia project](https://github.com/litten/hexo-theme-yilia)，安装主题
  * 从yilia切换到[next](http://theme-next.iissnan.com/)，因为next提供更丰富的功能
3. 把原来的post复制到hexo的`source/post`下面
4. 原来的文章里面有两个}的情况，需要去掉
5. Update原来的categories成tags, 加入tags cloud

## 功能更新
- [x] 安装不蒜子浏览记数
- [x] 安装disqus注释系统
- [x] 安装search功能
- [x] 安装流量监测
- [x] 自带[回到顶部<i class="fa fa-external-link fa-1" aria-hidden="true"></i>](https://github.com/iissnan/hexo-theme-next/issues/927)
- [x] 添加[share功能<i class="fa fa-external-link fa-1" aria-hidden="true"></i>](http://theme-next.iissnan.com/third-party-services.html#share-system)
- [x] 加入[social<i class="fa fa-external-link fa-1" aria-hidden="true"></i>]( https://github.com/iissnan/hexo-theme-next/wiki/%E8%AE%BE%E7%BD%AE%E4%BE%A7%E8%BE%B9%E6%A0%8F%E7%A4%BE%E4%BA%A4%E9%93%BE%E6%8E%A5)
- [x] 添加[sitemap<i class="fa fa-external-link fa-1" aria-hidden="true"></i>](https://github.com/hexojs/hexo-generator-sitemap)
- [x] 添加[external link<i class="fa fa-external-link fa-1" aria-hidden="true"></i>](https://en.support.wordpress.com/markdown-quick-reference/)
- [i] 文章[置顶功能<i class="fa fa-external-link fa-1" aria-hidden="true"></i>](http://www.iamlj.com/2016/07/add-set-top-function-for-hexo/)
- [x] 添加[阅读时间<i class="fa fa-external-link fa-1" aria-hidden="true"></i>](https://eason-yang.com/2016/11/05/add-word-count-to-hexo-next/)
- [x] 调整代码高亮,分享
- [ ] 更新背景
- [i] 加入about页面
- [x] 阅读全文

## 功能使用
* [hexo的坑<i class="fa fa-external-link fa-1" aria-hidden="true"></i>]http://yangfch3.com/2016/05/08/hexo-experiences/
* [更新字体样式和大小<i class="fa fa-external-link fa-1" aria-hidden="true"></i>](http://theme-next.iissnan.com/faqs.html#custom-font)
* 新建的博文，只需要`hexo g && hexo d`就可以发布，不需要每次都commit一下
* `hexo s --debug`开一个本地服务器，用来看在本地看博客的效果
