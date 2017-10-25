---
layout: post
comments: true
title: 'TensorFlow at 10,000 Feet'
categories: ['machine learning', 'tutorial']
tags: ['machine learning', 'deep learning']
permalink: 'tensorflow-at-10000-feet'
fullview: true
 -
---

TensorFlow is an opensource library maintained by Google that has become a particularly popular choice as a deep learning library. Among the reasons for its popularity,

* Python API,
* Resource management across multiple CPUs and GPUs, or even a remote server,
* A lot of other conveniences that make for quick prototyping and debugging.

In this post, I want to provide a very high-level overview of TensorFlow. We won't get to code anything meaningful, but instead focus on some of the key concepts that make this library so confusing at first blush. To my mind at least, these are,

1. What is the TensorFlow workflow?
2. How to use constants, variables and placeholders?
3. How to share scope?
4. Session Management

Hopefully this post will go some way to explaining these points and more.

## 1. TensorFlow Workflow

Fundamental to understanding how to use the library is understanding the TensorFlow workflow, which breaks into two parts,

* Construction phase: where we declare the values and operators
* Execution phase: evaluate values and operators

Key to this distinction between construction and evaluation phases, is how TensorFlow thinks about your code internally. TensorFlow represents the code written in the construction phase as a dataflow graph abstraction. Without going into too much detail, this is how TensorFlow is able to execute operations in parallel across multiple CPUs and GPUs. This graph is composed of nodes and edges, where the nodes are operators and the edges are the values declared in the construction phase. All values are implicitly treated as tensors behind the scenes, where by tensor we basically mean a nested Python list.

Aside: Bringing these concepts together we can kind of speculate the origin of the TensorFlow name, where "Tensor" refers to the basic unit of abstraction in the library and "Flow" being the flow of data through the data graph.

So up to this point, we’ve defined our values but can’t execute them - this is performed by a session. This is also where TensorFlow initialises our values defined in the construction phases as well as where it manages the hardware resources for us.

The reason to stress the distinction between construction and execution is precisely because graphs are not stateful. That is multiple sessions reusing the same graph will not share state. However, we can choose to checkpoint and restore our values, as we’ll see below. Before getting to the code samples, we need to introduce the different tensor types.

## 2. Constants, Variables and Placeholders

TensorFlow defines three main types of tensor for us: constants, placeholders, and variables. Constants define values that will not change, variables are values that can change, and placeholders are values that are assigned when we execute the graph. To make this a bit more concrete, we can relate these tensor types to a typical machine learning model. Constants for us will define hyperparameters values that are set once per model, variables will define values we want to change automatically during training like weights and biases, and placeholders are values we fed in from our dataset like our training labels.

Use of constants are the easiest to show. We simply assign constants to variable at the top, launch a session in a with statement, and evaluate the expression "a + b" using `sess.run`. We’ll be using a similar pattern in all the code samples in this session. By using a with statement to encapsulate our session, we ensure that session resources are freed up outside of the statement.

{% highlight python %}
import tensorflow as tf

a = tf.constant(1.0)
b = tf.constant(2.0)

with tf.Session() as sess:
    sess.run(a + b)
{% endhighlight %}

Moving onto placeholders, these are the access point for custom values into the session. To do this we use a feed to pass placeholders into the session. The setup is very similar to constants, but instead of setting a value we just declare the variable type.

{% highlight python %}
a = tf.placeholder(tf.float32)
b = tf.placeholder(tf.float32)

with tf.Session() as sess:
    sess.run(a + b, feed_dict={a: 1.0, b: 2.0})
{% endhighlight %}

Moving on to variables, the setup is as per constants but if we run this code sample as is,

{% highlight python %}
a = tf.Variable(1.0)
b = tf.Variable(2.0)

with tf.Session() as sess:
    result = sess.run(a + b)
#=> FailedPreconditionError (see above for traceback): Attempting to use uninitialized value
{% endhighlight %}

We get an error. This tells us we need initialise the variable. We need to initialise variables in order to set the type and shape of the variable, which remains fixed for the graph. This is similar to how Python variables will raise a NameError if declared without a value. To fix this we call an initialiser like so. The easiest approach to take for us is to call the global initializer, which will initialise all variables at once. We can also initialise targeted variables as well as we will see in the final code sample of this blog.

{% highlight python %}
a = tf.Variable(1.0)
b = tf.Variable(2.0)

with tf.Session() as sess:
    sess.run(tf.global_variables_initializer())
    sess.run(a + b)
{% endhighlight %}

## 3. Scope

Scope is important for precisely the reasons you'd expect: it allows us to namespace variables to ensure correct reuse. The code sample below gives a typical use case, the variable `a` is scoped to `my_variables`.

{% highlight python %}
with tf.variable_scope('my_variables'):
  a = tf.get_variable('a')

print(a.name) #=> my_variables/a:0
{% endhighlight %}

The 0 in the variable name isn’t anything to worry about - it is just because of how TensorFlow handles tensors behind the scenes.

## 4. Session Management

So far we’ve seen how we execute a graph within a session, but we can also use a session to save and restore variables. The following demonstrates how we can checkpoint a session,

{% highlight python %}
saver = tf.train.Saver()

with tf.Session() as sess:
	sess.run(...)

	saver.save(sess, checkpoint)
{% endhighlight %}

And we can subsequently load a previous session,

{% highlight python %}
saver = tf.train.Saver()

with tf.Session() as sess:
	saver.restore(sess, checkpoint)

	sess.run(...)
{% endhighlight %}

An example of initialising variables as well as restoring from a previous session. Session management is made use of a lot in the wild, where we can save variables after training a model, and later on load these variables before testing

{% highlight python %}
with tf.Session() as sess: 
sess.run(tf.global_variables_initializer())
saver.restore(sess, checkpoint)
{% endhighlight %}

All the best,

Tom
