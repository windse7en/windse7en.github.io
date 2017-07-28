---
title: TCP/IP protocals First book
date: 2017-03-04 12:51:20
tags: [tcp/ip, book]
---

# TCP/IP protocals

一篇总体总结的很好地[Blog](http://blog.sina.com.cn/s/blog_611a32ff0100gxkg.html)

> W.Richard Stevens, 著有TCP/IP三卷，UNIX环境高级编程，UNIX网络编程

<!--more-->
## Chapters
通过不同的chapter对比讲述内容
1. 概述，讲了TCP/IP历史，最关键的是，TCP/IP协议族只是四层，不是包括OSI的全部七层。分别是, Data-link, Network, Transport, Application. 没有的是，Physical太底层了，presentation和session，也没有。
2. 引言，主要讲了SLIP & PPP, MTU
3. IP协议是重点
4. ARP，地址解析(Useless), Data-link
5. RARP，逆地址解析(Useless
6. ICMP, TCP/IP中的回显和差错应答
7. Ping程序
8. Traceroute程序
9. IP选路

### IP -> Ethernet 过程理解
> IP datagram会被ehernet封装，加入source mac和des mac，还有一个tail，这个des mac，先在iptable里面找，如果有的话直接用，如果没有的话发送ARP（地址解析请求）来广播问谁知道，拿到以后再用。

### TCP -> IP 过程理解
> TCP里面的header，data都不变，加入IP 20字节的头，在IP header里面主要有版本信息，头长度,TOS（Type of service），总长度, 【标识序号、标志、片偏移】（用于分片），TTL, 协议，校验。

![IP header](https://nmap.org/book/images/hdr/MJB-IP-Header-800x576.png)

## Useful Commands
以下的Commands在Mac和Unix上可以用，用`man <command>`来看帮助文档。
> `man`文档里面主要是三部分，第一部分功能介绍，第二部分各种参数的介绍，第三部分样例输出介绍

### `netstat` Command
1. Use `netstat` to analyze the system interface and MTU
`netstat -i` 显示MTU & interface.
Output example:
```
Name  Mtu   Network       Address            Ipkts Ierrs    Opkts Oerrs  Coll
lo0   16384 <Link#1>                        196929     0   196929     0     0
lo0   16384 localhost   ::1                 196929     -   196929     -     -
lo0   16384 127           localhost         196929     -   196929     -     -
lo0   16384 fe80::1%lo0 fe80:1::1           196929     -   196929     -     -
en0   1500  m1515198.lo fe80:4::aebc:32ff  1659308     -   645371     -     -
```

### `ping` Command
> ping是通过icmp的回显请求和应答来看能不能ping通。TCP/IP协议族一般会支持ping，但也有被路由器或者防火墙封住。
```
icmp_seq: ICMP datagram的学号
ttl:      存活记数
time:     看距离多远
```

### `traceroute` Command

## 理解
1. 大部分协议的结构：
| 版本号 | Header的长度  |  服务类型(功能位) | 整个报文的长度(决定MTU) |
| 支持的协议类型 | 标识(序号) | 标志 | CRC 检验和 |
| TTL(Time to live: 255) | 地址(源，目的) | 数据 | |

## 思考
1. TCP/IP协议族是世界上最成功的软件设计，这么多年不变，可以实现超多的协议和application
1. 多层封装(都是Byte)，用户数据 -> App Header + 用户数据 -> TCP header(20 Bytes) + App数据 -> IP header(20) + ... -> Ethernet Header (14) + ... + Ethernet tail (4)
  * | Ethernet Header(14) | IP Header(20) | TCP Header(20) | Data(...) | Ethernet(4) |
  * IP + TCP + Data, 从46到1500，少了补齐，多了分包, 46 + 18 = 64, [1500 explanation](https://supportforums.cisco.com/discussion/9211546/why-mtu-size-1500)
1. TCP/IP对整个功能性的分层对新的设计分层很有借鉴意义，像TCP可靠，IP不可靠，
1. 功能都可以实现，看最后哪个成为主流。ICMP，TCP都有查询时间的方法
1. 一条信道对各种不同协议的高重用性
1. RFC用来作为规范文档，其他实现要支持的功能性
1. A\B\C\D\E五类地址
1. 数据包超时重发的设定阙值，不过多也不过少
1. 各种名词设定，来统一理解，TCP segment，IP datagram，Ethernet frame
1. TCP三要素：协议，原地址，端口号

## 疑问
1. Ethernet frame里面的source MAC地址，是initial source的还是中间中继的地址？
2. ICMP的端口号是多少？
  * ICMP是IP层，没有端口号，只是协议，主要有type和code，详细[discussion](http://bbs.51cto.com/archiver/tid-821402.html), [ICMP 图片](https://nmap.org/book/images/hdr/MJB-ICMP-Header-800x392.png)
