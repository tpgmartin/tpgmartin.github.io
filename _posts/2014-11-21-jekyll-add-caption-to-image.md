---
layout: post
comments: true
title: "Jekyll: Add Caption to Image"
categories:
tags:
permalink: "jekyll-add-caption-to-image"
fullview: true
 -
---

Having only relatively recently started to blog using Jekyll, I've only just come across the problem of trying to add captions to images - sans plugin.

Fortunately Jekyll is very easily extensible with some straight-forward HTML/CSS. Of course, following the framework's separation of concerns, we need to do three things: Add markup to our `_includes` folder, update our stylesheet, and finally include a reference to our markup in the blog post file.

In the `_includes` folder, I created a new file called `image.html`, which includes,

{% highlight html %}
<figure class="center">
  <img src="{{ "{{ include.url " }}}}" alt="{{ "{{ include.description " }}}}"/>
  <figcaption>"{{ "{{ include.description " }}}}"</figcaption>
</figure>
{% endhighlight %}

with a CSS class `center` with properties adjusted to taste.

Turning to the blog post, I want to add,

    {{ '{% include image.html url="/path/image.png" description="Caption" ' }}%}

making use of Jekyll's `include` tag. Everything should be self-explanatory, although it should be said that I've used a relative path to the image file as prefxing `url` with `site.BASE_PATH` led to a `Liquid Exception`. Et voilà,

{% include image.html url="/assets/media/salt_of_the_earth.jpg" description="Salt of the Earth character" %}

and of course we can add any sort of customisation from here. 

All the best,

Tom