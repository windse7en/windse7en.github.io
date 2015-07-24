---
layout: post
title: "Book: Design Patterns in Ruby"
date: 2015-07-17 15:08:30 -0400
comments: true
categories: [ruby, design pattern]
---

# Design Patterns in Ruby

GoF(Gang of Four) book: *Design Patterns: Elements of Reusable Object-Oriented Software.*

prefer composition to inheritancy. Internal Domain-Specific Language(DSL), metaprogramming, convention not configuration

14 Design Patterns:

1.  Template Method:      Every pattern has a problem that it is trying to solve. For example, perhaps your code always wants to do exactly the same thing, except at step 44. Sometimes step 44 wants to do this, and sometimes it wants to do that. Perhaps you need a Template Method.
2.  Strategy object:      Maybe it is not step 44 that wants to vary but the whole algorithm. You have a well-defined job, something that needs to get done, but there are a lot of ways to do it. You might need to remove the outer covering from a feline creature, and there is more than one technique you might employ. You might want to wrap those techniques—those algorithms—in a Strategy object.
3.  Observer Pattern:     What if you have a class A, which needs to know what is happening over there in class B? But you don’t want to couple the two classes together because you never know when class C (or even class D!) might come along. You might want to consider using the Observer pattern.
4.  Composition Pattern:  Sometimes you need to treat a collection of objects just like a single object—I can delete or copy or move an individual file, but I can also delete or copy or move a whole directory of files. If you need to build a collection of objects that looks just like one of the individual objects, you probably need the Composite pattern.
5.  Iterator Pattern:     Now suppose you are writing some code that hides a collection of objects, but you don’t want the collection hidden too well:                                                                                                                                                                                                                                                             You would like your client to be able to access the objects in your collection in sequence without knowing how or where you have stored those objects. You definitely need the Iterator pattern.
6.  Command Pattern:      Sometimes we need to wrap instructions in a kind of a postcard:                                                                                                                                                                                                                                                                                                                          Dear database, when you get this, delete row number 7843. Postcards are hard to come by in code, but the Command pattern is tailor made for this situation.
7.  Adapter:              What do you do when an object does what you need it to do, but its interface is wrong? Your interface mismatch might be very deep and complex, or it might be as simple as needing an object that can write but having an object that calls it save. The GoF would recommend an Adapter to you.
8.  Proxy:                Maybe you have the right object, but it is over there, someplace else on the network, and you don’t want the client code to care about its location. Or perhaps you want to delay creating your object as long as possible, or control access to it. In this circumstance, you may need a Proxy.
9.  Decorator:            Sometimes you need to add responsibilities to your objects on the fly, at runtime. If you have a need for objects that implement some core capabilities but must sometimes take on additional responsibilities, perhaps you need the Decorator pattern.
10. Singleton:            Perhaps you have an instance of a class, and it needs to be the only instance of that class—that is, the single instance that everybody uses. Sounds like you have a Singleton.
11. Factory Method:       Now suppose you are writing a base class, one that is meant to be extended. As you are happily coding away at your base class, you realize that it needs to produce a new object and only the subclass will know exactly which kind of object to produce. You may need a Factory Method here.
12. Abstract Factory:     How do you create families of compatible objects? Suppose you have a system that models various types of cars, but not all engines are compatible with all fuel or cooling systems. How do you ensure that you don’t end up with the automotive equivalent of Frankenstein’s monster? You might build a class devoted to creating all of those objects and call it an Abstract Factory.
13. Builder:              Perhaps you are building an object so complex that its construction requires a significant bit of code. Even worse, the process of construction needs to vary according to the circumstances. Perhaps you need the Builder pattern?
14. Interpreter:          Ever have the feeling that you are using the wrong programming language to solve your problem? As crazy as it sounds, perhaps you should stop trying to solve your problem directly and build an Interpreter for a language that solves your problem more easily.

# Chapter 3. Verying the Algorithm with the Template Method

Thought: Separate the things that stay the same.

