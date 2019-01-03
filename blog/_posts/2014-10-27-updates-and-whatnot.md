---
layout: post
comments: true
title: "Updates and Whatnot"
categories: [general, update]
tags: [update]
permalink: "/blog/updates-and-whatnot"
fullview: true
 -
---
Hopefully I'll be in a position to post actual factual content soon enough, so yay!

In the meantime I thought it would be useful to list all the resources I've used so far to get my blog in the state you see it in now.

Behind the scenes, I've added [Thor](http://jonasforsberg.se/2012/12/28/create-jekyll-posts-from-the-command-line) following pretty much the same steps as per the linked blog post. Pretty obviously, this speeds up my workflow just a bit: getting rid of the need to add all the front matter by hand. One issue that I came across was how best to create nice looking URLs for each blog post. I haven't found a definite answer so far, my solution was to add to my `jekyll.thor` file,

{% highlight ruby %}
# Other code
  post.puts "permalink: \"#{title.downcase.gsub!(/\s/,'-')}\""
# More code
{% endhighlight %}

where title is the name I give the post from the command line. The permalink for each page will simply be constructed out of the title rather than the entire file name including the date. I'm using the [jekyll-sitemap](https://help.github.com/articles/sitemaps-for-github-pages/) gem to automatically generate a sitemap for SEO goodness. Finally, maybe stating the obvious, but I'm hosting using [GitHub Pages](https://pages.github.com/), for cost and ease of use with Github.

Upfront stuff: I'm really happy with the overall look and feel of the [dbyll](https://github.com/dbtek/dbyll) theme, looks great on mobile and easy to customise. I changed my gravatar using [Pixen](http://pixenapp.com/), ultimately I want to graduate to a decent looking 16 bit cat. 

I purchased my domain name through [Namecheap](https://www.namecheap.com/) and followed the steps [here](http://davidensinger.com/2013/03/setting-the-dns-for-github-pages-on-namecheap/).

Most of the other setup including adding [Disqus](https://disqus.com/) and adding [Google analytics](http://www.google.com/analytics/) went pretty much as per the available documentation. Further instruction can be found [here](http://joshualande.com/jekyll-github-pages-poole/). Other than that, there's always [this](http://jekyllbootstrap.com/) handy documentation.

All in all, it was a good learning experience with a shallow learning curve. I'd like to add more functionality in the future, but for the time being I need to make a start on content. Feel free to add in helpful pointers.

Tom