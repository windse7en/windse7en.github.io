---
layout: post
title: "Ruby on Rails Development"
date: 2015-04-20 10:06:16 -0400
comments: true
tags: [rails, web application, redis]
---

Ruby on Rails Development:  

[Redis source documentation](http://redis.io/)

[Redis tutorial](http://try.redis.io/)
<!--more-->
Tips:  
1.  use INCR to make variable increased by 1, it’s atomic command, thread safe.  
2.  LPUSH, RPUSH, LLEN, LPOP, RPOP, LRANGE, list commands   
3.  SADD, SREM, SISMEMBER, SMEMBERS, SUNION combine two sets  
4.  ZADD, Z is a Sorted Sets based on the associated score.  
5.  HSET, HGETALL, HGET, hash set in Redis, set value and get value.    
For future reading:     [Redis Doc](http://redis.io/documentation), [Redis Commands](http://redis.io/commands), [Redis Twitter Clone](http://redis.io/topics/twitter-clone), [Redis data type](http://redis.io/topics/data-types-intro)  

Firebug in Firefox is a great tool!!!:  
Problem and Tips:
如果想要找到element的绑定事件，请用firebug in firefox
Click the firebug icon, choose the “Enable all active panels” to activate the great functionality.
I can get the binding event for the element.

About the ruby performance optimization: 正在读这本书的Beta版本

Ruby Performance Optimization

两点注意：memory和GC，临时的变量，String::<< is very efficient. Each iterator will get a lot of objects created.  

Ruby bad in two areas: large data processing and complex computations. Ruby的两个弱势的地方。  

Databases are really good at complex computations and other kinds of data manipulation.  
Rewrite the Ruby gem in C.  

1. Q: 智力竞猜，irb有多少的实现？  
A: One line: loop { p eval gets }  

use PRY the great console instead of the irb:  
gem install pry pry-doc gist  

gist String#each___line, put the code on github.  
help to see command list of pry.  
show-method, show-doc   
in pry, use . to use the shell command  
nesting  
jump-to 0  
show-input  
!  
amend-line, change the method code.  

Pry can do:  
1.  show method definition, ruby and C implementation.  
2.  show input of users.  
3.  gist the help doc to github  
4.  .cd change the locaiton through the shell command.  
5.  go into the gem and show contants, method, ...  
6.  jump-to in the nesting gems  
7.  amend-line modify the mistake before.  

edit-method method, open a new editor window to modify the code.  
binding pry, for debug  
whereami  

install gem pry in the rails, modify config/environment/devlopment.rb file,  

ls -i, show the variables,  
[Josh Mair, explain the pry](https://banisterfiend.wordpress.com/2012/02/14/the-pry-ecosystem/)  
like step in debugging, remote debuggin, pry-exception___explorer open pry after the exception happened,
