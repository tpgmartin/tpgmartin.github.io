---
layout: post
comments: true
title: "The Path to Git Enlightenment Part 1"
categories: ['tutorial', 'git']
tags: ['unix', 'github', 'command-line', 'git', 'images']
permalink: "the-path-to-git-enlightenment-part-1"
fullview: true
 -
---

If my twitter feed is anything to go by, lately I've been spending some time looking at CSS regression testing using [BackstopJS](https://github.com/garris/BackstopJS) - more on that to come. Invariably though it led to some minor hiccups that really messed up my git-chi. For those who haven't used BackstopJS in it's current, rather nascent state, it can be a bit messy to get started for a relative noob like myself. Upon installation, its files sit in a `bower_components/backstopjs` directory, which is a-ok.

However, annoyances quickly followed as I tried to selectively ignore or track subdirectories and files of the new `backstopjs` directory. The project comes with it's very own `.gitignore` file, which is all very well, unless of course you want to place everything into the one `gitignore` file at the root directory of your project. The solution I've come across is not particularly clean, but is well [documented](http://git-scm.com/docs/gitignore). For instance if you have a directory structure,

{% highlight bash %}
.
├── index.html
└── js
    ├── main.js
    ├── experiment.js
    └── lib
        └── ext.js
{% endhighlight %}

where we may very well want to track `main.js`, but ignore everything else. The documentation above makes it clear that we can't just get away with adding an exception for `main.js`,

>  It is not possible to re-include a file if a parent directory of that file is excluded. Git doesn’t list excluded directories for performance reasons, so any patterns on contained files have no effect, no matter where they are defined.

In other words, we need to specify the parent directory of every file we wish to track. Following this logic our `.gitignore` should look something like this,

{% highlight bash %}
*
!js
!main.js
{% endhighlight %}

An unfortunate consequence of this is that we would have to specific every parent directory for a given file if we wanted particularly fine-grained control over tracked files. 

In the process I also learnt a neat trick with the `git status` command. If I wish to see all my untracked files, not just directories as per default, [I need to add `-u` option](http://git-scm.com/docs/git-status). This will print out all the individual untracked files, which is particularly useful when specifying specific files as above.

All the best and happy New Year!

Tom