---
layout: post
comments: true
title: "Serving Up Hamburger Menus - or Not"
categories:
tags:
permalink: "serving-up-hamburger-menus-or-not"
fullview: true
 -
---
Hamburger menus have a problem. Best put by Luis Abreu's [post against needless use of the UI](https://lmjabreu.com/post/why-and-how-to-avoid-hamburger-menus/), hamburger menus,

1. Lazily put together too many UI elements, which means that,
2. They are less usable, which leads to,
3. Poorer user engagement.

More important still is to remember why a hamburger menu is a popular choice for dealing with navigation in the first place: We want to transplant a desktop experience to a mobile experience. This is a crucial mistake to make, and overlooks the golden rule "content is king." Jonathan Fielding took this head on in a [recent Front-end London talk](https://www.jonathanfielding.com/talks/reimagining-responsive-design/), by selectively choosing which content to prioritise for a given device. In a move towards a responsive, mobile-first web experience we are routinely required to tweak performance for efficient delivery of assets by device type. This is exactly how navigation and UI should be treated.

Instead of lumping all UI elements under the hamburger, Luis Abreu shows exactly how to keep as much up front as possible using a tab bar. This may require trimming away of some elements, or a least a tidy up a desktop navigation. Although this solution may not be entirely scalable, it at the very least allows us to engage our information architecture head-on - something that would be easily hidden by using a hamburger menu as a first step.

All the best,

Tom