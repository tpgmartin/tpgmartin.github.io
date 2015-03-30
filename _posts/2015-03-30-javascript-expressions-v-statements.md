---
layout: post
comments: true
title: "JavaScript: Expressions v Statements"
categories: ['javascript']
tags: ['expressions', 'statements']
permalink: "javascript-expressions-v-statements"
fullview: true
 -
---
JavaScript, like many other languages, distinguishes between expressions and statements, which means you should too. However, the terms do not refer to a particularly clear cut syntactic difference in many cases and often the difference is largely context specific. 

The simplest definition of these terms: Expressions produce a value, or stand in wherever a value is expected, these act without producing any side effects. For instance, examples are taken from Rauschmayer's [review](http://www.2ality.com/2012/09/expressions-vs-statements.html) of the subject,

{% highlight javascript %}
myvar
3 + x
myfunc("a", "b")
{% endhighlight %}

On the other hand, a statement provides an action or behaviour, such as a loop, `if` statement, or function declaration. (Most authors lump together declarations with statements. this is not exactly true as, for instance, declarations are treated differently in the hoisting process.) An important unidirectional relationship exists between expressions and statements: A statement may always be replaced by an expression, called an expression statement. The reverse is not true. The distinction becomes more muddy from here!

A particular problem relates to the difference between function expressions and function declarations, which look essentially the same,

{% highlight javascript %}
// Function expression
var greeting = function () { console.log("Hello!"); };

// Function declaration
function greeting() { console.log("Hello!"); };
{% endhighlight %}

I wasn't lying! The devil is in the details: the function expression returns a function object which we've assigned to the variable `greeting`. The function expression here is actually anonymous - there is no name given on the right hand side of the equals sign. A named function expression such as,

{% highlight javascript %}
// Named function expression
var greeting = function howdy() { console.log("Hello!"); };
{% endhighlight %}

has the name `howdy` that is scoped to the function expression. The function declaration on the other hand, declares a new variable, with a  new function object assigned to it. This produces something equivalent to the function expression above,

{% highlight javascript %}
var greeting = function () {
  console.log("Hello!"); 
};
{% endhighlight %}

Unlike function expressions, function declarations cannot be anonymous, which is why the the first example function expression was an expression not a declaration. This is an important point as this implies IIFE pattern has to be a function expression.

Without going into any great detail, the distinction between function expressions and function declarations also shows up again in the topic of [hoisting](http://speakingjs.com/es5/ch15.html#function_hoisting): only function declarations are completely hoisted.

The discussion only continues from here: Whether statements or expressions are more [performant](http://stackoverflow.com/questions/2586842/javascript-if-else-or-ternary-operator-is-faster) - I accept it's a nonce word, or which better lends itself to [best-practices](http://www.unicodegirl.com/function-statement-versus-function-expression.html).

All the best,

Tom