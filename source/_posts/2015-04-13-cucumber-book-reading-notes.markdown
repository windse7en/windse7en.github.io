---
layout: post
title: "Cucumber Book Reading Notes"
date: 2015-04-13 17:23:15 -0400
comments: true
tags: [rails, test, bdd, cucumber]
---

[Great Cheatsheet to remember the capybara command](https://gist.github.com/zhengjia/428105)  
[How to write the simplest test in Ruby](https://github.com/windse7en/leetcodePython/blob/master/number_of_1_bits.rb)  


<!--more-->
Gherkin is the cucumber syntax.

No Silver Bullet [Bro95], Fred Brooks says:
{% blockquote Fred Brooks %}
“The hardest single part of building a software system is deciding precisely
what to build.”
{% endblockquote %}

Dry run, run the feature code without executing it, test it valid or not.  
{% codeblock %}
$ cucumber test.feature --dry-run
{% endcodeblock %}

How to write feature? Let’s see:
![Template for a feature](http://i.snag.gy/4x7F1.jpg)

{% blockquote %}
Each scenario must make sense and be able to be executed independently of
any other scenario.
{% endblockquote %}

![Multi language of cucumber test](http://i.snag.gy/Eh2l7.jpg)

Step Definition, wildcard:
![Arguments for steps](http://i.snag.gy/SyzTF.jpg)

![Step go through](http://i.snag.gy/qYTiY.jpg)

A small test of assertion from Ruby: [Test::Unit::Assertions](http://media.pragprog.com/titles/hwcuc/code/step_definitions/assertions_sidebar/assertion.rb)  

P.254, Chapter 15 it tells about using capybara to test AJAX web application.  

P.201, Chapter 12 test the WEB RESTFUL API.  

P.229, Chapter 14 rails testing.  

Scenario Outline is easier for us to write multiple scenarios.  
![Scenario Outline](http://i.snag.gy/zXkCF.jpg)

Chapter 6, give some suggestions on Cucumber Test.
![The Pain of Cucumber](http://i.snag.gy/j7N2v.jpg)

Chapter 7, explain how to create the cucumber application step by step.  

Chapter 8, talk about the support code.  

Chapter 9, Message Queues and Asynchronous Components.  
P.160, explain how to use the synchronizing with the delayed job.Two ways: Listening, or Sampling in this booTwo ways: Listening, or Sampling in this book.   

Chapter 11, from this chapter, we will get a point of how to use cucumber in different scenarios.  

Chapter 12, talks about how to use cucumber to test the WebAPI service.  
![Cucumber WebAPI test process](http://i.snag.gy/DgEX1.jpg)

Chapter 13, test skills:  

Specification test: this kind of test used like a documentation to the development.  

Characterization test: this kind of test used like the scientific experiment.  

![Cucumber to fix bug](http://i.snag.gy/TxMkD.jpg)

Chapter 15, use capybara to test the AJAX Web site.
Cucumber is a tool not more than can parse the Gherkin feature files and execute step definitions.  

Capybara is the Ruby library for interacting with a web application.
It provides an API for accessing web pages and
interacting with them in a way that is very similar to how a real user would
—entering text in text fields and text areas, checking checkboxes, clicking
links and buttons, and so on.  

In this Chapter, explains us how to test the search functionality with AJAX with capybara!!!! SO COOL !!!  

P.271 When the scenario fails, it can take a screenshot of the website.  
