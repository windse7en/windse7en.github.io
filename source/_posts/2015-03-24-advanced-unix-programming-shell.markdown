---
layout: post
title: "Advanced Unix Programming: Shell"
date: 2015-03-24 23:03:19 -0400
comments: true
tags: [unix, shell]
---

Shell tags: [Bourne shell](http://tldp.org/LDP/abs/html/), Korn shell, C shell.
其他和bash的功能差距主要是补充了作业控制，历史记忆机制和命令行编辑。

{% blockquote Herbert Mayer %}
A useful language needs arrays, pointers and a generic mechanism for building data structure.
{% endblockquote %}

<!--more-->

[where not to use shell scripts](http://tldp.org/LDP/abs/html/why-shell.html)  
[shell time related command](http://tldp.org/LDP/abs/html/timedate.html#DATEREF)  
[system administrator commands](http://tldp.org/LDP/abs/html/system.html#WHOREF)  
[帮助我编译手中的程序](http://www.360doc.com/content/11/0623/09/7102324_128871166.shtml)

## 第一章 UNIX基础知识  

第一个ls函数实现，具体讲了整个代码流程。

## 文件描述符
文字描述符是一个小的非负整数，内核用以标识一个特定进程正在存访的文件。当内核打
开一个现存文件或创建一个新文件时，它就返回一个文件描述符。当读、写文件时，就可使
用它。

每当运行一个新程序，打开三个file descriptor: stdin, stdout, stderr

easy_shell.c, 里面是一个简单的shell，读入用户的输入，父进程fork一个进程，进程执行命令，执行完命令回到父进程，父进程判断子进程退出完全。  

function:
fork(), getpid(), getuid(), getgid(), waitpid(pid, &status, 0), signal(SIGNIT, sig_int), fgets(buf, MAXLINE, stdin), execlp(buf, buf, (char pointer) 0);  

Command:
cd /usr/include
time grep something > /dev/null, give the real time, user CPU time, system CPU time.  
user CPU time: 用户指令时间。  
system CPU time：系统内核执行时间。  
time 很方便的可以看到用户指令时间和系统内核调用时间，可以用来对比ruby，python的执行效果，非常容易使用，把输出结果重定位到> /dev/null 这样没有其他杂乱的显示。  

分配内存：用户代码-》malloc库函数-》sbrk系统调用  

## 第一章总结  
第一章里面讲了很多unix的基础知识，用一个很清晰的shell的例子，解释了shell的运行规则，c语言调用的整个程序过程，比较pragmatic的有时间time，进程的fork、wait。  
ANSI C standard, and POSIX standard  1.12  P.1-P.17  

## 第二章 UNIX标准化及实现  

ANSI C, 美国国家标准学会，1990的C标准库==，系统的很多库，标准的库，之前用到的：  
+ signal.h for signal  
+ stdio.h for standard I/O, this is default  
+ stdlib.h for standard public library, a lot of default libarry  
+ unistd.h for unicode standard  

For sys/**.. .h we have:  
+ sys/wait.h for process management  
![standard library table](http://i.snag.gy/oBn5X.jpg)  

IEEE POSIX, 1003下面有至少15个子委员会，1003.2 针对shell和公用程序的标准，1003.7针对系统管理方面的标准。  

基于这三种标准，有SVR4，4.3+BSD的实现。  
![POSIX limit](http://i.snag.gy/H4yea.jpg)

![limit name](http://i.snag.gy/vMBAP.jpg)

![limit ](http://i.snag.gy/ODaZr.jpg)

![limit 2](http://i.snag.gy/znF97.jpg)

![basic system data type](http://i.snag.gy/ioevr.jpg)

## 第二章 总结    
这章主要对比了unix的不同版本的标准化，并提供方法如何去找到限制。2.9 P.18-P.36  

## 第三章 文件 I/O  
open, read, write, lseek, close, atomic 特性，线程安全，不带缓存的系统I/O lseek 记录文件在内核中的位移量。
FILENO from 0 ~ OPEN _ MAX, 0 stdin, 1 stdout, 2 stderr

通过lseek可以创建中间有空洞的文件，file.hole
![buffsize with time](http://i.snag.gy/7LEaV.jpg)
![file description data structure](http://i.snag.gy/qOWsc.jpg)
![open file at the same time](http://i.snag.gy/MzARJ.jpg)
fcntl, function, ioctl function.

## 第三章 总结  
这一章讲了很多文件调用的内容，打开文件的标示，异步、同步、打开文件，buffsize的大小对效率的一影响，原子操作，介绍ioctl和fcntl？，ioctl用于流I/O,fcntl用于记录锁. 3.16, P.37-P.53  

## 第四章 文件和目录  
