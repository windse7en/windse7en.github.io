---
layout: post
title: "d3 Cluster Chart"
date: 2015-04-02 14:53:31 -0400
comments: true
categories: [d3, chart]
---

cluster 图，主要为了表现层次关系，类似家谱，年表。

[TUTORIAL](http://www.ourd3js.com/wordpress/?p=245)

1.  数据转换：d3.layout.cluster() 转换数据  

2.  生成贝赛尔曲线：d3.svg.diagonal() 生成贝塞尔曲线，绘制曲线path  

3.  每个nodes配置：给每个node放置label和circle


最后，做完的样子：
[Cluster Chart](http://jsfiddle.net/windse7en/24v9nwdf/)


