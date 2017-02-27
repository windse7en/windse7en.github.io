---
layout: post
title: "Python manipulate Mouse and Keyboard crossplatform"
date: 2015-03-18 21:05:58 -0400
comments: true
tags: [python, mouse]
---
Today, my workmate tried to use MFC win32 in C++ language to manipulate the mouse in windows. But, you know, the C++ language is a very old old friend to me. For me, it's very hard to understand the C++ program in a short time. In contrast to C++,
Python is much more friendly and directly. So I have a question, how to use python to manipulate the mouse and keyboard?

<!--more-->

NOW, the solution is [PyUserInput](https://github.com/SavinaRoja/PyUserInput).

PyUserInput combines pymouse and pykeyboard. For windows, it originally used the pywin32 module.

In the guidleline of PyUserInput on Github, there are crossplatform dependences for install PyUserInput.

Some tips for installing windows dependences: [pywin32](https://pypi.python.org/pypi/pywin32), [pyHook](http://www.lfd.uci.edu/~gohlke/pythonlibs/#pip)
pywin32 provides 32-bit and 64-bit. python 2.7 version. But pyHook in sourceforge.com only provides the 32-bit version. We can download the 64-bit wheels file from the link above and use pip install to install the wheels file.

install Xlib in Linux:
``` ruby install xlib
sudo pip install svn+https://svn.code.sf.net/p/python-xlib/code/trunk/
```
After create the first project, it alerts me to install [service_identity module](https://pypi.python.org/pypi/service_identity)


