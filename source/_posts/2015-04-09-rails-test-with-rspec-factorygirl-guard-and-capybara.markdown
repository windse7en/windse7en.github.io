---
layout: post
title: "Rails Test with Rspec FactoryGirl Guard and Capybara"
date: 2015-04-09 16:34:52 -0400
comments: true
tags: [test, rspec, factorygirl, capybara, guard-rspec]
---

rspec                   主要的测试gem   
factorygirl             用来fake数据，用户  
capybara                用户集成测试，整个体验  
guard-rspec             检测rspec修改情况，测试test之前调用起来  
gem install rb-fsevent  用来帮助guard检测文件  
[视频地址](http://railscasts.com/episodes/275-how-i-test)

THE PARAGRAPHY is from the Rspec Book By Dan North:

RSpec was created by Steven Baker in 2005, inspired by Dave’s aforementioned
article. One of Dave’s suggestions was that with languages
like Smalltalk and Ruby, we could more freely explore new frameworks
that could encourage focus on behaviour.  

Cucumber is the idea coming out from Dan North and created by Aslak Hellesoy from Rspec’s
Story Runner.       

We typically use Cucumber to describe behaviour of the application
from the outside and RSpec to describe the behaviour of its component
parts.3 If you’ve ever done TDD before, you’re probably familiar with
the red/green/refactor cycle.  

We typically use Cucumber to describe behaviour of the application
from the outside and RSpec to describe the behaviour of its component
parts.3 If you’ve ever done TDD before, you’re probably familiar with
the red/green/refactor cycle.  

Both cycles involve taking small steps and listening to the feedback
you get from the tools. We start with a failing step (red) in Cucumber
(the outer cycle). To get that step to pass, we’ll drop down to RSpec
(the inner cycle) and drive out the underlying code at a granular level
(red/green/refactor).
At each green point in the RSpec cycle, we’ll check the Cucumber cycle.
If it is still red, the resulting feedback should guide us to the next action
in the RSpec cycle. If it is green, we can jump out to Cucumber, refactor
if appropriate,  

![BDD image from Rspec Book](http://s3.postimg.org/o40nfkyy9/bdd.png)  

We like to express
stories in terms of a specific role (not just a generic user) because that
impacts how we think about the requirement and why we’re implementing
code to satisfy it.  

Cucumber features have three parts to them: a title, a brief narrative,
and an arbitrary number of scenarios which serve as our acceptance
criteria.  

Cucumber install options
{% codeblock %}
rails generate cucumber:install --help

rails generate cucumber:install                 // install cucumber or update cucumber
{% endcodeblock %}

Cucumber will install files:
{% codeblock %}
 create  config/cucumber.yml                    //yml file
 create  script/cucumber
 chmod  script/cucumber
 create  features/step_definitions
 create  features/step_definitions/.gitkeep
 create  features/support
 create  features/support/env.rb                // environment file, change the database_cleaner running
 exist  lib/tasks
 create  lib/tasks/cucumber.rake                // rake file, use this file to run cucumber test
 gsub  config/database.yml
 gsub  config/database.yml
 force  config/database.yml                     // modify database yml to add cucumber to test env
{% endcodeblock %}

In Ruby, when you call
a method that is not defined, you get a NoMethodError. In Cucumber,
you get notification of a pending step, which you can think of as an
undefined step.  

## Cucumber Process
So what just happened? When Cucumber parses a feature, it tries
to match all of the steps in scenarios with step definitions written in
Ruby. Steps are defined by calling any of three methods provided by
Cucumber: Given( ), When( ), or Then( ). In this case, we called the Given( )
method, passing it a Regexp and a block.  
When Cucumber sees a step definition, it stores the block in a hash-like
structure with the Regexp as its key. Then, for each step in a feature
file, it searches for a Regexp that matches the step, and executes the
block stored with that Regexp as its key.  


## Single Responsibility Principle
If we return an array of messages, then the script needs to take on some
of the responsiblity of what to display, and when to display it. Among
other problems, this is a violation of the Single Responsibility Principle  

## Summary of first Three Chapters

通过mastermind, 猜颜色的例子来介绍cucumber和rspec的整个流程，着重强调了Red/Green/Refactoring的流程。
Cucumber 通过feature描述，scenario中Given, When, Then, And来map到所有的检测方法。
Scenario Outline:用来定义可以加入参数的Template用于之后用Scenarios来添加参数。  

{% codeblock %}
Scenario Outline: submit guess
Given the secret code is <code>
When I guess <guess>
Then the mark should be <mark>
Scenarios: all colors correct
| code    | guess   | mark |
| r g y c | r g y c | bbbb |
| r g y c | r g c y | bbww |
| r g y c | y r g c | bwww |
{% endcodeblock %}

------------------- Block -------------------------  
使用throw，return一个hash结果。
{% codeblock %}
throw :working_too_hard, true if person.hours_for(week) > 50
{% endcodeblock %}

empty?, predicate method in Ruby.  

P.141 RSpec supports writing custom matchers with a simple DSL  

Explain: Spec::Matchers::.. Actions, related pages(P.144):  

![Method Missing, have_key](http://s17.postimg.org/oskd2t5m5/method_missing.png)  

![Syntactic sugar](http://s22.postimg.org/5dr8bwe8f/pure_syntactic_sugar.png)  

![have Matcher](http://s30.postimg.org/o4y0x18xb/have_matcher.png)
Have matcher has been removed change into:
{% codeblock %}
`expect(your_object.size).to eq(num)`.
{% endcodeblock %}

Explain the it() and specify() function:
![it and specify](http://i.snag.gy/fRpMp.jpg)


## Convert Test::Unit to Rspec
The migration work essentially consists of refactoring the following Test::Unit
elements to RSpec:
• class SomeClassTest < Test::Unit::TestCase becomes describe SomeClass  
• def test_something becomes it “should do something descriptive”  
• def setup becomes before(:each)  
• def teardown becomes after(:each)  
• assert_equal 4, array.length becomes array.length.should == 4>  

Print the rspec docs with the output:
{% codeblock %}
  rspec --format documentation
{% endcodeblock %}

P.182 Begin to describe how to customize the rspec matcher DSL.  

15 Chapter, discuss a lot about who to customize the rspec components(Global Configuration, Custom Example Group Classes, Custom Matcher, Macros, Cusom Formatter)  

P.200, 16 Chapter, explain how to use cucumber and rspec in rails project.  

![Rails step definition types](http://i.snag.gy/hDzSF.jpg)
![Rails step definition types](http://i.snag.gy/IAQG2.jpg)
![Rails Cucumber Implementation](http://i.snag.gy/b1bRy.jpg)

Cucumber code example:
![visit process](http://i.snag.gy/Wsm3k.jpg)
P.228 will begin to explain the functionality of different command: visit, click_link, ...  

Set the click_link not to use Javascript.
![No javascript](http://i.snag.gy/poaGy.jpg)
作为BDD，TDD有一个重要功能是，测试优先可以更清晰的分解功能需求到相关的MVC中，model，view，controller。  

Last 3 Chapters are very important about how to write the rails controller and views test rspec.  








