---
layout: post
title: "B: Metaprogramming Ruby"
date: 2015-07-27 15:28:22 -0400
comments: true
tags: [ruby, metaprogramming]
---

_Metaprogramming is writing code that writes codes._

Get all mixed modules for an object:
{% codeblock lang:ruby %}
(class << obj; self; end).included_modules>>)
{% endcodeblock %}
在runtime下，取得obj的class，查找所有modules

<!--more-->
_Metaprogramming is writing code that manipulates language constructs at runtime._

# Chapter 1. Monday: The object model

Classes themselves are nothing but objects.

{% codeblock lang:ruby %}
String.class        # => Class
Class.superclass    # => Module
Module.superclass   # => Object
{% endcodeblock %}

User namespace to avoid name clash, Modulename::Classname

obj.instance\_variable\_set(“@x”,10) 设定实例参数。

1. It finds the method. This is a process called method lookup.
2. It executes the method. To do that, Ruby needs something called self.

### Method Lookup
the receiver and the ancestors chain.

### Kernel Method

{% codeblock lang:ruby %}
quire ‘rubygems’
gem ‘rails’ , ‘= 2.3.2’

module Kernel
  def gem(gem_name, \*version\_requirements)
    # ...
{% endcodeblock %}

“If you want to become a master of Ruby,” Bill warns you, “you should always know which object has the role self at any given moment.”

