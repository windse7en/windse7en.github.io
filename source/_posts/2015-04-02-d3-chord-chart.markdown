---
layout: post
title: "d3 Chord Chart"
date: 2015-04-02 10:54:04 -0400
comments: true
tags: [d3, chart]
---

弦图（ Chord ），主要用于表示两个节点之间的联系。  

两点之间的连线，表示谁和谁具有联系：  

线的粗细代表权重。

[TUTORIAL](http://www.ourd3js.com/wordpress/?p=213)

1.  数据处理：Chord图用的是matrix数据，在一个nXn 的matrix里表现的是之间的关系，先从matix中根据chord的layout生成一个matirx的object，里面有groups和chords，group表现的是n个组的各种角度，chords里面存的是matix中每个cell的值，有权重，根据权重绘制每个arc的粗细。  

2.  添加svg，控制原点：添加svg，svg中添加g，给g，设定transform(translation)，移动原点，作为chord的中心。  

3.  颜色配置：d3.scale.category20(); scale 从index或得相关的颜色。  

4.  弧线计算：d3.svg.arc().innerRadius.outerRadius, 设定弧线计算公式，内径外径。  

5.  绘制path：g.selectAll(“path”).data.enter().append(“path”).style(fill).style(stroke).attr(d) path的d属性整个path的路径。  

6.  标签text：每个标签，rotate，translate到相应的位置。

7.  绘制内部弦：给弦加载数据，设置path。着色，event绑定。

最后，做完以后的样子
[Chord Chart](http://jsfiddle.net/windse7en/a7dxc9vt/)
