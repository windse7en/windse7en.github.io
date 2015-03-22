---
layout: post
title: "VIM plugin bug adventure '%' sign"
date: 2015-03-19 13:57:50 -0400
comments: true
categories: [vim, vimrc]
---

Today, I tried to use % to jump between (), use %x``x to delte a pair of () in the markdown file. But I found the situation is :

1.  The first time of % , work. But the trials after that, doesn't work.   
2.  It's only appearing the editing with the MARKDOWN file no matter where the location is.

<!--more-->

Steps to figure out problem:   
1.  open ~/.vimrc check func   
2.  open file in other location to test   
3.  use the command:   
``` ruby trouble shooting in vim http://vim.wikia.com/wiki/Troubleshooting
vim -N -u NONE -i NONE
```
Open the file in -u(None vimrc file), -i(None viminfo file), -N(nocompatable) mode to track the problem appears or not.
4.  use map, and nmap to check out % has been remapped to the 
``` ruby % remap to
n  %           * :<C-U>call <SNR>19_Match_wrapper('',1,'n') <CR> 
```
5.  No any map record in the -u mode of vim

I just leave the bug there, as it works fine for other files.
