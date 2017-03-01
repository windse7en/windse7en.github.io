---
layout: post
title: "Algorithm: The Shortest Path, 关于最短路径的算法"
date: 2015-03-24 13:42:16 -0400
comments: true
tags: [algorithm, graph, dfs, bfs]
---

A*, DFS, BFS, Dijkstra, Prim Tree.

每个算法有自己的优劣。这两篇谈的挺好。

<!--more-->

[A星算法](http://zhidao.baidu.com/question/513691934.html)

[A star wiki](http://zh.wikipedia.org/wiki/A\*%E6%90%9C%E5%AF%BB%E7%AE%97%E6%B3%95)

BFS, DFS 主要是面对遍历整个图找到最优解的情况，默认只有遍历整个图了以后才可能找到最优解。
A星算法是每次决定下一个子节点的时候进行估值，来找到最好解的方向。快速。
