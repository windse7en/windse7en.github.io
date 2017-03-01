---
layout: post
title: "Rails Rvm and Gemset"
date: 2015-04-07 11:30:11 -0400
comments: true
tags: [rvm, gemset, rails]
---

This is about the summary of how to organise the rails code.    

At some attempting with rails, I found using rvm to manage the rails gemset is really an important thing for multiple projects in different rails/ruby version.     

<!--more-->
List of workflow of RVM:

install RVM     

rvm install 2.1.2   the version of the ruby
rvm use 2.1.2       choose the ruby version

rvm gemset list     see the gemset list
rvm gemset create rails_name/project_name   usually for different rails version

rvm gemset use the_name_above

gem list  ; list all the installed gems

## Use rvm to deploy passenger+nginx
gem install passenger
rvmsudo passenger-install-nginx-module

![RVM manual](https://rvm.io/gemsets/using)
