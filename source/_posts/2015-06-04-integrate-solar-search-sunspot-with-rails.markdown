---
layout: post
title: "Integrate solar search sunspot with rails"
date: 2015-06-04 14:12:49 -0400
comments: true
categories: [rails, solar, sunspot, search]
---

[Sunspot Github](https://github.com/sunspot/sunspot)

rails g sunspot_rails:install
只安装了config/sunspot.yml文件进行配置

gem ‘sunspot_solr’
rake sunspot:solr:start(stop)
安装完了以后开启solr服务，这样在development过程中可以用solr，用完stop服务。
rake sunspot:solr:reindex
新加了search属性，就要重新index数据.

会引起问题的写法，问题：会显示前一次的结果，不显示这一次的。主要是response的更新时间
{% codeblock lang:coffee %}
$("#top_search").autocomplete({
    source: (request, response) ->
        send_ajax_request('/home/search_anything', {'top_search': request.term}, (data)->
            root.search_results = data
        )
        response( $.map( root.search_results, (item) ->
            {
                label: item.label,
                value: item.value
            }
        ))
    , select: (event, ui)->
        autocomplete_update_lable(event, ui, 'top_search', 'choosen_search_result')
    , focus: (event, ui)->
        autocomplete_update_lable(event, ui, 'top_search', 'choosen_search_result')
    #, appendTo: "#modal-content"
})
{% endcodeblock %}

修改后的代码：
 
{% codeblock lang:coffee %}
$("#top_search").autocomplete({
    source: (request, response) ->
        send_ajax_request('/home/search_anything', {'top_search': request.term}, (data)->
            root.search_results = data
            response( $.map( root.search_results, (item) ->
                {
                    label: item.label,
                    value: item.value
                }
            ))
        )
    , select: (event, ui)->
        autocomplete_update_lable(event, ui, 'top_search', 'choosen_search_result')
    , focus: (event, ui)->
        autocomplete_update_lable(event, ui, 'top_search', 'choosen_search_result')
    #, appendTo: "#modal-content"
})
{% endcodeblock %}
 
rotate css 写法：

{% codeblock lang:css %}
style:
-webkit-transform: rotate(-25deg);
{% endcodeblock %}

如果在layout里面想调用的方法，把方法放到controller的folder里面，在里面建一个文件，用来存rb文件
[Include method in controller](http://stackoverflow.com/questions/6604272/call-module-function-from-controller-nomethoderror)


[Attribute Can’t be Accessible](http://stackoverflow.com/questions/16515460/activeadmin-cant-mass-assign-protected-attributes-email-password-password-c)
