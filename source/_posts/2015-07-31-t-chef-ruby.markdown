---
layout: post
title: "T: Chef Ruby"
date: 2015-07-31 09:39:50 -0400
comments: true
categories: [chef, ruby, infrastructure]
---

[chef component](http://docs.chef.io/client/_images/chef_overview.pl()ng)

[介绍主页](http://docs.chef.io/client/install_workstation.htmll)

[下载ubuntu chef](http://downloads.chef.io/chef-dk/ubuntu/#/)

## 1.  Install chef-db

{% codeblock %}
sudo dpkg -i chefdk\_0.6.2-1\_amd64.deb
{% endcodeblock %}

ChefDK contains:
1.  An early version of a brand new command-line tool, chef, that aims to streamline Chef workflow, starting with new generators.
2.  The well-known cookbook dependency manager Berkshelf 3.0.
3.  The Test Kitchen integration testing framework.
4.  ChefSpec, which makes unit testing cookbooks a breeze.
5.  Foodcritic, a linting tool for doing static code analysis on cookbooks.
6.  All of the Chef tools you’re already familiar with: Chef Client, Knife, Ohai and Chef Zero.

chefdb’s file structure after installation
{% img http://snag.gy/dEhVS.jpg %}

### Verification
After installation, verify all the component:

{% codeblock %}
chef verify
{% endcodeblock %}

| Componnet            | Description      |
| ---                  | ---              |
| berkshelf            | 管理cookbook     |
| test-kitchen         | 测试cookbook框架 |
| chef-client          |                  |
| chef-dk              | Chef开发kit      |
| chefspec             |                  |
| rubocop              |                  |
| fauxhai              |                  |
| knife-spork          |                  |
| kitchen-vagrant      |                  |
| package installation |                  |
| openssl              | 安全机制SSL      |

### Summary
安装结束,验证所有component安装成功.

## 2.   Install and configure the chef-server

在chef主页注册hosted chef server, 之后下载starter kit
[下载starter kit](https://manage.chef.io/organizations/tao_zhang/getting_started)

Download start kit, chef-repo folder in the size of 9.5 KB

[locate the chef-repo](http://snag.gy/Vo3ql.jpg)
Contains chef configuration files.

{% codeblock %}
knife ssl fetch
{% endcodeblock %}

### Verification
{% codeblock %}
knife client -u windse7en -k ./.chef/windse7en.pem
{% endcodeblock %}
验证通过显示list

### Summary
配置好和server的connection结束

## 3.   Install and configure a node

在开启了SSH的情况下用knife配置node
{% codeblock %}
knife bootstrap ip.address.. -x username -P password --sudo
{% endcodeblock %}

[安装命令](http://snag.gy/CLuvy.jpg)
deploy node divide into 4 steps:
1.  install the client(install chef-12.4.1-1.dmg above)
2.  start chef client creating a new client identity
3.  Synchronizing Cookbooks and Compile it
4.  Run handlers

### Verification

Pay attention to the current folder, as the knife will use the pem file for validation
{% img http://snag.gy/G56Jm.jpg %}

The view after loginned the chef manager:
{% img http://snag.gy/PSDsf.jpg %}

### Summary
Use the workstation or the server to monitor the node. I can’t find the chef-client in the node computer.

## 4.   Delete the node
{% codeblock %}
knife node delete node-name
{% endcodeblock %}

{% img http://snag.gy/8gwRD.jpg %}

After the delete, the client still can show the that node information.

### Verification
But there is no such node in the server.
{% img http://snag.gy/mryj6.jpg %}

### Summary
It is quite easy to delte the node. But pay an attention to the info. The node information is node deleted completely from ther server.


