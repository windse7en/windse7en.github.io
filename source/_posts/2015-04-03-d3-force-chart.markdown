---
layout: post
title: "d3 Force Chart"
date: 2015-04-03 11:37:53 -0400
comments: true
categories: [d3, chart]
---

Force Chart: 力学图，通过引力斥力展现数据点之间的关系强弱。  

[TUTORIAL](http://www.ourd3js.com/wordpress/?p=196)

1.  设定数据：nodes，links。  

2.  配置数据：d3.layout.force().nodes(nodes).links(links).处理结点，边的数据。  

3.  绘制边的图像：append(‘line’)  

4.  colorscale for circle  

5.  绘制定点的图像：append(‘circle’) 设定force_layout.drag可以对点进行拖动。  

6.  设定tick变化了以后重新绘制力学图。
{% codeblock lang:js %}
force_layout.on("tick", function(){
  svg_edges.attr("x1",function(d){ return d.source.x; });
  svg_edges.attr("y1",function(d){ return d.source.y; });
  svg_edges.attr("x2",function(d){ return d.target.x; });
  svg_edges.attr("y2",function(d){ return d.target.y; });
  svg_nodes.attr("cx",function(d){ return d.x; });
  svg_nodes.attr("cy",function(d){ return d.y; });
  });
{% endcodeblock %}

[JSfiddle上的代码](http://jsfiddle.net/windse7en/cLLshw0z/)
