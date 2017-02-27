---
layout: post
title: "B: Design Patterns in Ruby"
date: 2015-07-17 15:08:30 -0400
comments: true
tags: [ruby, design pattern, metaprogramming]
---

# Design Patterns in Ruby

GoF(Gang of Four) book: *Design Patterns: Elements of Reusable Object-Oriented Software.*

prefer composition to inheritancy. Internal Domain-Specific Language(DSL), metaprogramming, convention not configuration

怎么用？
How do you add features to your program without turning the whole thing into a huge, unmanageable mess? So far, you have seen how to split the internal workings of your objects up among a family of classes with the Template Method pattern and how to use the Strategy pattern to split off whole chunks of algorithms. You have also seen how to react to requests coming into your objects with the Command pattern and how to keep up with changes made to other objects with the Observer pattern. Composites and iterators each help in their own way in dealing with collections of objects.

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

## Using and Abusing Proxies

As method_missing is slow and obsure for the code.

## Proxies in the Wild

Ruby SOAP, Ruby package method
{% codeblock lang:ruby %}
class MathService
  def add(a, b)
    return a + b
  end
end

require ‘drb/drb’

math_service=MathService.new
DRb.start_service(“druby://localhost:3030”, math_service)
DRb.thread.join
{% endcodeblock %}

client part:
{% codeblock lang:ruby %}
require ‘drb/drb’
DRb.start_service

math_service = DRbObject.new_with_uri(“druby://localhost:3030”)

sum=math_service.add(2,2)
{% endcodeblock %}

## Wrapping Up Pattern

主要解决的三个问题：
1.  保护对象，授权通信  protection proxy
2.  隐藏对象在其他地方  remote proxy
3.  延迟创建复杂对象    virtual proxy

# Chapter 11. Improving your objects with a decorator

Core Chanllenge: add an enhancement to an existing object.

{% codeblock lang:ruby %}
writer = CheckSummingWriter.new(TimeStampingWriter.new(NumberingWriter.new(SimpleWriter.new(‘final.txt’))))
writer.write_line(‘Hello out there’)
{% endcodeblock %}
{% img http://snag.gy/2fCuf.jpg %}

extend Forwardable module for delegating the methods(use extend to add class-level methods)
{% codeblock lang:ruby %}
require ‘forwardable’

class WriterDecorator
  extend Forwardable
  def_delegators :@real_writer, :write_line, :rewind, :pos, :close

  def initialize(real_writer)
    @real_writer = real_writer
  end
end
{% endcodeblock %}

## Using and Abusing the Decorator Pattern

1.  harder to debug, different decorator class,
2.  multiplying the number of objects floating around in your program创建对象太多了。

## Decorators in the Wild

ActiveRecord 中有个alias_method_chain, 可以改变老的方法的名字，和新的进行置换。
链式修改，在所有修改装饰之后才调用开始类的输出。

# Chapter 12. Making sure there is only one with the Singleton

 Core Chanllenge: there are some things that are unique.

 实现Singleton的三种方法：
 1. include singleton module
 2. Global variable and constant technique
 3. class as singleton
 3. Module as singleton

 Singleton: 只有一个、全局可用的实例

@@variable for the class cariable. Java中是static

def self.method for the class method.

Ruby里面Singleton的使用过程，include之后，直接用SimpleLogger.instance得到唯一值
{% codeblock lang:ruby %}
require ‘singleton’

class SimpleLogger
  include Singleton
  # Lots of code deleted...
end
{% endcodeblock %}

## Using and Abusing the Singleton Pattern
1.  How many of the singletons needed?
2.  Singletons on a need-to-know basis
3.  Cure the Testing Blues. As singleton called by multiple class, there will be a lot independence.

## Singletons in the Wild

rake, Inflections(单复数的), are singletons

# Chapter 13. Picking the Right Class with a Factory

Core Challenge: How to pick the right class for the circumstance?

{% img http://snag.gy/vuATB.jpg %}

It just likes the templete pattern, share a common type. Because they implement a common set of methods.

## Parameterize Factory Methods

Give many parameters to the factory methods, use case switch to define which class to call.

Pond Example:
{% codeblock lang:ruby %}
class Pond
  def initialize(number_animals, animal_class, number_plants, plant_class)
    @animal_class = animal_class
    @plant_class = plant_class
    @animals = []
    number_animals.times do |i|
      animal = new_organism(:animal, “Animal#{i}”)
      @animals << animal
    end
    @plants = []
    number_plants.times do |i|
      plant = new_organism(:plant, “Plant#{i}”)
      @plants << plant
    end
  end

  def simulate_one_day
    @plants.each {|plant| plant.grow}
    @animals.each {|animal| animal.speak}
    @animals.each {|animal| animal.eat}
    @animals.each {|animal| animal.sleep}
  end

  def new_organism(type, name)
    if type == :animal
      @animal_class.new(name)
    elsif type == :plant
      @plant_class.new(name)
    else
      raise “Unknown organism type: #{type}”
    end
  end
end
{% endcodeblock %}

An object dedicated to creating a compatible set of objects is called an abstract factory.
一个用来创建一堆对象的对象:Abstract Factory

{% codeblock lang:ruby %}.
class PondOrganismFactory
  def new_animal(name)
    Frog.new(name)
  end
  def new_plant(name)
    Algae.new(name)
  end
end

class JungleOrganismFactory
  def new_animal(name)
    Tiger.new(name)
  end
  def new_plant(name)
    Tree.new(name)
  end
end

class Habitat

  def initialize(number_animals, number_plants, organism_factory)
  @organism_factory = organism_factory
  @animals = []
  number_animals.times do |i|
    animal = @organism_factory.new_animal(“Animal#{i}”)
    @animals << animal
  end
  @plants = []
  number_plants.times do |i|
    plant = @organism_factory.new_plant(“Plant#{i}”)
    @plants << plant
  end
end
{% endcodeblock %}

{% img http://snag.gy/BXYm8.jpg %}

In the same way that the Factory Method pattern is really the Template Method pattern applied to object creation, so the Abstract Factory pattern is simply the Strategy pattern applied to the same problem.

## Using and Abusing the Factory Patterns

Balance the cost of the additional.

## Factory Patterns in the Wild

ActiveRecord::Base use Factory Pattern to map the database connection.

# Chapter 14. Easier Object Construction with the Builder

Core Chanllenge: a pattern designed to help you configure those complex objects.

{% img http://snag.gy/qis6x.jpg %}

## Polymorphic Builders
Builder 更关注怎么configure object而不是pick right class。
{% img http://snag.gy/il4mO.jpg %}

通过method_missing方法，支持，例如add_trubo_adn_dvd_and_harddisk这样的方法
{% codeblock lang:ruby %}
def method_missing(name, *args)
  words = name.to_s.split(“_”)
  return super(name, *args) unless words.shift == ‘add’
  words.each do |word|
    next if word == ‘and’
    add_cd if word == ‘cd’
    add_dvd if word == ‘dvd’
    add_hard_disk(100000) if word == ‘harddisk’
    turbo if word == ‘turbo’
  end
end
{% endcodeblock %}

## Using and Abusing the Builder Pattern
不太复杂的事情结果用Builder造成complex。

## Builders in the Wild
MailFactory in ruby, config the mail and send it.

# Chapter 15. Assembling your system with the interpreter
Core Chanllenge: need an interpreter for a domain problem.

What kind of problems are good candidates for the Interpreter pattern? As a general rule, problems well suited to the Interpreter pattern tend to be selfcontained, with crisp boundaries around them. For example, if you are writing code that searches for specific objects based on some specification, you might consider creating a query language.1 Conversely, if you are faced with the task of creating complex object configurations, you might think about building a configuration language. Another clue that your problem might be right for the Interpreter pattern is that you find yourself creating lots of discrete chunks of code, chunks that seem easy enough to write in themselves
什么问题需要Interpreter Pattern呢？
1.  当这个问题可以被更小的边界包含的时候，例如需要对特殊对象的查询，query language，需要复杂配置，configuration language。
2.  另一个是，你发现有很多离散的可重复代码块。

## Building an Interpreter
{% img http://snag.gy/7jOFa.jpg %}
1.  AST: abstract syntax tree.

If the language is fairly complex and neither XML nor YAML seems appropriate, using a parser generator Racc.

## Using and Abusing the interpreter Pattern
1.  The complexity issure, how complex your language will be.
2.  Program efficiency. good choice for 80% code that really is performance insensitive.

## Interpreters in the wild
Regular Expression for string matching.

Runt: expressing things like date and time ranges and schedules.

# Chapter 16. Opening Up Your System with Domain-Specific Languages
Core Chanllenge: provider the language that used by the users.

## Using and Abusing the DSL

1.  error message is unfriendly.
2.  If security is an issue, stay away from internal DSLs.

## Internal DSLs in the Wild

rake, task based on tasks.

# Chapter 17. Creating Custom Objects with Meta-programming
Core Chanllenge: Change the functionality in the runtime.

Use extend for the object insludes some module.对象mix Module用extend，class包含module用include。

The subclasses of Base do not automatically inherit any Composite pattern behavior. Instead, they inherit the member_of and composite_of class method to add the composite methods to the subclass.

## Using and Abusing Meta-programming

Meta-programming: writing programs that augment or change themseleves as they run.
The key danger is the unexpected interaction between features.

## Meta-programming in the Wild

attr_reader, attr_writer, attr_accessor. The three are meta-programming. like:

{% codeblock lang:ruby %}
class Object
  def self.readable_attribute(name)
    code = %Q{
      def #{name}
        @#{name}
      end
    }
    class_eval(code)
  end

end

class BankAccount
  readable_attribute :balance
  def initialize(balance)
    @balance = balance
  end
end
{% endcodeblock %}

Forwardable module to delegae the methods.

# Chapter 18. Convention Over Configuration
Core Chanllenge: How to make software systems extensible via configuration.

1.  Convention focuses to making it wasy to add adapters.
2.  Some constraints on the adapter.

## Using and Abusing the Convention Over Configuration Pattern
1.  The convention might be incomplete.
2.  hard to write and no documentation for the operational road map.

# Chapter 19. Conclusion
