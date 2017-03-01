---
layout: post
title: "L: Chef online tutorial"
date: 2015-07-31 11:13:48 -0400
comments: true
tags: [chef, tutorial]
---

[Chef Online Tutorial](https://learn.chef.io/)

# 1.    Learn the Chef basics - Ubuntu
Objectives:
1.  have a basic understanding of what happens when Chef runs.
2.  be able to write Chef code that defines a basic policy.
3.  be able to apply that policy to a server.

<!--more-->
## a.   Get set up

1.  Launch an Ubuntu virtual machine hosted by the chef.
2.  use vim for text editor

## b.   [Configure a resource](https://learn.chef.io/learn-the-basics/ubuntu/configure-a-resource/)

| Chef component | Description                                                                                                                          |
| ---            | ---                                                                                                                                  |
| resource       | describes some piece of infrastructure, such as a file, a template, or a package.                                                    |
| recipe         | a file that groups related resources, such as everything needed to configure a web server, database server, or a load balancer.      |
| cookbook       | provides structure to your recipes and enables, such as our web server’s home page. In essence, a cookbook helps you stay organized. |
| knife          | enables you to interact with the Chef server                                                                                         |
| node           | all the computer resources infrastructure managed by Chef                                                                            |

[file chef docs](http://docs.chef.io/resource_file.html)
[directory chef docs](https://docs.chef.io/resource_directory.html)

chef-repo save all the resources files
{% codeblock %}
chef-apply filename.rb  #run the rb file
{% endcodeblock %}

hello.rb is a recipe, motd file is the resource. Resource also can be package, service.
{% codeblock %}
# Example for hello.rb
file ‘motd’ do
    action :create  # default action, if there isn’t explicit, it will called.
    content ‘hello Tao’
end
{% endcodeblock %}

The functionalities of recipe:
1.  install and configure software components.
2.  manage files.
3.  deploy applications.
4.  execute other recipes.

## c. [Configure a package and service](https://learn.chef.io/learn-the-basics/ubuntu/configure-a-package-and-service/)

Install the Apache package

The order in the recipe is very important. But the orders of the attributes of the file is doesn’t matter.
{% codeblock %}
# webserver.rb configure the apache server
execute ‘apt-get-update’ do
  command ‘apt-get update’
end

package ‘apache2’

service ‘apache2’ do
  supports :status => true
  action [:enable, :start]
end

file ‘/var/www/html/index.html’ do
  content ‘<html>
    <body>
        <h1>hello Tao</h1>
          </body>
          </html>’
          end</h>
    </body>
  </html>
end
{% endcodeblock %}

### Verification
{% codeblock %}
curl localhost      # will see hell Tao
{% endcodeblock %}

## d.   [Make your recipe more manageable](https://learn.chef.io/learn-the-basics/ubuntu/make-your-recipe-more-manageable/)

mkdir cookbooks,    use templates to handle html. chef-client to run the cookbooks with the recipe list.

# 2.    [Learn to manage Ubuntu Node](https://learn.chef.io/manage-a-node/ubuntu/)
objectives:
1.  be able to write Chef code to define a policy from your workstation.
2.  be able to apply that policy to a node.
3.  understand how to access cookbooks written by the Chef community.

## a.   Get Set up

configure the chef locally

## b.   Set up your Chef server

Download cookbook from the chef supermarkets
{% codeblock %}
knife cookbook site download learn\_chef\_apache2
knife cookbook upload learn\_chef\_apache2  #upload the cookbook
{% endcodeblock %}

## c. Bootstrap your node

A very long command, don’t forget to apt-get update.

{% codeblock %}
knife node list
knife node show node-name
{% endcodeblock %}

## d. Update your node’s configuration

You ran knife bootstrap to associate your node with the Chef server and do an initial check-in. Bootstrapping is a one-time process.
The knife ssh command enables you to update your node’s configuration when your cookbook changes.
