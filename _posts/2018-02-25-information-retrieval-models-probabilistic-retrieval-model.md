---
layout: post
comments: true
title: 'Information Retrieval Models: Probabilistic Retrieval Model'
categories: ['retrieval models']
tags: ['information', 'text', 'model', 'probabilistic']
permalink: 'information-retrieval-models-probabilistic-retrieval-model'
fullview: true
 -
---

In my [previous blog post](http://tpgmartin.com/information-retrieval-models-vector-space-model), I discussed vector space retrieval models, which ended with a discussion around the final ranking function. Although though the function is extremely powerful, many of the underlying assumptions seemed to be accepted simply because they worked well in practice: they were not founded on the theoretical model provided by the vector space model. By thinking about the ranking problem in a very different way, probabilistic retrieval models (PRMs) are able to offer a ranking function, built from a more satisfying theoretical foundation.

Much like the previous blog post, most of this material came from my reading of ["Text Data Management and Analysis"](http://www.morganclaypoolpublishers.com/catalog_Orig/product_info.php?products_id=954) by ChengXiang Zhai and Sean Massung.

## Set-up

In a PRM, the ranking function is given by the probability a document, `d`, is relevant, `R=1`, to a query, `q`

$$
    f\left(q, d\right) = p\left(R=1|d,q\right), R\in{0,1}
$$

Where `R=0` corresponds to a document not relevant to `q`. To find the actual probability for a given query and document, we divide the number of relevant documents for a given query by the total number of documents retrieved for a query

$$
    p\left(R=1|d,q\right) = \frac{count\left(R=1|d,q\right)}{count\left(d,q\right)}
$$

NEED TO LINK query likelihood to scoring function

… something something query likelihood … 

We also have a problem which we have no real parallel for in VSMs: if a query word is not found in a document then, p(R|d,q) becomes zero as we multiply this out to find the total probability for the given document. This is ok in the case of a irrelevant document `R=0`, but in general this is bad news for us, as we will unfairly penalize documents simply by our choice of query terms.

## Query Likelihood Retrieval Model

The relevance of a query is given by the probability of a query for a given document. To calculate the portability of a query, we assume that query terms are independently sampled from a given document. This assumption of independence means that the total calculated probability for a query is the product of the portability of each query term,

$$
    p\left(q|d\right) = \frac{i}{count\left|d\right|}*\frac{j}{count\left|d\right|}
$$

for query terms `i`, `j`. This is all well and good, until we realise that the query terms might not be found in an otherwise relevant document. In other words we could end up with `p(q|d)=0` even though the document is considered relevant.

Instead of assuming the user chooses query terms from the document, lets say the user chooses from a much large corpus, a "document language model". This doesn't change anything with our expression for the probability, `p(q|d)`, but does fundamentally change the underlying probabilities we will use for each word.

It's also important at this stage to note that the actual relevance scoring function we will be working towards will be the logarithm of the query likelihood, 

$$
    score(q,d)=\log p\left(q|d\right)=\sum_{i=1}^{N} \log p\left(w_i|d\right)=\sum_{w\in V} count\left(w.q\right)\log p\left(w|d\right)
$$

## Document Language Model Smoothing

With the expression for the score, above, we now need to estimate the document language model, that is the terms `p(w|d)`. Importantly we want to assign a nonzero probability to query words not found in document. This process of smoothing involves reducing the probability of seen query words and increasing the probability of unseen query words - as the sum of probabilities must equal one. This means that the probability of a word in a given document is proportional to either the probability of the word in the document if it is found in the document, or proportional to the probability of the word in a reference word collection.

Rewrite our equation for query likelihood retrieval formula fig 6.24

This is where things get interesting. As promised, the form of the equation gives us many of features we simply assumed for the VSM ranking function.

## Jelinek-Mercer smoothing

An example smoothing method is linear interpolation with a constant mixing coefficient or Jelinek-Mercer smoothing. In this model, we use a single coefficient to determine what non-zero probability to apply to a query word not found in a given document.

$$
    p\left(w|d\right) = \left(1-\lambda\right)\frac{count\left(w,d\right)}{\left|d\right|}+\lambda p\left(w|C\right)
$$

where the mixing coefficient, lambda is a value between zero and one, inclusive.

Can then substitute this expression for MLE into our expression for the ranking function above...

## Wrap-up

All the best,

Tom
