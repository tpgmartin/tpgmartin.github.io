---
layout: post
comments: true
title: "High Performance CSS"
categories: ['css', 'performance', 'browser']
tags: ['css', 'performance', 'browser', 'overview']
permalink: "high-performance-css"
fullview: true
 -
---
CSS performance covers a wide range of topics. We can mean anything from selector performance, property performance, architecture practices, and file size to mention a few. At times all these considerations pull in different directions, as what is most efficient for browser processing is least efficient for the developer's time. This is especially true in relation to selector performance as the most [efficiently rendered](https://css-tricks.com/efficiently-rendering-css/) selectors, ids, are least practical for the purpose of CSS architecture. For the purpose of this post, I'm going to ignore the issue of selector performance as it quite difficult to predict performance costs ahead of time, can lead to bad practices (as already mentioned), and is highly [browser dependent](http://www.stevesouders.com/blog/2009/03/10/performance-impact-of-css-selectors/). (That said, there is a point to writing [well structured](http://csswizardry.com/2011/09/writing-efficient-css-selectors/) selectors, but generally speaking this will be the place where good architectural practices step in.)

We instead want to explicitly look at the overall stylesheet size and property performance to achieve consistent, reliable, and meaningful performance gains for our stylesheets. In relation to the former, it is probably no surprise that a smaller overall file size performs better simply as there are fewer bytes to send over the intertubes. However the gains in rendering time can be [significant](http://benfrain.com/css-performance-revisited-selectors-bloat-expensive-styles/) to say the least. Sticking to a consistent CSS architecture style is the first step to creating smaller stylesheets. Further down the line, we may need to prune unused styles to reduce file size.

Property performance is not often discussed but if neglected can cause real performance problems. Costly properties are those that slow down the render tree construction most. These are properties that require the browser to perform more manipulations, repaint or reflow, in order to paint to/reorganise elements on the screen e.g. a background colour with a gradient as opposed to a plain background. For a WebKit based browser, "border-radius" and "transform" have been [shown](http://perfectionkills.com/profiling-css-for-fun-and-profit-optimization-notes/) to be some of the most expensive properties. Our overall design should be sparing with browser reflows and repaints.

The main take away: solid CSS architecture is the gift that keeps on giving, it will empower developers to maintain a DRY, semantic stylesheet, which ultimately leads to performance gains come rendering time. This topic also touches on the issue of Critical Rendering Path optimisation, which I will cover in the future.

All the best,

Tom