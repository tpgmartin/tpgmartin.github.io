---
layout: post
comments: true
title: "CSS Attribute Selectors"
categories:
tags:
permalink: "css-attribute-selectors"
fullview: true
 -
---

We very often style our markup using attribute selectors such as class name or ID. However, CSS gives us a great deal more sophistication when it comes to using CSS attribute selectors.

To start with, we have a vanilla attribute selector,
{% highlight css %}
[attr]
{% endhighlight %}
which will match any element with matching attribute selector. If instead we wanted to select a tag with a particular attribute,
{% highlight css %}
elem[attr]
{% endhighlight %}
Easy enough. A more subtle point: It will probably be best to assume any attribute selector value i.e. attr="value", is case sensitive to avoid any [nastiness](http://www.sitepoint.com/web-foundations/attribute-selector-css-selector/).

Now the fun part! We can prepend the equals sign between the attribute name and attribute value to define the relationship between them.

{% highlight css %}
[attr='value']
{% endhighlight %}
Matches all elements with "attr" with value exactly equal to "value"

{% highlight css %}
[attr~='value']
{% endhighlight %}
Matches all elements with "attr" with value containing "value" within a space separated list e.g. `rel="this is my value"`

{% highlight css %}
[attr|='value']
{% endhighlight %}
Matches all elements with "attr" with value containing "value" within a dash separated list e.g. `rel="this-is-my-value"`

{% highlight css %}
[attr^='value']
{% endhighlight %}
Matches all elements with "attr", with value starting with "value"

{% highlight css %}
[attr$='value']
{% endhighlight %}
Matches all elements with "attr", with value ending with "value"

{% highlight css %}
[attr*='value']
{% endhighlight %}
Matches all elements with "attr", with value contains at least one instance of "value"

You can go even further and combine the rules given above to create [multiple attribute selectors](https://css-tricks.com/attribute-selectors/).

Altogether, CSS attribute selectors provide more fine-grained control to style markup. For example, you can choose to style anchor tags that link to external pages differently - no need to needlessly suffer classitis.

All the best,

Tom