---
layout: post
title: "Practical Obect Oriented Design in Ruby"
date: 2015-07-16 11:54:10 -0400
comments: true
categories: [ruby, ood]
---

# Practical Object-Oriented Design in Ruby

Responsibilities, dependencies, interfaces, ducks, inheritance, behavior sharing, composition, and testing

Persist. Practice. Experiment. Imagine. Do your best work, and all else will follow.

| Question                      | Information                                                                       |
| ---                           | ---                                                                               |
| Inject Dependency             | 为了single responsbility， 怎么做ID来减少依赖                                     |
| Direct of Dependency          | 当不能见到dependency的时候依赖该怎么设计，改变可能性和类的耦合性                  |
| Interface Design              | public的interface的设计过程，需要对messages的理解                                 |
| Duck Type                     | 选好duck type                                                                     |
| Inheritance                   | 继承要很好的Abstract和message的理解，继承实际上就是把父类message delegate到子类去 |
| hook methods                  | 解耦合的很好的办法,initialize()和post_initialize()的关系,post_initialize就是hook  |
| Liskov Substitution Principle | 父类能做的，子类都能做，一个role的内容，include的class都能做                      |

OOD problem:
1.  Without design pattern.
2.  With a little knowledge of design pattern, overdesign. “ No, I can’t add that feature; it wasn’t designed to do that.”
3.  Without the act of programming. Design pattern is relying on the feedback loop.

SOLID: 
Single Responsibility( Transparent, Reasonable, Usable and Exemplary), reuse and maintain.
If you rephrase every
one of its methods as a question, asking the question ought to make sense. For example,
“Please Mr. Gear, what is your ratio?” If the simplest description you can devise uses the
word “and,” the class likely has more than one responsibility. If it uses the word “or,”
then the class has more than one responsibility and they aren’t even very related.
OO designers use the word cohesion to describe this concept. When everything in a
37
class is related to its central purpose, the class is said to be highly cohesive or to have a
single responsibility.P.37

Do not feel compelled to make design decisions prematurely. What is the future cost of doing nothing today?” 

Always wrap instance variables in accessor methods instead of directly referring to variables. In a method use variable instead of @variable. As in the future, variable may be overrided a new function.

P41

Struct as “a convenient way to bundle a number of attributes together, using accessor
methods, without having to write an explicit class.” This is exactly what wheelify
does; it creates little lightweight objects that respond to rim and tire.   

Separating iteration from the action that’s being performed on each element is a common case of multiple responsibility that is easy to recognize.

# Chapter 3. Managing Dependencies

An object has a dependency when it knows
• The name of another class. Gear expects a class named Wheel to exist.
• The name of a message that it intends to send to someone other than self.
Gear expects a Wheel instance to respond to diameter.
• The arguments that a message requires. Gear knows that Wheel.new requires
a rim and a tire.
• The order of those arguments. Gear knows the first argument to Wheel.new
should be rim, the second, tire.

One especially destructive kind of dependency occurs where an object knows another who knows another who knows something; that is, where many messages are chained together to reach behavior that lives in a distant object.

The code above exposes an unjustified attachment to static types. dependency injection P.54

Dependencies are foreign invaders that represent vulnerabilities, and they should be concise, explicit, and isolated.

This new method lazily creates a new instance of Wheel, using Ruby’s
||= operator. In this case, creation of a new instance of Wheel is deferred until gear_inches invokes the new wheel method. P.55

Remove Argument-Order Dependencies

When the code in line 11 changed to use a hash, it lost its ependency on argument order but it gained a dependency on the names of the keys in the argument hash. This change is healthy. The new dependency is more stable than the old, and thus this code faces less risk of being forced to change.

In the example below, line 3 uses fetch to set @chainring to the default, 40, only if the :chainring key is not in the args hash. Setting the defaults in this way means that callers can actually cause @chainring to get set to false or nil, something that is not possible when using the || technique. P.61 use merge to merge the array list.
3 ways:
1.  ||
2.  Hash.fetch
3.  Hash.merge

The above technique for substituting an options hash for a list of fixed-order arguments is perfect for cases where you are forced to depend on external interfaces that P.62 you cannot change.

### Reversing Dependencies
改变dependency的方向：
Page 62 give an example on dependencie directions.

### Choosing Dependency Directions

