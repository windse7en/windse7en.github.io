---
layout: post
title: "a endless journey to learn vim"
date: 2015-07-10 10:12:52 -0400
comments: true
tags: [vim]
---

This description to the VIM journey is to descript my learning process of VIM:

#开始通过看thoughtbot的vim教学视频学习怎么配置好vim的工作环境，玩vim adventure。第一部基本学会的内容：
1.  motion在一个文件中
2.  vim中的letter，word，sentence，paragraph的概念
3.  配置vim config文件选择template，颜色
4.  掌握常用的：command
5.  三种mode熟练切换

<!--more-->
VIM keystrokes的评价体系：VImGolf按了几个键，Repitation容不容易repete,undo 时候是否和计划的一样, keep a lean undo/redo history
习惯用<Esc>o来取代<CR>因为undo会根据最近的change。
用思想来切换mode，如果信息输入完了，应该习惯切回normal
vim的熟练过程开始是熟悉keystoke，之后要有逻辑，motion和change分开，可以repeat motion或者change，DRY。
VIM思想Pattern

| VIM Pattern        | 描述                                                                |
| ---                | ---                                                                 |
| Dot Formula        | One Keystroke to move, one keystroke to execute                     |
| Series or Parallel | 例如可以22@q的方式去修改，亦可以VG:`<,`>normal @a的方式parallel修改 |

##掌握不好的地方：
1.  Normal下操作的互动
2.  Visual下的互动命令
3.  :h 的使用不熟练，找不到想要的帮助内容
4.  :set 的内容不了解具体效果 VIM mode   


| Mode                              | 功能描述                             |
| ---                               | ---                                  |
| Normal                            | 操作                                 |
| Insert                            | write                                |
| Visual                            | choose                               |
| Insert Normal mode                | <C-o>+normal keystroke               |
| Operator-pending mode             | dw,between d and w can be customized |
| Replace                           | replace the char                     |
| Char[line,block]-wise Visual mode | v,V,<C-v> enter diff visula mode     |

##开始容易掌握的操作：
1.  $,), g, G, iao, IOA, v, n, <>
2.  d, y, c, u, C-r, x
3.  hjkl, f, t

##开始掌握不好的操作：
1.  normal Mode：=, `, q, ;, . , r
2.  Ex Mode: Q, ebw, HL, {}, C-i, C-o illustion   


| keystroke        | 描述                                             |
| ---              | ---                                              |
| ;                | 重复之前的f或者t motion操作                      |
| .                | 重复最近的change操作                             |
| &                | 重复最近的:substitutecommand                     |
| ,                | reverse ; 的结果，但远程有点慢                   |
| ?                | for preview match                                |
| *                | Search forward for cursor word                   |
| =                | Autoindent                                       |
| !                | filer {motion} lines by external program         |
| <C-w>            | insert mode delete back one word                 |
| <C-u>            | insert mode delete back to start of line         |
| <C-h>            | insert mode delete back one char                 |
| <C-o>            | 进入Insert-Normal mode                           |
| <C-r>0           | insert mode paste from yunk and keep in one undo |
| V: o             | toggle the free end                              |
| <C-v>            | 进入Visual-Block mode 可以多行一起输入           |
| “ayy; “ap        | copy into the register a, put from register a    |
| yy; “0p; :reg “0 | yank always copy into reg 0                      |
| ”_; “+; “*       | black hole reg, system clipboard, selection reg  |


#重要的Plugin：

Easymotion：很方便的motion的插件非常给力。
<Plug>(easymotion-sn),                      <Leader>s,                                               t,  /,

NERDCommenter: 快速注释
<Leader>c,                                  [count]<Leader>cc

Tabulize: 样式对齐
,                                           a:: 功能是:Tabulaize \:zs<CR> 以:后面的内容对齐

ctags：右侧显示函数树
<Leader>b

NERDTree: 左侧的文件夹结构树
<C-e>: toggle nerdtree

#熟练地Ex Commands
| ExCommands               | 描述                                               |
| ---                      | ---                                                |
| :grep searchstring *     | 功能上就是$ grep -n searchstring *                 |
| :2,5p                    | print echo the lines from line 2 to 5              |
| :/<body>/+1,/</body>/-1d | delete body tag 之间的行                           |
| :join                    | join without motions                               |
| :%s/Practical/Pragmatic  | 全文替代% is the file                              |
| :normal {command}        | ...                                                |
| :6t.                     | :[range]copy {address} duplicate one or more lines |
| :m                       | move lines                                         |
| :colorscheme <C-d>       | show all options for the command                   |
| :<C-r><C-w>              | get the current word under cursor                  |
| :2,$!sort -t’,’ -k2      | sort current file by second column                 |
| :reg                     | show all registers info                            |

| Keystrokes     | 描述                                       |
| ---            | ---                                        |
| vit            | 功能上是选择html<tag></tag>之间的内容      |
| ci(            | 功能上是去掉()之间的内容进入insert mode    |
| >G             | indent从cursor到end of file的位置          |
| @:             | 重复之前的Ex command                       |
| daw            | delete a word, 可以从后到前的word去掉space |
| [v]as          | in visual mode choose a sentence           |
| gv             | reselect the last visual selection         |
| gj,gk,g0,g^,g$ | move down and up by display lines          |
| ge             | backward to the end of word, reverse of e  |

#VIM 启动命令
| Commands     | 描述                                                    |
| ---          | ---                                                     |
| vi -u NONE N | -u NONE 指定不用vim渲染，N：set nocompatable提供vim功能 |

#VIM Powerful Customize
| Customize | 描述                 |
| ---       | ---                  |
| omap-info | 可以修改motions的key |

#经典Examples：
{% img http://snag.gy/SZMqK.jpg %}
关于Ex Command的图表
{% img http://snag.gy/5BNKB.jpg %}
Text Objects Table
{% img http://snag.gy/kddH2.jpg %}

#Tips
| Tips    | 描述                                                                   |
| --      | --                                                                     |
| qq,22@q | 因为q好按所以放到reg q中，因为2和@是一个键，所以重复多次的时候可以用22 |
