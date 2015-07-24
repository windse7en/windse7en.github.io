---
layout: post
title: "Learn: linux command tips"
date: 2015-07-22 11:48:10 -0400
comments: true
categories: [linux, command]
---

# info
帮助的中级文档，可以入手学习Emacs。主要的操作
| Command   | Description              |
| ---       | ---                      |
| h, ?      | help                     |
| n([),p(]) | next node, previous node |
| m         | go to node by name       |
| l         | last location            |
| t         | top of file              |
| u         | upper layer of nodes     |

# sed
[Sed 详解](http://coolshell.cn/articles/9104.html)
大神级的全能文件处理工具。
| Sign               | Description                    |
| ---                | ---                            |
| $                  | last line                      |
| =                  | 算行数                         |
| 3,\$               | 从3行到文件结尾                |
| s///g              | 全文替换                       |
| s/\(<\[^>]\*)/\1/g | group regex display            |
| /fish/c cat        | 替换匹配行                     |
| /fish/d            | delete the line                |
| 1p                 | print the line                 |
| N;s/\n/,/          | N 把下一行内容也放入缓冲区匹配 |
| 1 a Test; 1 i Test | insert and append context      |

pattern space是测试和输出的buffer，hold space是装要测试的下步数据的内容。
| HoldSpace | Description                                |
| ---       | ---                                        |
| g         | hold space 放到pattern space，原有内容清除 |
| G         | append in pattern space\n                  |
| h         | pattern space 放到hold space，原有内容清除 |
| H         | append in hold space\n                     |
| x         | 交换patern space和hold space               |



