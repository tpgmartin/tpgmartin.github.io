---
layout: post
comments: true
title: "Git Merge Conflicts with Binary Files"
categories: ['tutorial', 'git']
tags: ['unix', 'github', 'command-line', 'git', 'images']
permalink: "git-merge-conflicts-with-binary-files"
fullview: true
 -
---

Recently I had to deal with a situation that I've some how managed to avoid for a surprisingly long time: merge conflicts due to mismatched binary files, in this case image files. Now Git being Git, there are a number of equally viable ways of resolving any given problem - and thinking back, I do slightly regret not giving more time to investigating the arguably cool-sounding [`git mergetool`](http://git-scm.com/docs/git-mergetool). In general, binary files can be a bit of headache with Git due to the difficulty of dealing with their diffs. This can be a cause for concern due to the need to manually resolve some issues further down the line, [although there is help out there](http://stackoverflow.com/a/4705537).

That said, diffs aren't so much a problem with image files. In my case, I made use of [`git checkout`](http://git-scm.com/docs/git-checkout) using the `--ours` and `--theirs` options, for instance `git checkout --ours -- myfile.png`. Appending one or the other option to `git checkout` allows you to checkout your or their committed file respectively. This saves you the effort of resolving the merge conflict manually. 

All the best,

Tom