Template Method Patterm Example, hook methods:
{% img http://snag.gy/vkB9S.jpg %}

## Templates in the Wild
WEBrick, 跑一个httpserver用到了Template，可以overrite run method。

# Chapter 4. Replacing the Algorithm with the Strategy

加入了Strategy对象来描述
{% img http://snag.gy/fkwNm.jpg %}

Strategy 就指得是一些知道how to do something的executable code。就像Proc(&proc_variable)
就像sort的使用就用的是Strategy Pattern，穿进去Proc知道怎么排序

Ruby rdoc 用的就是Strategy Pattern
{% img http://snag.gy/PXBE1.jpg %}

## Strategy in the Wild
Ruby 中rdoc用Strategy Pattern来定义显示format

# Chapter 5. Keeping up with the Times with the Observer

Core Challenge: building a system that is highly integrated that a system where every part is aware of the sate of the whole.
P.104 Explain the observer module

{% img http://snag.gy/Qtwd2.jpg %}

## Observer in the Wild
ActiveRecord::Observer中用Observer来观察database records，created，read，written and deleted。

# Chapter 6. Assembling the Whole from the Parts with the Composite

Core Challenge: build up bigger objects from small sub-objects, which might themseleve be made up of still smaller sub-sub-objects.

{% img http://snag.gy/ybQ34.jpg %}

## Sprucing Up the Composite with Operators
It turns out that we can get this done by simply renaming the add_sub_task method:
{% codeblock lang:ruby %}
composite = CompositeTask.new(‘example’)
composite << MixTask.new
def <<(task)
  @sub_tasks << task
end

def [](index)
  @sub_tasks[index]
end

def []=(index, new_value)
  @sub_tasks[index] = new_value
end
{% endcodeblock %}

## An Inconvenient Difference
How to handle the difference between the leaf and the composite:
1.  leaf和composite不一样，addChild，deleteChild这样的方法leaf没有
2.  leaf也加入这两种方法，但是如果被调用了怎么响应是个问题，ignore，exception，还是怎么样？

最容易犯的问题：
Mistake：容易把Composite当成one level deeper，但实际上，composite是multiple levels的。

## Composites in the Wild

在Ruby中，GUI libraries就是基于Composite Pattern实现的。

# Chapter 7. Reaching into a Collection with the Iterator
Core Challenge: allows an aggregate object to provide the outsite wolrd with a way to access its collection of subobjects.

## External Iterators
Java’s iterator is external iterator, ‘external’- a separate object from the aggregate

## Internal Iterators
Ruby’s iterator, inside the aggregate object, the code block-based iterators.

## The Inimitable Enumerable
要实现iterator在ruby中，一般就include Enumerable方法，有了，覆盖each和<=>方法。
包括方法：all?, any?, include? ...

## Using and Abusing the Iterator Pattern
Mistake: What happens if the aggregate object changes while you are iterating through it?

## Iterators in the Wild
Ruby的各种each method

IO object，File.open(), Pathname.new，都是很好的iterator

ObjectSpace module each_object 显示interpreter中的所有object。
{% codeblock lang:ruby %}
ObjectSpace.each_object { |o| puts “Object: #{o}” }
{% endcodeblock %}

# Chapter 8. Getting Things Done with Commands
Core Challenge: an instruction to do something, something specific when something happens.

{% img http://snag.gy/RNTAs.jpg %}

## Using and Abusing the Command Pattern
The key thing about the Command pattern is that it separates the thought from the deed. When you use this pattern, you are no longer simply saying, “Do this”; instead, you are saying, “Remember how to do this,” and, sometime later, “Do that thing that I told you to remember.”
用的太频繁，本来很简单的内容用pattern去实现了。

## The Command Pattern in the Wild
ActiveRecord Migrations, up, down, change, Madeleine

# Chapter 9. Filling in the Gaps with the Adapter
Core Chanllenge: bridge the gap between mismatching software interfaces. Ruby 运行时修改类和对象来创建adapter。

Adapter就是用来帮你给你要用的和你有的interface搭桥的。
{% img http://snag.gy/uSoFP.jpg %}

Ruby中可以对实例添加方法的实例：
{% img http://snag.gy/oCtix.jpg %}

{% codeblock lang:ruby %}
bto = BritishTextObject.new(‘hello’, 50.8, :blue)
class << bto
  def color
    colour
  end
  def text
    string
  end
  def size_inches
    return size_mm/25.4
  end
end

def bto.color
  colour
end
def bto.text
  string
end
{% endcodeblock %}

## Using and Abusing the Adapter Pattern
It’s hard to call a method client decided but you didn’t think you needed.我很奇怪这个问题在哪里。

## Adapters in the Wild
ActiveRecord, AbstractAdapter 用来解决数据库的adapter的问题。

# Chapter 10. Getting in Front of Your Object with a Proxy
Core Chanllenge: controll access to an object or providing a location-independent way of getting at the object or delaying its creations.

{% img http://snag.gy/DvfH4.jpg %}

Protection proxy 可以把check安全性的和功能性的放到一个class里面，这样以后容易修改。

RPC system soap/wsdl get weather information.

## Message passing
method_missing(:symbol__name, \*args), 方法名和参数




