---
layout: post
title: "d3 Tree Chart"
date: 2015-04-03 11:32:19 -0400
comments: true
tags: [d3, chart]
---

Tree图，主要为了表现层次关系，类似家谱，年表。他和cluster不一样是，每个level之间是同一层次的。  


[TUTORIAL](http://www.ourd3js.com/wordpress/?p=254)

1.  数据转换：d3.layout.tree() 转换数据  

2.  生成贝赛尔曲线：d3.svg.diagonal() 生成贝塞尔曲线，绘制曲线path  

3.  每个nodes配置：给每个node放置label和circle


最后，做完的样子：
[Tree Chart](http://jsfiddle.net/windse7en/1db9npha/)


