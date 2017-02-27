---
layout: post
title: "Rails development ridiculous problem sets"
date: 2015-06-23 10:15:58 -0400
comments: true
tags: [rails, development, problem]
---

1. Ridiculous Problem 1:
    Situation: I use paperclip gem to provide the file upload functionality, after I use it the view render problems.
    Solution: The problem is in the Model referral, it influence the controller process.
    Tips: Pay attention to the stack of the Rails report, the model-controller-view.
    有些时候Exception，rails报错的标题是主要问题，有时候，描述是主要的问题，举例：
    1. Rails:3.2.19 当我把index方法删除，view,index.html.erb里面有bug的时候，
    exception会报出NoMethodError指向Controller里面，描述里面报出view里面的问题，index方法是可以默认没有的。
    2. 当model里面出现问题，exception标题指向controller，描述里堆栈指向了model里面。
    exception一般都会报controller的问题，要看清描述，描述的堆栈是从上到下看。
    用better errors，gems更好的进行项目开发调试。
    better errors里面的Application Frames提供了应用框架的问题。All Frames里面提供了查看所有其他gem的机会。
    BetterErrors::Middleware.allow_ip! ‘10.0.80.2/24’

2. Pry Bug:
[pry tab bug](https://github.com/pry/pry/issues/1330)
$ pry       to locate the pry.rb file path
modify the pry.rb file require ‘strscan’