1.  Some classes are more likely than others to have changes in requirements.
2.  Concrete classes are more likely to change than abstract classes.
3.  Changing a class that has many dependents will result in widespread consequences

| Class Type           | Likelihood of Change                       |
| ---                  | ---                                        |
| Ruby base classes    | not changed                                |
| framework classes    | may rapid or none based on the development |
| Abstractions classes | less change                                |
| Concretion classes   | more change                                |

In statically typed languages defining an interface is always intentional. But as Duck type, it’s just message in Ruby.

{% img left http://snag.gy/z0WaJ.jpg %}
Zone A contain abstract classes or interfaces, suggested.
Zone C prefer the concrete classes, as few classes depend on them.
Zone B is fine always.
Zone D is Danger Zone, delete them.

## Summary
Dependency management is core to creating future-proof applications. Injecting dependencies creates loosely coupled objects that can be reused in novel ways.
Isolating dependencies allows objects to quickly adapt to unexpected changes. Depending on abstractions decreases the likelihood of facing these changes.
The key to managing dependencies is to control their direction. The road to maintenance nirvana is paved with classes that depend on things that change less often than they do.

# Chapter 4. Creating Flexible Interfaces
The remainder of this chapter will address the first kind of interface, that is, methods within a class and how and what to expose to others.

Public:
• Reveal its primary responsibility
• Are expected to be invoked by others
• Will not change on a whim
• Are safe for others to depend on
• Are thoroughly documented in the tests

Private:
• Handle implementation details
• Are not expected to be sent by other objects
• Can change for any reason whatsoever
• Are unsafe for others to depend on
• May not even be referenced in the tests

Nouns is for domain objects.
Messages need to be considered much more.

Using sequence diagrams, from P. 72 it explains about the sequence diagrams design.

When the conversation between Trip and Mechanic switched from a how to a what, one side effect was that the size of the public interface in Mechanic was drastically reduced.
P.80 很好的解释了Trip的各种关系。Mechanic需要prepare_trip, prepare_bicycle接口，Trip需要bicycles接口

If objects were human and could describe their own relationships, in Figure 4.5 Trip would be telling Mechanic: “I know what I want and I know how you do it;” in Figure 4.6: “I know what I want and I know what you do” and in Figure 4.7: “I know what I want and I trust you to do your part.” This blind trust is a keystone of object-oriented design. It allows objects to collaborate without binding themselves to context and is necessary in any application that expects to grow and change.

## Law of Demeter

One common way to remove “train wrecks” from code is to use delegation to avoid the “dots.” In object-oriented terms, to delegate a message is to pass it on to another object, often via a wrapper method.

Focusing on messages reveals objects that might otherwise be overlooked. When messages are trusting and ask for what the sender wants instead of telling the receiver how to behave, objects naturally evolve public interfaces that are flexible and reusable in novel and unexpected ways.

# Chapter 5. Reducing Costs with Duck Typing

{% codeblock lang:ruby %}
class Trip
  attr_reader :bicycles, :customers, :vehicle

  def prepare(preparers)
    preparers.each {|preparer|
      case preparer
      when Mechanic
        preparer.prepare_bicycles(bicycles)
      when TripCoordinator
        preparer.buy_food(customers)
      when Driver
        preparer.gas_up(vehicle)
        preparer.fill_water_tank(vehicle)
      end
    }
  end
end
{% endcodeblock %}
这种设计会导致很多dependency，因为都要知道相应的class name。用duck type的新设计。
{% codeblock lang:ruby %}
class Trip
  attr_reader :bicycles, :customers, :vehicle

  def prepare(preparers)
    preparers.each {|preparer| preparer.prepare_trip(self)}
  end
end

class Mechanic
  def prepare_trip(trip)
    trip.bicycles.each {|bicycle| prepare_bicycle(bicycle)}
  end
end
{% endcodeblock %}

There are a number of ways to achieve polymorphism; duck typing, as you have surely guessed, is one. Inheritance and behavior sharing (via Ruby modules) are others, but those are topics for the next chapters.

You can replace the following with ducks:
• Case statements that switch on class
• kind_of? and is_a?
• responds_to?

“I know who you are and because of that I know what you do.” This knowledge exposes a lack of trust in collaborating objects and acts as a millstone around your object’s neck. It introduces dependencies that make code difficult to change.

1.  Place trust in your ducks
2.  Documenting Duck Type by test
3.  Sharing code between ducks
4.  Choosing your ducks wisely 选好duck type，有时候依赖的是stable的class，例如core class，就可以不考虑duck type 他

# Chapter 6. Acquiring Behavior Through inheritance

The idea of inheritance may seem complicated but as with all complexity, there’s a simplifying abstraction. Inheritance is, at its core, a mechanism for automatic message delegation.

继承也不是随便用的，Abstraction才是父类，Template Method Pattern也要用好，注意default value和抛出异常的情况。

{% codeblock lang:ruby %}
class Bicycle

  def spares
    { tire_size: tire_size, chain: chain}.merge(local_spares)
  end


  def local_spares
    {}
  end

end

class RoadBike < Bicycle

  def local_spares
    {tape_color: tape_color}
  end

end
{% endcodeblock %}
这种方法decouple了subclass实现，同时也调用了父类的实现。
Well-designed inheritance hierarchies are easy to extend with new subclasses, even for programmers who know very little about the application. This ease of extension is inheritance’s greatest strength. When your problem is one of needing numerous specializations of a stable, common abstraction, inheritance can be an extremely lowcost solution.

# Chapter 7. Sharing Role Behavior with Modules
Modules is also a kind of implementation of inheritance.

This chapter explores an alternative that uses the techniques of inheritance to share a role. It begins with an example that uses a Ruby module to define a common role and then proceeds to give practical advice about how to write all inheritable code.

{% img http://snag.gy/NgGea.jpg %}
Schedule is a role, schedulable? is the message. It should be in the targets.

{% codeblock lang:ruby %}
module Schedulable
  attr_writer :schedule

  def schedule
    @schedule ||= ::Schedule.new
  end

  def schedulable?(start_date, end_date)
    !scheduled?(start_date - lead_days, end_date)
  end

  def scheduled?(start_date, end_date)
    schedule.scheduled?(self, start_date, end_date)
  end

  # includers may override
  def lead_days
    0
  end

end
{% endcodeblock %}

If a module sends a message it must provide an implementation, even if that implementation merely raises an error indicating that users of the module must implement the method.

This chapter has been careful to maintain a distinction between classical inheritance and sharing code via modules. This is-a versus behaves-like-a difference definitely matters, each choice has distinct consequences. However, the coding techniques for these two things are very similar and this similarity exists because both techniques rely on automatic message delegation.

{% img http://snag.gy/23FVA.jpg %}

Liskov Substitution Principle (LSP) When you honor the contract, you are following the Liskov Substitution Principle, which is named for its creator, Barbara Liskov, and supplies the “L” in the SOLID design principles.

Following this principle creates applications where a subclass can be used anywhere its superclass would do, and where objects that include modules can be trusted to interchangeably play the module’s role.

Try to shallow the inheritance, don’t make to deep. 否则hook methods会很难找，而且程序员比较熟悉top和bottom的class，对于中间的很不熟悉。
{% img http://snag.gy/kxeDN.jpg %}

Modules, therefore, should use the template method pattern to invite those that include them to supply specializations, and should implement hook methods to avoid forcing includers to send super (and thus know the algorithm).

# Chapter 8. Combining Objects with Composition

Composition 关系图
{% img http://snag.gy/a1dyM.jpg %}

Bicycle, parts, partsfactory, and part(open struct).

## Deciding Between Inheritance and Composition

Benefits of Inheritance
Cost of Inheritance

Benefits of Composition: composition results in applications built of simple, pluggable objects that are easy to extend and change.
Cost of Composition: not obvious of the combined operation.

| Relationship     | Description   |
| ---              | --            |
| Inheritance      | is-a          |
| module duck type | behave like a |
| Composition      | has-a         |

# Chapter 9. Designing Cost-Effective Tests

Refactoring is the process of changing a software system in such a way that it does not alter the external behavior of the code yet improves the internal structure.

Finally, the art of writing changeable code requires the ability to write high-value tests. Tests give you confidence to refactor constantly. Efficient tests prove that altered code continues to behave correctly without raising overall costs.

{% img http://snag.gy/vCgRE.jpg %}

这里面有很好的关于wheel，gear的测试设计。单元测试，Mock, write the test module for sharing functionality.
