---
layout: post
title: "User ionic to create ios native app"
date: 2015-06-11 16:00:10 -0400
comments: true
categories: [ios, ionic, cordova, ios-sim]
---

[ionic](http://ionicframework.com/getting-started/)

ionic integrate the nodejs, cordova, ios-sim together.
I tried to install, build and emulate the app from tips on the ionic website. But it doesn’t work.

The problem is ionic can’t launch the app in the simulator.

After trying different solutions, like kill -9 the apple coresimulator process...
I use ios-sim to launch the app project.  
{% codeblock lang:ruby %}
ios-sim launch ./platforms/ios/build/emulator/myApp.app
{% endcodeblock %}

Cool

Let me play in the ionic world.
