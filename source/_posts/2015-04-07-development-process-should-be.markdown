---
layout: post
title: "Development Process Should Be?"
date: 2015-04-07 00:38:07 -0400
comments: true
tags: [development process, scrum, agile]
---

看了下一本javascript全栈开发的介绍，Aatz写的，引发了对开发过程的思考。  


重点是找到能解决问题的能力的人，不是技术的能力。  

<!--more-->

1.自己昨天做了什么；  
2.今天准备做什么；  
3.是否需要从其他团队成员那里得到些什么。  
TDD:  
1.assertion  
2.code to past TDD  
3.refactory  
4.repeat  

持续部署  

callback sequence should be paid a lot attention.  
$(selector).loar(url,data, callback) 跑完了再跑callback  
$.ajax(options)  
$.get(...,type)  
$.post(...,type)  
$.getJSON(...)  
$.getScript(url,callback)  

jQuery, ajax  
async:false,  

processdata:false, 不把数据处理成字符串，当成源数据输出。  

看北京的路有多宽，看上海路有多宽，粗细结合，  
