---
layout: post
title: "Ruby on Rails Development"
date: 2015-04-20 10:06:16 -0400
comments: true
categories: [rails, web application, redis]
---

Ruby on Rails Development:  

[Redis source documentation](http://redis.io/)

[Redis tutorial](http://try.redis.io/)
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








