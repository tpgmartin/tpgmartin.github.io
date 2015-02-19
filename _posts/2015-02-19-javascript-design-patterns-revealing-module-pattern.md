---
layout: post
comments: true
title: "JavaScript Design Patterns: Revealing Module Pattern"
categories: ['javascript', 'patterns']
tags: ['javascript', 'patterns', 'module']
permalink: "javascript-design-patterns-revealing-module-pattern"
fullview: true
 -
---

This post carries on from [yesterday's]({{ site.BASE_PATH }}/javascript-design-patterns-module-pattern/) so if you haven't read, get to it! As you may have guessed from the name, the revealing module pattern is a variant of the module pattern already covered. However, it has proven so popular as to warrant specific mention in most to every discussion of design patterns.

The two takeaways from the module pattern were,

1. We can choose the visibility of our variables and methods, either public or private,
2. We use object literal notation to set out public variables and methods.

This is reasonably effective though a bit crude: We have the rather unfortunate practice of writing private entities differently to public ones, the latter use object literal notation. Furthermore it can lead to needless repetition in our code if we wish to reference public entities from another. The revealing module pattern leads to much cleaner code as all our methods and variables, regardless of visibility, are written together. We then `return` - reveal - the entities we wish to make public. For instance,

{% highlight javascript %}
var House = (function () {
 
  // Both public and private entities go here using the same syntax
  var privateVar = 0;
  var publicVar = true;
  
  function privateMethod() {
    console.log(privateVar);
  }

  function publicMethod() {
    privateVar++;
  }
 
  return {
 
    // Public properties and methods go here.
    // The methods above are scoped to the closure, this gives us the
    // added benefit of sticking to a more specific naming convention.
    garage: publicVar,
    goShopping: publicMethod
 
  }
})();
{% endhighlight %}

Altogether, a bit nicer to look at. There may be some concerns, as with the vanilla module pattern, regarding the difficulty of testing or [patching](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript) methods which refer to private entities.

All the best,

Tom