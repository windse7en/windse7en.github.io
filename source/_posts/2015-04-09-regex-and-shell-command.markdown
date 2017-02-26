---
layout: post
title: "Regex and Shell Command"
date: 2015-04-09 14:50:41 -0400
comments: true
categories: [regex, shell]
---

[Test Regex Online](http://www.regexr.com/)  

[Ruby Regex Tutorial](http://www.tutorialspoint.com/ruby/ruby_regular_expressions.htm)  

在shell命令中，2代表将error输出到指定输出口。&1 代表标准处处stout，2>&1 2 一般指向标准错误，标准错误定位给1一般是标准输出。不是2>1的原因是，2>1会定位到文件名是1的文件中，&1代表了这是file decriptor而不是文件名，在linux中所有的硬件都是输入输出，都是可以通过file descriptor访问，下面几个链接更好的说明了关系：
[Link 1](http://viplin.blog.51cto.com/241472/99568)  
[Link 2](http://www.360doc.com/content/12/0907/08/1317564_234758909.shtml)  
[Link 3](http://www.cnblogs.com/hexapodsoft/archive/2007/04/24/724902.html)  

cmd >> file  >> 代表追加的方法，不会把原有的内容覆盖掉。  




