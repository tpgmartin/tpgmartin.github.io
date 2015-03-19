---
layout: post
comments: true
title: "jQuery Tips"
categories: ['jquery', 'javascript']
tags: ['jquery', 'javascript']
permalink: "jquery-tips"
fullview: true
 -
---
This is a very short post on some useful tidbits I've learnt using the ubiquitous jQuery library. I have occasionally found myself in a sticky situation because either (a) the library had not loaded, (b) I've been using the wrong version.

We can check if the library is available to us by using either a bang (or two), or using the `instanceof`operator. We can use `jQuery` and `$` interchangeably, as they are aliases.

{% highlight javascript %}
// Load library if it hasn't already
if (!window.jQuery) { 
  // code goes here ...
}

if (typeof window.jQuery == 'undefined') {
  // 'ere be code ... 
}
{% endhighlight %}

In the previous example we used `window.jQuery` as this will simply result in a truthy output. Using just `jQuery` or `$` alone with the leading bang will lead to a reference error.

We can get the version number by logging one of the following,

{% highlight javascript %}
// Either ...
jQuery.fn.jquery // or jQuery().jquery

// or equivalently
$.fn.jquery // or $().jquery
{% endhighlight %}

Of course, we would need to know the library had already loaded before checking the version!

Short and sweet!

All the best,

Tom