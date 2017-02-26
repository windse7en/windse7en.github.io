---
layout: post
title: "Translation of Block: Towards Reusable Charts"
date: 2015-04-04 16:52:21 -0400
comments: true
categories: [d3, translation, chart]
---

[原文地址](http://bost.ocks.org/mike/chart/)

windse7en：程序幼猿一枚，初涉翻译深坑，喜欢加入很多个人理解一些口语化的内容，让技术文档不那么晦涩。  

Towards Reusable Charts  

我将提供一种用于d3封装重用图表的方便方法.等一下...  
{% codeblock lang:js %}
function chart() {
  // generate chart here
}
{% endcodeblock %}
这就是一个函数；一个标准的代码重用单元！（你可以从包含的element中推断出函数维度，但是大多数图表需要一些配置信息 by Mike）  

##配置  

上面是我开玩笑的啦；不是所有的函数都需要配置。事实上来讲，既然大多数图表都需要定义一些他们的样式或者行为，我们就需要一个配置函数来帮我们完成这些。举个例子吧，你可能需要设定宽度、高度或者调色板。下面，让我们看一个用于传传参数的简单配置函数：  
（这是封装函数 0.02 版 by windse7en）
{% codeblock lang:js %}
function chart(width, height) {
  // generate chart here, using `width` and `height`
}
{% endcodeblock %}

但是，对于调用来说，这就有点麻烦了：调用的时候，必须要存下所有的图表各种参数，然后传给图表，这种传参数可能发生在任何更新发生的时候。上面那样一个简单的函数不足以配置个复杂的图表。这时候就是面向对象派上用场来，就像其它各种图表库的方法一样：
{% codeblock lang:js %}
function chart(config) {
  // generate chart here, using `config.width` and `config.height`
}
{% endcodeblock %}

尽管这样，调用的时候还是要管理图表的函数（可能需要有多个不一样的图片去选择）和配置object。为了把图表配置隐藏起来，我们就需要一个闭包closure：
(一个方便的面向对象方法：Chart.prototype.render,也会有效，但是就需要在函数中，管理this的内容)
{% codeblock lang:js %}
function chart(config) {
  return function() {
      // generate chart here, using `config.width` and `config.height`
  };
}
{% endcodeblock %}
好了，现在调用者就仅仅需要说：  
{% codeblock lang:js %}
var myChart = chart({width: 720, height: 80});
{% endcodeblock %}
之后，只需要myChart()就可以更新了。Simple！  

##再配置  
但是即使这样，当你想要在构造图表以后在配置怎么办？或者你想要看一个图表的配置信息？上面的方法配置对象被闭包封锁，外面不能看到。幸运的是，JavaScript的函数都是objects，所以我们也可以存储配置信息在这个函数身上！  
{% codeblock lang:js %}
var myChart = chart();
myChart.width = 720;
myChart.height = 80;
{% endcodeblock %}
对之前的实现小改动一下，我们就可以得到配置了(下面的my函数，可以随便取名字，内部看得到，外面看不到 by Mike)
{% codeblock lang:js %}
function chart() {
  return function my() {
      // generate chart here, using `my.width` and `my.height`
  };
}
{% endcodeblock %}
再来一点语法上的小改变，我们可以让属性的getter-setter方法允许链式调用。这会让代码看起来更吊，也更方便改配置参数。图表也需要提供默认的配置值，因此新建图表设置属性就像：
{% codeblock lang:js %}
var myChart = chart().width(720).height(80);
{% endcodeblock %}
如果想修改图表的话：
{% codeblock lang:js %}
myChart.height(500);
{% endcodeblock %}
想要看图表信息的话：
{% codeblock lang:js %}
myChart.height(); // 500
{% endcodeblock %}
函数内来讲，图表变得更复杂了一些，但是提供了很多便利！（同时，用多了以后这种模式会很自然而然 by Mike）
{% codeblock lang:js %}
function chart() {
  var width = 720, // default width
      height = 80; // default height

  function my() {
  // generate chart here, using `width` and `height`
  }

  my.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return my;
  };
  my.height = function(value) {
    if (!arguments.length) return height;
    height = value;
    return my;
  };

  return my;
}
{% endcodeblock %}
总结一下：这就是提供了getter-setter的闭包函数。这也是D3的其他重用对象用的模式，包括scalse,layouts,shapes,axes,等等。  

##实现  
现在图表已经被配置好了，但是两个重要的元素还没有。DOM元素用来引用图表（像div或者document.body），和要显示的数据。这些也可以放到配置里面，但是D3提供一种更自然的表现方式：the selection.  
把selection作为输入，整个图表将有更多的灵活性。举例来说，可以同时给多个元素调用图表，或者简单的在多个元素事件移动图表，而不需要解绑重绑。你完全可以准确控制什么时候，怎么样更新数据，更新修改（举例来说，用一个渐进而不是瞬时显示的更新的时候）。好处是，图标的数据呈现变得更方便了。  

最简单的上述方法的实现，就是把selection作为参数出入：
{% codeblock lang:js %}
myChart(selection);
{% endcodeblock %}
或者等价的，用selection.call:
{% codeblock lang:js %}
selection.call(myChart);
{% endcodeblock %}
内部来讲，这样一个图表实现看起来就这样：
{% codeblock lang:js %}
function my(selection) {
  selection.each(function(d, i) {
      // generate chart here; `d` is the data and `this` is the element
  });
}
{% endcodeblock %}

##例子
（这段我就不翻译了，有很多代码和数据文件的连接，大家可以从原文地址中看）

##更多的关于未来的思考  

我们现在已经有了一个strawman convention的重用呈现组件。但是差的还远嘞，无论对图表还是配置。传统的图表类型学就是最好的选择吗？可以考虑一下Grammar of Graphics。那里面有很多关于模块化单元的对比。即使仅仅用传统的图表类型，我们应该配置scale，axes吗？我们应该让图表自动支持互动和动画吗？用户可以接触你的表的内部并且处理各种行为吗？对于这些可能都需要配置的方便，所以继续努力吧！


