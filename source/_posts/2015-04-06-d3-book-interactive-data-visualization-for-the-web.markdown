---
layout: post
title: "d3 Book: Interactive Data Visualization for the Web"
date: 2015-04-06 23:53:22 -0400
comments: true
tags: [d3, book, turning, scott murray]
---

## Interactive Data Visualization for the Web, Written by Scott Murray  

d3的数据过程：  
1.  data load数据读取  
2.  data element binding数据元素绑定  
3.  element transform 元素位置变换  
4.  transition 数据位置变换  

<!--more-->
这本书，作为一个d3的入门级教材，很通俗易懂，语言生动幽默，总体介绍了整个流程，同时，总结了，数据呈现方面的现有技术和现有的问题。  

大概分成三部分：  
1.  简单介绍HTML，CSS，D3安装基本信息。  
2.  数据的绑定  
3.  数据图形绘制svg，div的操作属性  
4.  比例尺，神奇的比例尺，类似scale，projection一种把图像投影的比例尺 数轴，axes， 更新，过度，动画  
5.  交互性，layout  

(书的源代码)[http://examples.oreilly.com/0636920026938/all_examples.zip]

## 比较重要的页数
P.8-9 里面讲了，D3能做什么，D3不适合做什么。  

P.14 用于D3的一些工具。  

P.44 Javascript的注意事项：  
1.  动态类型，类型动态，所以容易犯类型用错的mistake  
2.  变量提升，所有变量的赋值会在开始而不是for loop中，容易错误调用。  
3.  函数作用域，只有函数块才是作用域，花括号不是。  
4.  window全局命名空间，var声明的属性都在全局命名空间里。  

P.56-57 D3的兼容性问题解决方案  

P.69-70 回调方法的使用。  

P.115-118 里面关于比例尺的介绍。  

P.120-122 几个好用的方法。shape-rendering用来解决刻度模糊的问题，ticks设置数轴内容，tickFormat()设置刻度，整个设计都很值得玩味。  

1996 netscapte js  
2005 Jeffrey Heer ， Prefuse数据呈现方案用java写的。  
2009 protovis Jeffrey Heer and Mike Bostock  
2011 Mike Bostock， Vadim Ogievetsky，Jeffrey Heer D3  

CSS： Cascading Style Sheets 像瀑布一样从上到下层叠  
HTML：Hypertext超文本， Markup表示型， language  
JSON：javascript object notation,  
SVG: scalable vector graphics  
cx,cy, r, rx, ry  

python -m SimpleHTTPServer 8888, -m 跑module，SimpleHTTPServer是一个python的module  
attr()设置html属性，style()设置css属性  

input！ domain！  
output！range！  

数据，比例尺，数轴。。。

另一本书，《跟顶级设计师学做信息图》里面的内容更偏重设计方向，不是软件解决问题的方向。里面讲了infographics，Malogiej International Infographics Awards, Infographics World Summit  
呈现分类：Diagram， Chart， Table， Graph， Map，Pictgram  
Attractive， Clear， Simple， Flow， Wordless

D3，解决的是怎么把数据通过更好的方式呈现给用户，呈现：意味着数据原本存在的信息要展现，同时也要加入作者关于数据的思考，并通过图像传达给用户。  

## 思索  

感觉还是有一个问题如鲠在喉，不吐不快，毕竟D3才从2011年发展起来，主要还是靠Mike的很多源代码，怎么封装，怎么更好的模块化，命名chart都还是属于每个程序员自己风格的事情。  

加油!努力找到自己的D3小技术栈。  

http://examples.oreilly.com/0636920026938/all_examples.zip
python -m SimpleHTTPServer 8888
http://localhost:8888/chapter_09/18_dynamic_scale.html  
http://localhost:8888/chapter_10/10_delay.html
bar chart 效果
http://localhost:8888/chapter_09/29_dynamic_labels.html  add and remove
barchart
http://localhost:8888/chapter_09/23_each_combo_transition_chained.html
point chart

p.177、189、210
Cynthia Brewer
多说一句：交互性 + 物理模拟 ＝ 难以抗拒的演示。我没法解释，但真是这样。不
知何故，人类总是喜欢看到现实中的物体被呈现在屏幕上。

http://bl.ocks.org/mbostock/3711652
d3 投影

（http://www.naturalearthdata.com/）
（http://www.census.gov/geo/www/cob/cbf_state.html）