{% img http://snag.gy/8w3Cx.jpg %}
# Chapter 2. Tuesday: Methods

## Dynamic Methods
Where you learn how to call and define methods dynamically and remove the duplicated code.

{% codeblock lang:ruby %}
obj.send(:my\_method, 3) # => 6
{% endcodeblock %}

method\_missing is Kernel#method\_missing() responded to.

{% codeblock lang:ruby %}
class Table
  def method\_missing(id,\*args,&block)
    return as($1.to\_sym,\*args,&block) if id.to_s =~ /^to\_(.\*)/
    return rows\_with($1.to\_sym => args[0]) if id.to\_s =~ /^rows\_with\_(.\*)/
    super
  end
# ...
{% endcodeblock %}
“string”.to\_sym 生成对的symbol，用symbol调用方法。用super调用method\_missing函数

### Dynamic Proxy
DelegateClass( ) is a Mimic Method (241) that creates and returns a new Class. This class defines a method_missing( ) that forwards calls to a wrapped object, such as an Assistant. Manager inherits this method_missing( ), so it becomes a proxy of the wrapped object.

用method\_missing方法实现最好也实现respond\_to这个method, const\_missing可以把missed constant找到方法输出。

下面程序有个bug哦
{% codeblock lang:ruby %}
class Roulette
  def method\_missing(name, \*args)
    person = name.to\_s.capitalize
    3.times do
      number = rand(10) + 1
      puts “#{number}...”
    end
    “#{person} got a #{number}”
  end
end
{% endcodeblock %}
number 的scope

Ruby 里面用来去掉继承来的方法的method：
Module#undef\_method    removes all methods, including the inherited ones.
Module#remove\_method   removes the method from the receiver, but it leaves inherited methods alone.
The Builder library which is an XML generator 就是用了Blank Slate把object的class去掉了。

Ruby 怕方法被override，用reserved method name：\_\_send\_\_() and \_\_id\_\_()

Blank Slate 的样板code：
{% codeblock lang:ruby %}
class Computer
  instance\_methods.each do |m|
    undef\_method m unless m.to\_s =~ /^\_\_|method\_missing|respond\_to?/
  end
  # ...
{% endcodeblock %}

# Chapter 3. Wednesday: Blocks

{% img http://snag.gy/oysCy.jpg %}

{% codeblock lang:ruby %}
return yield if block\_given?
{% endcodeblock %}

Closure, the block is a closure. 看不到在my\_method里面定义的variable x
{% codeblock %}
def my\_method
  x = “Goodbye
  yield(“cruel”)
end

x=”Hello”
my\_method { |y| “#{x} #{y} world”}      # => “Hello cruel world”
{% endcodeblock %}

use _local-variables_ to track the local\_variables

*Whenever the program changes scope, some bindings are replaced by a new set of bindings.*

Scope Gates keywords: class, module, def, end

### Beyond the Scope Gates

Q: Can you think of a method that does the same thing that class does?
A: If you look at Ruby’s documentation, you’ll find the answer: Class.new( ) is a perfect replacement for class. You can also define instance methods in the class if you pass a block to Class.new( ):

{% codeblock %}
my\_var = “Success”
MyClass = Class.new do
  # Now we can print my\_var here...
  puts “#{my\_var} in the class definition!”
  def my\_method
  # ...but how can we print it here?
  end
end
{% endcodeblock %}
这个方法叫做nested lexical scopes，也叫做flattening the scope把两个scopes挤压到一起，简称Flat Scope.

Shared Scopes的例子
{% codeblock %}
def define\_methods
  shared = 0
  Kernel.send :define\_method, :counter do
    shared
  end
  Kernel.send :define\_method, :inc do |x|
    shared += x
  end
end

define\_methods

counter # => 0
inc(4)
counter # => 4
{% endcodeblock %}

### instance\_eval()

用这个方法可以做Context Probe，把变量放入object中
{% codeblock %}
v = 2
obj.instance\_eval { @v = v }
obj.instance\_eval { @v } # => 2
{% endcodeblock %}

这是一种容易打破Encapsulation的方法，用在test中非常有效果

### Callable Objects

Proc lambda 两个block object, method 也是一个call的objetct

{% codeblock %}
inc = Proc.new {|x| x + 1}
inc.call(2)
dec = lambda {|x| x - 1}
dec.class          # => Proc
dec.call(2)        # => 1
{% endcodeblock %}
&block\_name 得到一个Proc对象。
Procs created with lambda( ) are called lambdas, while the others are simply called procs.

The differences between Proc and lambda:
1.  lambda中return返回相关值，Proc的return会直接退出所在的scope。为了避免这个情况，不用return只是写值
2.  当arity，arg的参数数量不一定的时候，如果和block中不一样，lambda会报错，但是Proc会裁剪或者补充nil

基于此，一般选择用lambda {} 更安全。
{% codeblock %}
p = ->(x) { x + 1 }         # 一种替代方法
p = lambda { |x| x + 1 }
{% endcodeblock %}

{% img http://snag.gy/7xT16.jpg %}

*P.121 最后讲的DSL非常清晰的讲了开发过程的几个阶段，多练练*

# Chapter 4. Thursday: Class Definitions

class\_eval(), Module#class\_eval(), add method to class

“I want to open this object, and I don’t particularly care it’s a class,” then instance_eval( ) is fine. If you’re thinking “I want an Open Class (31) here,” then class_eval( ) is almost certainly a better match.

Use instance variable to set the test data.
{% codeblock %}
class FakeTime
  def self.now; ‘Mon Apr 06 12:15:50’ ; end
end

require ‘test/unit’

class TestLoan < Test::Unit::TestCase
  def test_conversion_to_string
    Loan.instance_eval { @time_class = FakeTime }
    loan = Loan.new(‘War and Peace’ )
    assert_equal ‘WAR AND PEACE loaned on Mon Apr 06 12:15:50’ , loan.to_s
  end
end
{% endcodeblock %}

Singleton Methods in Actions:
{% codeblock %}
paragraph = “any string can be a paragraph”
def paragraph.title?
  self.upcase == self
end
index(paragraph)
{% endcodeblock %}
只给一个对象添加方法，同一类的不增加此方法。

### Class Macros:

attr\_accessor 就是一个Class Macros

{% img http://snag.gy/d4d7T.jpg %}

Ruby doesn’t always tell you the whole truth. Instead of the class that you see, an object can have its own special, hidden class. That’s called the eigenclass of the object
对象的固有方法。

增加类方法：
{% codeblock %}
class MyClass
  def self.my\_method; end
end

def MyClass.my\_other\_method; end

# eigenclass method
class MyClass
  class << self
    def my\_method; end
  end
end
{% endcodeblock %}

Object#extend( ) is simply a shortcut that includes a module in the receiver’s eigenclass. You can always do that yourself, if you so choose.

### Aliases
方法别名。
{% codeblock %}
alias :new\_name :old\_name  # alias is a keyword, not a method, that is why no comma.
{% endcodeblock %}

# Chapter 5. Friday: Code That Writes Code

facets is a large collection of useful Ruby snippets.
Kernel#eval, executes the code in the string and returns the result

here documents: << END    END

def self.inherited(subclass) 等类被继承的时候会调用此方法。inherited() is a Hook Method, as we can use it to hook into a particular event.
Module#included() is another Hook Method
Module#extend\_object() Module#method\_added( ), method\_removed( ), or method\_undefined( )

Chapter 5重点看一下，这里面有很好的实现，特别重要！！！

# Chapter 6. Epilogue

一个小故事

# Chapter 7. The Design of Active Record

Decoupling, Simplicity, No Duplication

# Chapter 8. Inside ActiveRecord

dynamic attributes and dynamic finders

Dynamic Attributes: ActiveRecord的源代码很好的解释了怎么用的，在2.3.2版本的ActiveRecord，active\_methods.rb文件，里面关于method\_missing and respond\_to?的重定义，很好的解释了Ghost Method 的用法。

Dynamic Finders: ActiveRecord, base.rb 里面的method missing方法和respond to?方法

There are also techniques and tools that you can leverage to deal with that complexity and to avoid some common metaprogramming pitfalls. Some of these tools, such as unit tests and Monkeypatch guards

# Chapter 9. Metaprogramming Safely

1.  What’s the pitfall of Metapgrogramming?
2.  How to do unit test?

before\_filter method is defined in the ActionPack2.3.2/action\_controller/filers.rb
actionpack-2.3.2/test/controller/filters\_test.rb test case for the filters.

Open Class, Monkeypatches is dangerous:
1.  is global.
2.  invisible, hard to be viewed. (included as a module, can be seen by the ancestors)
3.  override old method implicitly

Rake use method\_defined? to defend the Monkeypatch for override old method.

# Appendix A:

Ruby idioms, Metaprogramming spells:

| Spell                  | Description                            | Example                                       |
| ---                    | ---                                    | ---                                           |
| Argument Arrays        | 一队列参数                             | method(\*args)                                |
| Around Alias           | 方法别名                               | alias :old\_reverse :reverse                  |
| Blank Slate            | 去掉方法定义                           | undef\_method m                               |
| Class Extension Mixin  | module中扩展Hook method                | module M; extent ModuleName                   |
| Class Macro            | 类的方法调用Macro                      | attr\_accessor :age                           |
| Clean Room             | 用一个对象作为环境评价一个block        | CleanRoom.new.instance\_eval { method }       |
| Class Extension        | 混合方法进入eigenclass                 | class << C; include M; end                    |
| Code Processor         | 运行文件里的命令                       | eval ‘file string’                            |
| Context Probe          | 用探针访问私有域                       | obj.instance\_eval { @private\_variable }     |
| Deferred Evaluation    | 调用Proc对象                           | &block; block.call                            |
| Dynamic Dispatch       | 动态调用方法                           | obj.public\_send(:method\_name)               |
| Dynamic Method         | 动态定义方法                           | define\_method :my\_method                    |
| Dynamic Proxy          | 将方法delegate到其他对象               | @target.send(name, \*args, &block)            |
| Flat Scope             | 用block来传值入object                  | obj.instance\_eval { @attr = local\_variable} |
| Ghost Method           | 用method\_missing和respond\_to         | method\_missing, respond\_to                  |
| Hook Method            | 重写方法反应object model events        | def self.inherited(subclass)                  |
| Kernel Method          | 类似全局函数了                         | module Kernel;def a\_method                   |
| Lazy Instance Variable | 直到用的时候才初始化                   | def attribute; @attribute II= ‘value’         |
| Mimic Method           | attribute=() 就是方法，但是用起来mimic | attr\_reader, private                         |
| Monkeypatch            | runtime改变class的features             | class String; def reverse                     |
| Named Arguments        | 函数参数的命名                         | method(args\_hash)                            |
| Namespace              | 避免命名冲突                           | MyNamespace::Array                            |
| Nil Guards             | 用来实例化避免nil                      | @aII= []                                      |
| Object Extension       | 设定唯一方法放到object’s eigenclass中  | class << obj; include M ; end                 |
| Open Class             | rutime修改class                        | class String; def reverse                     |
| Pattern Dispatch       | 根据名字调用方法                       | public\_send                                  |
| Sandbox                | 沙盒安全运行                           | proc { $SAFE = 2}.call                        |
| Scope Gate             | 作用域                                 | class, module, def                            |
| Self Yield             | 把这个对象传给block                    | [‘a’,’b’].shift.tap {}.upcase                 |
| Shared Score           | 测试里面的初始化过程                   | lambda{ shared=10}.call                       |
| Singleton Method       | 给唯一对象的方法                       | class << obj; def method;end; end             |
| String of Code         | 命令放到字符串里                       | eval(‘1+1’)                                   |
| Symbol#to\_proc        | 直接传方法名，当block非常简单的时候    | names.map(%:capitalize)                       |


tap 用来给block传自己的对象，debug 更容易
{% codeblock %}
class Object
  def tap
    yield self
    self
  end
end
{% endcodeblock %}

Symbol#to\_proc
{% codeblock %}
class Symbol
  def to\_proc
    Proc.new {|x| x.send(self) }
  end
end

names.map(&:capitalize.to\_proc) #直接调用Symbol#to\_proc
names.map(&:capitalize)  # 系统简化以后的效果
{% endcodeblock %}


lambda,proc 不同，主要是参数不同以后的反应，还有return效果，一般都用lambda。
Class.ancesters 类的ancestors来看都有哪些modules和class
Instance.methods来看都有哪些方法。
&block, block.call() 还是不一样的。
{% codeblock %}
class CArray < Array
  def c(&block)
    collect! &block  # 等于把block的字符串都考过来collect! { |e| e*2 }
  end
end

class CArray < Array
  def c
    collect! yield  # it’s the same as the block.call
  end
end
{% endcodeblock %}

在源码里面看实现
[下载ruby源码](https://www.ruby-lang.org/en/downloads/)

# Appendix B: DSL
