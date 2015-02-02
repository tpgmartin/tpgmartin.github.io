---
layout: post
comments: true
title: "Maintaining Reusable Stylesheets: Overview of SMACSS"
categories:
tags:
permalink: "maintaining-reusable-stylesheets-overview-of-smacss"
fullview: true
 -
---
Created by [Jonathan Snook](http://snook.ca/), SMACSS, or Scalable and Modular Architecture for CSS, is one of a handful of working practices to promote the writing of consistent, maintainable, and understandable CSS. There might be further considerations to push towards more efficient code, however as the savings in processor time are [minimal](https://smacss.com/book/selectors) it is probably best to neglect this metric in favour of saving programmer time. SMACSS is distinguished from its competitors such as OOCSS and BEM, by its emphasis on using selector names which fall into categories determined by their type and function. Sticking to vanilla CSS, SMACSS starts from the principle of sticking to class selectors as much as possible to prescribing rules relating to, naming conventions, state changes, selector depth, and modularity.

## Sticking to Classes

We want to stick to using classes, and classes only. Classes are reusable, which is good for modularity and future-proofing, and as for styling purposes ids give us no added benefits in terms selector performance. Although this practice places an absolute premium on our naming convention, provided we are consistent and plan ahead, using classes alone should not put us at any disadvantage. 

## Naming Conventions

SMACSS splits CSS selectors into five different categories: base, layout, module, state, and theme. This is our first line of defence in maintaining a DRY stylesheet, the categories relate as follows,

  * Base rules are defaults, usually provided by something like normalize.css. These are an exception to the rule above, as they usually apply to element tag selectors.
  * Layout rules are the containers for our module rules, these relate to the spatial divisions within our page. The class selectors for these rules follow the pattern `l-<name>` e.g. `l-fixed`.
  * Module rules are the mainstay of our stylesheet. These are highly reusable parts of stylesheet, we put anything we want shared across multiple distinct elements here. There isn't such a straightforward naming convention to follow due to the frequency of use, however we do want to stick to semantically meaningful, generic, and reusable [class names](https://smacss.com/book/type-module).
  * State rules determine styling for state changes such as user interactions, selector names follow the pattern `is-<state-name>` e.g. `is-active`.
  * Theme rules can add an additional layer of styling for customisation or typography.

To elaborate a bit on terming selectors "semantically meaningful", class names should indicate how selectors relate to content on the page, and how they relate to one another. For instance indicating parent-child nesting by a shared prefix, we will cover this in more detail below. This practice both rules out using element selectors in general - although HTML5 gives us some help here - and more broadly, ensures that our class names clues us onto the function of a given selector. 

## State Changes

Naming state style rules is one thing, but applying them usefully is quite another. SMACSS doesn't so much prescribe a particular way of rendering state changes so much as putting an emphasise on using the most appropriate way of handling the state change in question in keeping with our considerations for modularity etc. For instance, if we were to represent a state change using class names we would want to ensure the code is not heavily dependent on the DOM structure: rather than target a parent container with our CSS selectors stick with a sibling selector instead.

## Selector Depth

The aim of the game is to go for as shallow a depth with as few selectors as possible. Taken together, this looks to make the styling as modular as possible: it will ultimately be very generic and be less dependent on the DOM structure. 

A good practice is to avoid duplication, for instance the following,

{% highlight css %}
  .classy-name div, .equally-classy-name div {
    /* funky styles */
  }
{% endhighlight %}

should be a cue to introduce a joint class name to target both elements. 

The added benefit of using few selectors is that we needn't make use of ids or `!important` overrides unless [absolutely necessary](http://css-tricks.com/when-using-important-is-the-right-choice/). We would simply add in another class name to get the desired styling to render, this is important when considering sub-modules below. 

## Modularity

We've pretty much touched on modularity throughout, which is not particularly surprising considering its importance in SMACSS (it's in the name!). However, we have not discussed sub-modules: when needs be, we might want to distinguish a particular module based on its location or use within the page e.g. a sidebar as opposed to a pop-up, with a common parent class selector. As before we want to keep our code as generic as possible. To do so we would use an additional class selector with a name that reflects its parent container, perhaps by using a shared prefix.

## Wrapping Up

Admittedly there is very much more to cover, such as how to make the most of preprocessors using SMACSS and some other formatting considerations. Thankfully there is very much more information on the topic, not least the [official website](https://smacss.com/) and book. I myself am very new to the practice, and am sure to return to the topic in the future.

As always, all the best,

Tom