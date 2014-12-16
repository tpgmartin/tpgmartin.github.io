---
layout: post
comments: true
title: "Sharing your Sublime Text Configuration"
categories: ['tutorial', 'sublime text']
tags: ['configuration', 'sublime text']
permalink: "sharing-your-sublime-text-configuration"
fullview: true
 -
---

I've spent the past few days sorting out my configuration for a new macbook, one hurdle has been sorting out my Sublime development environment. Sublime text, though well lives up to its namesake, does not have the benefit of other text editors where configuration is just a [dotfile](http://dotfiles.github.io/) away.

The simplest and safest way - it may not be wise to copy plugines - to do so is to,

1. Make a copy of your current `Preferences.sublime-settings` and `Package Control.sublime-settings` both of which should be found in `Packages/User/`, and send to your new workstation,
2. From your new workstation, install `Package Control`,
3. Place the two copied files in the `User` directory.

My particular story did not end there: On an initial startup of Sublime I was greeted with alert "The package specified, Jasmine, is not available" or in other words we have a reference to a defunct package. To fix this, I deleted the named package from `Package Control.sublime-settings`.

Of course this is perhaps the most labour intensive way about it. Having searched around after the fact there are many alternatives to automate the process including [this shell script](https://github.com/miohtama/sublime-helper/).

All the best,

Tom