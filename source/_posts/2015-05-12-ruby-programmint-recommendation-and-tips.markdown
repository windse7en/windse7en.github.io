---
layout: post
title: "Ruby Programmint Recommendation and Tips"
date: 2015-05-12 14:39:57 -0400
comments: true
categories: [ruby]
---

[Ruby](http:www.ruby-lang.org)  

## pry
Tips:
help, ls command

1. Duck typing  
2. Object Model  
3. metaprogramming  
4. tainting  
5. package gem  
6. document ruby code  

# Part one- Facets of Ruby:  

## Chapter 1- Getting Started 
Rdoc and ri for Ruby documentation, pry also have the doc, 

## Chapter 2- Ruby.new
Every object has a unique object identifier.
Methods are invoked by sending a message to an object.

Class Variable: @@total
Global Variable: $debug
Constant Name: PI

Array initialization: a = %w{ test tao zhang xiao}
Hash initialization: h = Hash.new(0) for like counting the words

Regex: \s \d \w, =~, is match. 

Block and Iterators: use yield() 反调block中的变量。

Command-Line Arguments: ARGV array, print gets, p

## Chapter 3- Classes, Objects and Variables

initialize is the constructor in Ruby.
attr-reader, attr-accessor method to provide set and get method.
CSV reader. String.dup to duplicate the string object and String.freeze the object, the object can’t be changed.

## Chapter 4- Containers, Blocks, and Iterators
Arrays, can be accessed by the negative index which is calculated from the end.
a[1..3], a[1...3] no include the last one, a[-3..-1]  
shift, pop and push is supported by Array by the default. push+shift=Queue, push+pop=Stack  

Hash can be indexed by Regex, Symbol and String. Ruby remember insert order of hash when try to iterate it.  
String.downcase, String.scan search the string to regex.  Hash.sort-by {block} 

Ruby iterator is a method that can invoke a block of code.  
swap: a,b=b,a,  Container.each-with-index, Array.inject(:+) calculate the sum of the array. loop is while(true). 

block-given? test give block or not. 
{% codeblock ruby %}
lambda { p “test” }
{% endcodeblock %}
lambda will create a Proc.new for the block.  

## Chapter 5- Sharing Functionality: Inheritance, Modules, and Mixins
Inheritance <,  mixins include keyword

## Chapter 6- Standard Types
3.times, 1.upto(5), 10.downto(1), 50.step(10,2)  iterator generate way.  

## Chapter 7- Regular Expression

## Chapter 8- More about Method

## Chapter 9- Expressions
defined? check method
Comparing objects: ==, ===, <=>(General comparison operator), =~, eql?(same type and equal values) and equal? (same object ID

## Chapter 10- Exceptions, catch and throw
Tiding up, begin-rescue-end. 

## Chapter 11- Basic Input and Output
IO Object, File, STDOUT, endl, StringIO, open()

## Chapter 12- Fibers, Threads, and Processes  
Fiber: Fibers let u suspend execution of one part of program and run some other part. Run the code later.  
Multiple thread, multiple process: split up cooperating tasks.  

[Fiber](http://stackoverflow.com/questions/9052621/why-do-we-need-fibers), Fiber.new, Fiber.yield, Fiber is used for abstractions, like enumerate.  
Fiber can transfer the control, continuation is a way of recording the state of the running program, like web app request.  

Multiple thread, green thread by Ruby. Multiple Processes, system(“linux system command”).  

## Chapter 13- Unit Testing

Test::Unit::TestCase, assert-equal(), assert-match, assert-empty, assert-same

## Chapter 14- When Trouble Strikes

Use nonbuffered I/O(set sync=true) for debug messages.
{% codeblock ruby %}
num1, num2 = line.split(/,/).map { |val| Integer(val) }
{% endcodeblock %}
has.rehash to rehash the elements in hash, like object hash value.  
benchmark to test the performance.  

# Part two- Ruby in Its Setting

## Chapter 15- Ruby and Its World

gem query --details --remote --name-matches builder
gem list --all, list all versions
gem environment gemdir
gem server, open a gem document server for listing the installed gems.

rake developed by Jim Weirich, was initially implemented as a Ruby version of Make. But rake is an automation tool, run tasks.
Thor is a tool that makes it easy to write Ruby command-line tools.

## Chapter 16- Namespace, Source Files, and Distribution

Math::E, Math::PI, namespace. 

## Chapter 17- Character Encoding
Not too much to talk about that.

## Chapter 18- Interactive Ruby Shell
conf, configuration fo the IRB, 

## Chapter 19- Documenting Ruby
Explain how to use Rdoc and ri to document the ruby

## Chapter 20- Ruby and the Web
