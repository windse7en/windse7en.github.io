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

Talk about the CGI: common gateway interface, cookies and sessions, which includes all the lower-level details.  

## Chapter 21- Ruby and Microsoft Windows

Discuss with about the Win32API, win32ole module. to interact with windows, Windows shell.  

# Part Three- Ruby Crystallized

=begin =end is ignored by Ruby and used to comment and docs.

| Type   | Meaning                    |
| ------ | -----------------          |
| %q     | Single-quoted string       |
| %Q, %  | Double-quoted string       |
| %w, %W | Array of strings           |
| %r     | Regular expression pattern |
| %s     | a symbol                   |
| %x     | shell command              |
usually %r for regex %w for string array, %x for command, %q for string for multiple lines.

## Chapter 22- Ruby Language
### Basic Types
numbers, strings, arrays, hashes, ranges, symbols, regex  
Fixnum to Bignum automatically,  
String is different in dilimited and substitution.  
?\C-a #=> “\x01”
?\C-d $=> “\u0004”

Ranges: expr..expr like 1..3, expr...expr will exclude the last element.  

Array: %w only set the words array no substitution, %W will make substitution of individual word.  

Symbol: In some lang is called atoms and the process is called interning.  :”#{a}ello”

Regex: /pattern/options, %r{pattern}options
options can be:
| Options | Meaning                   |
| ---     | ---                       |
| i       | case insensitive          |
| o       | substitute once           |
| m       | match new line            |
| x       | allow spaces and comments |

Variables :
P.320   Pattern Matching Variables, Input/Output Variables, Exexution Environment Variables, 

break, redo and next. 

{}, Proc, lambda {}

## Chapter 23- Duck Typing

An object’s type is determined by what it can do, not by its class!!

names.map { |name| name.upcase}  is equal:  names.map(&:upcase), &:upcase will be changed into to_proc of upcase.  

## Chapter 24- Metaprogramming

Metaprogramming, provide the ability to design a new, domain-specific programming language to solve particular problem.  
P366, A Ruby object has three components:   
1.  A set of flags  
2.  some instance variables  
3.  an associated class  
__self__ refers to the read-only *current object* 
puts 这种方法的调用过程，从self开始，把self作为method receiver，如果没有方法就继续找他的supperclass，直到最后的BasicObject，如果没有就报错。P.367有详细说明了这个过程。  

P.369, 里面讲了怎么给已经有class的ruby object加入他们的method，ruby会让他们继承自一个anonymous class，singleton class，来实现这个方法。  
{% codeblock ruby %}
animal = ‘cat’  
def animal.speak
    puts “The #{self} speaks words”
end
{% endcodeblock %}

In ruby the instance variable is created withe the class, not the instance of the class. So use self.val to access to the variables.  

{% codeblock ruby %}
singleton = class << animal
    def lie
        puts “The #{self} is lying.”
    end
    self
end
puts singleton.instance_methods - ‘animal’.methods
{% endcodeblock %}

在ruby中子类修改父类的私有函数，只需要用public :method_name，ruby会建立个新的同名method然后super调用，返回结果。  
P.376 Ruby中的Modules和Mixins的实现方式就是，用anonymous class的方式来将方法指向module同时super class保持正常，既提供了功能同时，也可以合理的建立super class chain。  
P.378 24.5 Metaprogramming Class-Level Macros，这一块很爽，讲了关于attr_accessor还有has_many的实现技术。  

通过这个方式来创建了add_logging，同时用log方法就可以调用。
{% codeblock ruby %}
class Logger
    def self.add_logging(id_string)
        define_method(:log) do |msg|
            now = Time.now.strftime(“%H:%M:%S”)
            STDERR.puts “#{now}-#{id_string}: #{self} (#{msg})”
        end
    end
end
{% endcodeblock %}

Ruby Struct.new(:name, :address, :likes) 可以新建的class只带有attributes，并且可以被< extend 继承。  
P.384 Class.new的神奇用法,instance_eval 将设置self，直接调用caller的method。9,10小节没有怎么看明白.  


## Chapter 26- locking Ruby in Safe

Ruby中的safe模式，$SAFE里面存着现在的safe等级从0到4，可以用Object#taint，tainted？，trust来判断object的可信度。  

Rails 里面有些ruby没有的内置方法，包括Stirng.to_time, 直接把string转换成时间格式。


