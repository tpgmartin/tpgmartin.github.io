---
layout: post
comments: true
title: "JavaScript Design Patterns: Module Pattern"
categories: ['javascript', 'patterns']
tags: ['javascript', 'patterns', 'module']
permalink: "javascript-design-patterns-module-pattern"
fullview: true
 -
---

Similar to my previous posts [in]({{ site.BASE_PATH }}/javascript-design-patterns-constructor-pattern/) [this]({{ site.BASE_PATH }}/javascript-design-patterns-singleton-pattern/) series, the module pattern is perhaps better described as a general best-practice than as by a distinct structure. Unsurprisingly then, there are a number of common variations in the wild such as using import mixins and exports. At its core it rests on a very simple principle we will see a lot more of in the future: Using object literal notation to assign property values and method to our class-like objects. This can be particularly useful as a (rather crude) way of setting properties as either public or private. An example using the IIFE pattern,

{% highlight javascript %}
var House = (function () {
 
  // Private properties and methods go here,
  // everything here is scoped to the function closure
  var numToiletries, printToiletries;
 
  numToiletries = 0;
 
  printToiletries = function( numToiletries ) {
      console.log( numToiletries );
  };
 
  return {
 
    // Public properties and methods go here
    garage: true,
 
    // We can still interact with private variables here
    goShopping: function() {
 
      numToiletries++;
 
    }
  };
})();
{% endhighlight %}

This allows us to namespace private variables to the closure. However, this particular pattern can lead to some challenges if we wish to change the visibility or a particular variable at a later date: We will have to make a change at each place the variable was used. This frustration inspired the more sophisticated [revealing module]({{ site.BASE_PATH }}/javascript-design-patterns-revealing-module-pattern/) pattern, which I'll cover tomorrow.

All the best,

Tom