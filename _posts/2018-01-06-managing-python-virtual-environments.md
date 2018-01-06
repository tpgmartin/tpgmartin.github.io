---
layout: post
comments: true
title: 'Managing Python Virtual Environments'
categories: ['python']
tags: ['python', 'tutorial']
permalink: 'managing-python-virtual-environments'
fullview: true
 -
---

Having gotten use to using Anaconda and [Conda](https://conda.io/docs/index.html) to create and manage Python projects, I recently found myself in the position of wanting the same degree of dependency management for different projects without the need of installing additional software. Luckily enough, Python 3.3+ supports virtual environments out of the box albeit in a very stripped-down forn. This short post is just to demonstrate how to use this neat tool - things that I have been consistently forgetting! Some of these steps are specific to the OS and shell that I use: macOS and ZSH. YMMV.

Assuming your version of Python supports virtual environments, you can create a new virtual environment with,

{% highlight bash %}
python -m venv my-virtual-environment
{% endhighlight %}

Which will create all the dependencies for the new virtual environment in the current working directory. You can also specify a path to your new virtual environment as well. For the purpose of development, it's easier to activate a virtual environment to save you from consistently specifying the environment's full path during development. To activate the virtual environment use,

{% highlight bash %}
source my-virtual-environment/bin/activate
{% endhighlight %}

Within the activated virtual environment, you can use pip as required to install particular dependencies. You can then save all your project dependencies to a text file, 

{% highlight bash %}
pip freeze > requirements.txt
{% endhighlight %}

and then use this to install the matching dependencies in another environment or project

{% highlight bash %}
pip install -r requirements.txt
{% endhighlight %}

Finally, leave your virtual environment with

{% highlight bash %}
deactivate
{% endhighlight %}

All the best,

Tom
