---
layout: post
comments: true
title: 'Distributed File Systems and MapReduce'
categories: ['big data']
tags: ['distributed file system', 'mapreduce', 'parallel programming']
permalink: 'distributed-file-systems-and-mapreduce'
fullview: true
 -
---

This blog post discusses a solution to *the* problem in big data. Imagine dealing with a very large dataset, if we want to persist it in any practical way then we have two big problems to deal with due to the sheer size of the dataset. Firstly, the size of the dataset will make it impossible to store on a single machine or disk (in a general case). Secondly, the processing time will become painfully large without introducing some means to parallelise this process. Using a distributed file system (DFS) together with a MapReduce framework will address both these issues. This post will provide a high-level overview of these two technologies. In relation to DFS, we will consider the example of Google File System (GFS).

## Google File System

GFS is a means of managing a distributed file system, that is, data storage across multiple machines. The core GFS architecture is based around a single centralised master node, which contains a lookup table to determine the storage location of the the individual files. The files themselves are stored on a much larger number of "Chunkservers", so-called because they store files in multiple 64 MB chunks - with replication across the network. An application client talks directly to the master node.

## MapReduce

MapReduce is a general framework for parallel programming. As above, imagine having a dataset so large that we want to avoid operating on it sequentially. To do this we want to be able to operate on multiple subsets on the dataset independently, but still be able to aggregate the separate subsets later on - afterall it's the one dataset we've just split it up for our own convenience. This is precisely what "map" and "reduce" separately refer to,

* Map: run some function over each and every element in each subset
* Reduce: aggregate the subsets

To do this, we assume that our data is separated into key, value pairs. The map function will take in a set of key, value pairs, and return another set of key, value pairs (usually with the key being different afterwards). The reduce function can then group together elements in different subsets by matching on each unique key. Both the map and reduce functions are written by the developer, but the actual execution is left up to the framework.

The key strengths of both technologies are their generality as well as their ability to abstract away low-level details for the developer.

All the best,

Tom
