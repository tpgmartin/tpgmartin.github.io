---
layout: post
comments: true
title: 'Shining a Light on Black Box Models with LIME'
categories: ['machine learning']
tags: ['lime', 'machine learning', 'models']
permalink: 'shining-a-light-on-black-box-models-with-lime'
fullview: true
 -
---

Machine learning models are increasingly the primary means with which we both interact with our data and draw conclusions. However, these models are typically highly complex and difficult to debug. This characteristic of machine learning models leads to them frequently referred to as "black boxes" as there is frequently very little transparency - or at least very little upfront - of how any input data links with the output the model produces. This is much more of a problem for more sophisticated models, as it is generally accepted that more sophisticated models are equally more intractable.

The [LIME](https://github.com/marcotcr/lime) project aims to address this issue. I have only recently been introduced to LIME by the course [Data Science For Business](https://university.business-science.io/p/hr201-using-machine-learning-h2o-lime-to-predict-employee-turnover) by [Matt Dancho](https://twitter.com/mdancho84), but it has definitely piqued my interests and opened up an entire area of research that I was previously unaware of. In this post, I want to go through the main motivating factors of the project and review the theory of how it works. Although the project has evolved somewhat from its inception, as I will not be going into code at this stage, the general discussion of the post should still be valid. This is a very interesting topic to me and I will want to return to it in the future, so this post should provide a strong foundation for future blog posts I will write on this topic. The best place to find out more about this is one of the original papers ["Why Should I Trust You?": Explaining the Predictions of Any Classifier](https://arxiv.org/abs/1602.04938), which I'm sure we can agree is one the best named academic papers out there.

## Why Clarity is Important

The basic way of interacting with a model is that we either directly or indirectly provide some input data and obtain some output. Especially in the case of the non-specialist, they may be no real understanding of either the link  between the input data given to a model and the output it provides, and how the one model compares to another. As a data scientist, you may be able to draw some comparison between models during the test phase of model development such as by using an accuracy metric. However such metrics have their own problems: In general they do not capture the actual metrics of interests we want to optimise for i.e. actual business metrics, and do not, on their own at least, indicate why a model's output may be less suitable than another, for instance a better performing model may more complicated to debug.

Taken together, the above points relate to issues of the trust placed upon the model. These trust issues relate to two key areas: (1) Can I trust the individual predictions made by the model? (2) Can I trust the behaviour of the model in production? To take this a bit further still, in a world increasingly aware of the practical implications of machine learning models, and especially so now that GDPR has come into action, we can no longer deny the ethical questions surrounding machine learning. It behoves use to understand how the model operates internally. A key step to resolving these issues is to grant a more intuitive understanding of the models behaviour.

As detailed in the [original paper](https://arxiv.org/abs/1602.04938), experiments show how human subjects can successfully use the library to choose better performing models and even go on to improve their performance. The key principle to this is how LIME generates local "explanations" of the model, which characterise sub-regions of the model's original parameter space.

## Unpacking "LIME"

The name LIME stands for, Local, Interpretable, Model-Agnostic, Explanations and can really be understood as the mission-statement of the package: The LIME algorithm wants to produce explanations of the predictions of any model (hence model-agnostic). Where in this case, an explanation is something that provides a qualitative understanding between an instance's components and the model's predictions. A common way to do this in LIME is to use a bar chart to indicate the individual model components the the degree to which they support or contradict the predicted class. 

Localness has another quality associated with it: the local explanations must have fidelity to the predictions obtained from the original model. That is, the explanation should match the prediction of the original model in that local reason as closely as it can. Unfortunately, this brings it into conflict with the need that these explanations be interpretable, that is, representations that are understandable to humans regardless of the underlying features. For instance, imagine a text classification task with a binary vector as output, regardless of the number of input features. By feeding more features into the model of the local explanation, we could anticipate greater accuracy with respect to the original model. However, this would add greater complexity to the final explanation as there will be that many more features contributing to the explanation. 

In other words, LIME aims to programmatically find local and understandable approximations to a model, which are as faithful to the original model as possible. Such simplified models around single observations are generally referred to as "surrogate" models in the literature: surrogate, meaning simple models created to explain a more complex model.

The gold-standard for explainable models is something which is linear and monotonic. In turn these mean,
* Linear: a model where the expected output is just a weighted sum of inputs, possible with a constant additive term,

$$
    f(x) = \sum_{i\in n} x_i + c.
$$

* Monotonic: for instance in the case of a monotonically increasing function, the output only increases with increasing input values,

$$
    f(x_j) > f(x_i) \iff x_j > x_i.
$$

This is precisely what LIME tries to do by finding linear models to model local behaviour of the target model.

In order to find these local explanations, LIME proceeds using the following algorithm,

1. Given an observation, permute it to create replicated feature data with slight value modifications. (This replica set is a set of instances sampled following a uniform distribution)
2. Compute similarity distance measure between original observation and permuted observations.
3. Apply selected machine learning model to predict outcomes of permuted data.
4. Select m number of features to best describe predicted outcomes.
5. Fit a simple model to the permuted data, explaining the complex model outcome with m features from the permuted data weighted by its similarity to the original observation .
6. Use the resulting feature weights to explain local behaviour.

(The above steps are taken from the article ("Visualizing ML Models with LIME")[http://uc-r.github.io/lime] by "UC Business Analytics R Programming Guide".)

The main benefit of this approach is its robustness: local explanations will still be locally faithful even for globally nonlinear models. The output of this algorithm is what is referred to as an "explanation" matrix, which has rows equal to the number of instances sampled, and columns for each feature. This matrix is required in the next step to characterise the global behaviour of a model.

## Going Global

What about global understanding of the model? To achieve this, LIME picks a set of non-redundant instances derived from the instances sampled in the previous step, following an algorithm termed "submodular pick" or SP-LIME for short. 

Once we have the explanation matrix from the previous step above, we need to derive the feature importance vector. The components of this vector give the global importance of the each of the features from the explanation matrix. The precise feature mapping the explanation matrix to the importance vector depends on the the model under investigation, but in all cases should return higher values for features that explain more instances.

Finally, SP-LIME only wants to find the minimal set of instances, such that there is no redundancy in the finally returned set of instances.
Non-redundant, meaning in this case that the set of local explanations found should cover the maximum number of model features with little, if any, overlap amongst the features each individual local explanation relates to. The minimal set is chosen by a greedy approach that must satisfy a constraint that relates to the number of instances a human subject is willing to review.

In other words, the approach taken by LIME is to provide a sufficient number of local explanations to explain the distinct behavioural regions of the model. This sacrifices global fidelity of explanations in favour of local fidelity. As discussed in the original paper, this leads to better results in testing with both simulated and human users. In general though, while global interpretability can be approximate or based on average values, local interpretability can be more accurate than global explanations.

## Closing Remarks

I want to return to LIME and the wider topic of machine learning interpretability in future blog posts, including how this works with H2O as well as being able to provide a more in-depth technical run-through of the library.

All the best,

Tom
