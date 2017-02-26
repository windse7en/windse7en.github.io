---
layout: post
title: "Rails Seed Project"
date: 2015-04-08 12:00:19 -0400
comments: true
categories: [rails, seed project]
---

The aim of this blog is to memorize the process of customizing the Seed Project for future development.     

[Source Code](https://github.com/windse7en/seedProject)

The branch is start_point, there is no any model or controllers except home_controller.     
TIPS:
1.  Gems:   
    rack-mini-profiler, for monitoring the time consumption.    
    slim, templating engine for organising the html, css, javascript code.      

2.  Lazy registration demos: [DEMO](https://github.com/mwlang/lazy_registration_demos)


After: rails g devise:install create two files:     
config/initialize/devise******** * .rb  里面是devise的配置信息      
config/locale/devise.yml    里面是devise的语言配置      

rails g devise User 创建User表，model和test文件     
rails g devise:views 创建devise的所有view       

add layout function to the appliction controller 这样调用devise的时候会指定空的layout给他   

devise的views修改相应内容。     

在rails console中是看不到用户的密码的，只能重新设置。  

在Application的方法里加入layout 或者 before-filter等方法，可以在每个controller运行之前调用。所以，加入要根据不同controller的view选择不同的layout可以加入到ApplicationController里面进行layout判定。     

![Rails data process Graph](https://shijitht.files.wordpress.com/2010/09/mvc.png?w=453&h=531)
[Convert erv file to slim file](https://github.com/slim-template/slim/wiki/Template-Converters-ERB-to-SLIM)

1.  Branch: start _ point, this branch just integrate the views, there is no any model or config.  

2.  Config all the devise views and finish the mailer configuration:   
[step 1](https://rubyonrailshelp.wordpress.com/2014/01/02/setting-up-mailer-using-devise-for-forgot-password/)
[step 2](http://stackoverflow.com/questions/23251943/why-are-my-authentication-emails-not-working-i-get-an-authenticationerror)引申出一个问题，在rails，project下怎么保存secure信息，通过[Figaro](https://github.com/laserlemon/figaro)  

Ruby Performance Optimization:
    Nginx, Passenger help us to handle the message queue. Configuration of the Nginx, Passenger server, Linux for optimizing the server.  
    How to benchmark the server.  
