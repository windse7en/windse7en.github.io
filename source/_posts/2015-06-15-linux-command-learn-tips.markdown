---
layout: post
title: "linux command learn tips"
date: 2015-06-15 15:31:22 -0400
comments: true
categories: [linux, shell]
---

[awk](http://www.techug.com/awk)强大的文件操作，从Alfred Aho，Peter Weinberger and Brain Kernighan
找出非系统产生的账号：  
{% codeblock %}
awk -F “:” ‘($3 >= 1000) { printf $1 “\n”}’ /etc/passwd
awk Pattern {ACTIONS;}
{% endcodeblock %}
awk中仅有string和numeric，可以互相转换。
文件中每一行check每一种pattern（Regex，Boolean，Special）,In Boolean Search,进行fuzzy matching，” 23”==23  


ack, awk, grep

[git 25 tips useful But a little long](http://www.techug.com/25-git-tips)

查看当前服务器的运行级别。  
{% codeblock %}
runlevel
who -r
{% endcodeblock %}

找到/usr下面大于10M的文件，找到120天之前被修改过的文件. 找出90天内未被访问过的文件。 
{% codeblock %}
find /usr -size +10M

find /home -mtime +120

find /home \! -atime -90
{% endcodeblock %}

alias 设置别名，方便以后使用。  
{% codeblock %}
alias ls=ls -al
{% endcodeblock %}

工作流程控制的几个命令：  
{% codeblock %}
jobs [-lp] [job]
bg [job]
fg [job]
kill [-signal] job..
wait [job..]

%number: refer to job by number
%string: job whose name begins with string
%?string: job whose name contains string
%+ or %%: current job
%-: previous job

bg      show all jobs in the backend
fg %2   put the 2 in the front
jobs    show all jobs
{% endcodeblock %}

| ENV NAME  | MEANING                                   |
| --------  | -------                                   |
| $HISTCMD  | the history number of the current command |
| $HISTSIZE | number of remembered commands             |
| $HOME     | login directory                           |
| $MAIL     | absolute path of mailbox                  |
| $OLDPWD   | absolute path of previous directory       |
| $PATH     | command search path                       |
| $PPID     | process ID of parent                      |
| $PS1      | primary prompt 1                          |
| $RANDOM   | generate random number                    |
| $SECONDS  | number of seconds since shell started     |
| $SHELL    | absolute path of shell                    |
| $UID      | user ID of the current user               |
| $$        | process ID of current shell               |
| $?        | exit status of most recent statement      |
| $#        | number of the argruments                  |
| $x        | all the arguments                         |
| $!        | PID of the moust recent background job    |

shell if 语句，testing[]里面是判断，-a是and，-o是or，-e是equal，-z是zero，-n不是zero
{% codeblock %}
if [ $DEBUG -eq 1]; then
elif [ -f /etc/passwd ]; then
else
fi
{% endcodeblock %}
