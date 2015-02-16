---
layout: post
comments: true
title: "JavaScript Design Patterns: Constructor Pattern"
categories: ['javascript', 'patterns']
tags: ['javascript', 'patterns', 'constructor']
permalink: "javascript-design-patterns-constructor-pattern"
fullview: true
 -
---

The constructor pattern is arguably the bread and butter design pattern. Some context: JavaScript is a so-called classless, inheritance is instead prototypal: objects inherit from objects. This particular feature of the language was originally inspired by [Self](http://en.wikipedia.org/wiki/Self_(programming_language)). With this in mind, we try to mimic class-like inheritance using objects - in particular we want to create object constructors. 

To start, all we need to bear in mind is some basic JavaScript syntax,

1. We can append key to objects using the "dot" syntax,
2. We create a new object instance using the `new` keyword.

{% highlight javascript %}
1. Object.key = value;
2. var object = new Constructor( /* arguments */ );
{% endhighlight %}

The pattern usually follows,

1. Use a function closure to create an [object-like structure](http://www.phpied.com/3-ways-to-define-a-javascript-class/), this is our "constructor function,"
2. Append variable values to an object instance using the `this` keyword,
3. Append shared object methods to the Prototype object.

Altogether we would get something,

{% highlight javascript %}
function House( bedrooms, bathrooms, garage ) {
  // this should prevent some annoying problems 
  // such as calling the constructor without `new`.
 "use strict";

  this.bedrooms = bedrooms;
  this.bathrooms = bathrooms;
  this.garage = garage;
 
}

// In other words we want House.prototype.hasOwnProperty('hasParking') === true
House.prototype.hasParking = function () {
  return "Has parking space:" + this.garage;
};
 
var bungalow = new House( 2, 1, true );
var terrace = new House( 3, 2, false );
{% endhighlight %}

Though simple in its execution, depending on the nature of the problem at [hand](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#categoriesofdesignpatterns) the constructor pattern could lead to a lot of unnecessary bloat. In the coming weeks, we will see constructors again and again in some form or another, as they often form a smaller part of more elaborate patterns.

All the best,

Tom