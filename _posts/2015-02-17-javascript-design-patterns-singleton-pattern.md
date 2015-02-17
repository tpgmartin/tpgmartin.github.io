---
layout: post
comments: true
title: "JavaScript Design Patterns: Singleton Pattern"
categories: ['javascript', 'patterns']
tags: ['javascript', 'patterns', 'singleton']
permalink: "javascript-design-patterns-singleton-pattern"
fullview: true
 -
---

The singleton pattern is perhaps one of the more controversial patterns in common use. Ironically, both its proponents and detractors will point to the same feature of the pattern as its main plus/minus. This pattern provides a single instance of a class (or JavaScript object), with a global point of access: it advocates global namespace pollution. This can be particularly useful when using third-party libraries. Although there may be coping strategies available, jQuery for instance provides us with [`$.noConflict()`](http://api.jquery.com/jquery.noconflict/), it is generally a sign of bad design. Code structured as a singleton pattern indicates that our logical is tightly coupled, which can make debugging nightmarishly difficult.

Unlike the other patterns we will come across, the singleton pattern is not defined so much by a specific written structure, we could just as well talk about either object literals and function closures. All we want is something that provides a globally available object instance. Carrying on from my previous [post]({{ site.BASE_PATH }}/javascript-design-patterns-constructor-pattern/) on the constructor pattern, we can create a singleton example, shamelessly hoisted from Rob Dobson's [post](http://robdodson.me/javascript-design-patterns-singleton/) on the subject,

{% highlight javascript %}
function House() {  
    // check global scope for existing object
    if (typeof House.instance === 'object') {
        return House.instance;
    }

    // bog-standard constructor
    this.bedrooms = 3;
    this.bathrooms = 1;
    this.garage = true;

    // cache this particular object instance
    House.instance = this;

    // implicit return
    return this;
}
{% endhighlight %}

This is admittedly quite crude, and highlights the key issue with globally available variables: we have no particular control where and how a given `House` instance is set. Although not specific to the singleton pattern, we can make it far more [sophisticated](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript) by making use the [IIFE](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression) pattern to make the contents private.

All the best,

Tom