---
layout: post
comments: true
title: "Nesting Lists"
categories: ['html']
tags: ['lists', 'markup']
permalink: "nesting-lists"
fullview: true
 -
---
Dealing with nested lists in HTML gave me pause for thought recently as though simple the markup is not immediately obvious. Intuitively I'd go for placing the markup for the nested list as a direct child of the parent list, like so,

{% highlight html %}
<ul>
    <li>List item one</li>
    <li>List item two</li>
    <ul>
        <li>Subitem 1</li>
        <li>Subitem 2</li>
    </ul>
    <li>List item three</li>
</ul>
{% endhighlight %}

However, `ul` elements [may only contain list item elements](http://www.w3.org/TR/html-markup/ul.html). Direct from the [W3C wiki](http://www.w3.org/wiki/HTML_lists#Nesting_lists), "the nested list should relate to one specific list item." Hence the markup should be,

{% highlight html %}
<ul>
    <li>List item one</li>
    <li>List item two
      <ul>
          <li>Subitem 1</li>
          <li>Subitem 2</li>
      </ul>
    </li>
    <li>List item three</li>
</ul>
{% endhighlight %}

Minor point perhaps, but good markup is better for your users and makes your life easier in the long run.

All the best,

Tom