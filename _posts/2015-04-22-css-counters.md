---
layout: post
comments: true
title: "CSS Counters"
categories: 
tags:
permalink: "css-counters"
fullview: true
 -
---
CSS counters provide a really convenient way of adding academic-style numbering to your markup, with the added advantages of being [well supported](http://caniuse.com/#search=counters) and easily expandable to an arbitrary indexing style and depth of nesting.

Provide you have some markup to get started on, you will need to specify the following properties `counter-reset`, `counter-increment`, and `content`. The first property relates to the containing element of our counters, creating a new instance for the counters. The latter two relate to how the counters are displayed on the page. For instance,

{% highlight html %}
<body>
  <!-- 'Ere be imaginary markup -->
  <section class="content-section">
    <h2 class="content-section-heading">Awesome Heading</h2>
    <p class="content-text">Awesome text</p>
    <p class="content-text">Awesomer text</p>
  </section>

  <section class="content-section">
    <h2 class="content-section-heading">Another Heading</h2>
    <p class="content-text">More text</p>
  </section>

</body>
{% endhighlight %} 

For this example, I'd like to have the elements with class "content-section-heading" numbered as "1.", "2.", and so forth, and each paragraph element with class "content-text" numbered as "1.1", "1.2" etc. where the first number corresponds to the "content-section-heading", and the second corresponds to the number of the `p` element. In the following we refer to the two numbers as "section"."sub-section",

{% highlight css %}
body {
  /* Set section counter to zero */
  counter-reset: section;
}

.content-section-heading {
  /* Set sub-section counter to zero, following each "h2.content-section-heading" */
  counter-reset: sub-section;
}

.content-section-heading:before{
  /* Render section counter to page with decimal and trailing space */
  counter-increment: section;
  content: counter(section) ". ";
}

content-text:before{
  /* Render section and sub-section counter to page with decimal and trailing space */
  counter-increment: sub-section;
  content: counter(section) "." counter(sub-section) " ";
}
{% endhighlight %} 

Altogether we should get,

{% highlight html %}
<body>
  <!-- 'Ere be imaginary markup -->
  <section class="content-section">
    <h2 class="content-section-heading">1. Awesome Heading</h2>
    <p class="content-text">1.1 Awesome text</p>
    <p class="content-text">1.2 Awesomer text</p>
  </section>

  <section class="content-section">
    <h2 class="content-section-heading">2. Another Heading</h2>
    <p class="content-text">2.1 More text</p>
  </section>

</body>
{% endhighlight %} 

CSS counters are highly [customisable](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Counters), allowing you to specify the unit to increment/decrement the counters, and the number of counters changed at any one time.

All the best,

Tom