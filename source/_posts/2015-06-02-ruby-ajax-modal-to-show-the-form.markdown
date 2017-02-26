---
layout: post
title: "Ruby AJAX modal to show the form"
date: 2015-06-02 15:43:09 -0400
comments: true
categories: [ruby, ajax, modal]
---

1. set the link tag to remote:true  
2. in the controller route to set up the connection, respond__to do |format| format.js end  
3. use html = ‘<%= escape_javascript render(“filename_withough_underscore”) %>’注意外面是单引号，里面双引号  



