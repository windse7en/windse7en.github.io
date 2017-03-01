---
layout: post
title: "JQuery and AngularJS"
date: 2015-04-20 10:35:49 -0400
comments: true
tags: [js, jquery, angularjs]
---

[jQuery video tutorial](https://www.youtube.com/watch?v=KkzVFB3Ba_o)

Tips:
1.  use $(function(){}); instead of $(document.ready(function({}));  
2.  $(‘.div’).toggle() instead of show(), hide(), .sideToggle(), .fadeToggle(), .delay(). can use numbers for time in ms.  
3.  .on(‘click’, function({})); bind the event to the element.
4.  DOM traverse method in jQuery, .parent(), .children(), .sibling(), .closet(), great method.
5.  AJAX is one of coolest things, use Mustache.js to template the html code for AJAX pending.

<!--more-->
[Angularjs W3C school](http://www.w3schools.com/angular/)

Tips:
1.  ng-app, ng-model, expression the same way as ng-bind, ng-init, set the init value.  
2.  angular object is like JavaScript object. Angular array is like javascript array.  
3.  ng-repeat, repead the html elements  
4.  ng-disabled, use to disable the button or the input filed.  
5.  ng-show, ng-hide to show or hide the element  
6.  ng-click,set the click event to the element, check how many times of clicks.  

BIG PROBLEM:
1.  In slim, if I change the name of the ng-app, it will understand  as string value. But if I leave the name empty, it works fine.  
2.  Set the ng-app name to enable the angular set, or you will get the problem: will be outputed as a string  
