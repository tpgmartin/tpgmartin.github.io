---
layout: post
comments: true
title: 'In Defence of BEM'
categories: ['css']
tags: ['css', 'bem']
permalink: 'in-defence-of-bem'
fullview: true
 -
---

BEM is an easy target for criticism in the world of front-end development, it can be verbose, complicated, and just plain ugly. In a world of preprocessors and source maps, it is all the more important to restate some of the advantages BEM can bring,

1. There is a one-to-one relationship with named selectors in stylesheets and selectors found in the DOM,
2. Grepping your stylesheets is that much easier because of strict "double underscore," "double hyphen" syntax,
3. Natural extension of the above two points: no ambiguity of relationship between selectors, no need to infer by context

Let's look at an example, the following code is adapted from Robin Rendle's [BEM 101](https://css-tricks.com/bem-101/),

{% highlight scss %}
.menu {
  background: #0B2027;
  &.trigger {
    background: #16414f;
    float: left;
    padding: 1.3rem 0;
    width: 10%;
    text-align: center;
    color: white;
    font-size: 1.5rem;
    -webkit-transition: .3s;
            transition: .3s;
    &.active {
      background: salmon;  
    }
  }
}
{% endhighlight %}

Taking advantage of a preprocessor, we can nest sibling selectors to create a concise code snippet. However we can already see some possible problems that may arise,

* It is only clear what we should expect `.active` to do by reference to its nesting, we'd need to take advantage of `@import` rules to properly namespace,
* Is this really scalable? How often can we expect this set of class names to occur in the future?
* What about JS hooks?

A fully BEM solution would produce,

{% highlight css %}
.menu {
  background: #0B2027;
}

.menu__trigger {
  background: #16414f;
  float: left;
  padding: 1.3rem 0;
  width: 10%;
  text-align: center;
  color: white;
  font-size: 1.5rem;
  -webkit-transition: .3s;
          transition: .3s;
}

.menu__trigger--active {
  background: salmon;
}
{% endhighlight %}

Though perhaps arguably less attractive to look at, there is certainly something to said for being explicit. To slightly abuse the conclusions made in Ben Frain's [Enduring CSS](http://benfrain.com/enduring-css-writing-style-sheets-rapidly-changing-long-lived-projects/), for the small risk of extra bloat in the short term, there is the promise of greater mobility in the long term. CSS selector naming is first and foremost about communicating intent to other developers, especially those that may not be exclusively front-endians. With BEM, there is an explicit flat relationship between selectors, which is clearly communicated in CSS *and* HTML: No need to dig around to know that `.menu__trigger--active` implies a state change and relates to a specific child/component.

All the best,

Tom
