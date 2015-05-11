---
layout: post
comments: true
title: "CSS Percentage Margin/Padding Properties"
categories: ['CSS']
tags: ['margin', 'padding', 'specification']
permalink: "css-percentage-margin-padding-properties"
fullview: true
 -
---
Definitely a candidate for one of my more recent WTF moments. I recently discovered, and subsequently had to work around, the [following](http://www.w3.org/TR/CSS2/box.html#margin-properties) CSS behaviour: `margin/padding-top/bottom` percentages are calculated by reference to the **width** of the containing block, not the height.

This is at the very least slightly confusion especially as CSS enables you to calculate `top`/`bottom` with respect to `height` as expected. I've not found an especially  clear explanation for this, however [most opinions](http://stackoverflow.com/questions/11003911/why-are-margin-padding-percentages-in-css-always-calculated-against-width) converge on the following, 

* We tend to set/deal with widths, not heights explicitly, 
* It makes rendering that much easier for "horizontal flow," as discussed [here](http://dev.w3.org/csswg/css-box-3/#the-margin-properties),
* There has to be some shared reference between `margin-top`, `margin-left` etc. as setting `margin:5%` is a thing.

The end result being that setting resizeable aspect ratios are a breeze as we have constant referring to the width of the element in question. Others, much braver than myself, have looked in to how to [explicitly set](http://stackoverflow.com/questions/4982480/how-to-set-the-margin-or-padding-as-percentage-of-height-or-parent-container) something equivalent to `top/bottom-margin`. However, I would advise against this as it exploits the quirks of the CSS specification, which is never a good place to be.

All the best,

Tom