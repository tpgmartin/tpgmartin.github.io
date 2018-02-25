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

In my [previous blog post](http://tpgmartin.com/information-retrieval-models-vector-space-model), I discussed vector space retrieval models, which ended with a discussion around the final ranking function. Although the ranking function is extremely powerful, many of the underlying assumptions seemed to be accepted simply because they worked well in practice: they were not founded on the theoretical model provided by the vector space model. By thinking about the ranking problem in a very different way, probabilistic retrieval models (PRMs) are able to offer a ranking function, built from a more satisfying theoretical foundation. More interestingly still, PRMs recover many of the features of VSMs.

Much like the previous blog post, most of this material came from my reading of ["Text Data Management and Analysis"](http://www.morganclaypoolpublishers.com/catalog_Orig/product_info.php?products_id=954) by ChengXiang Zhai and Sean Massung.

## Set-up

In a PRM, the ranking function is given by the probability that a document, `d`, is relevant, `R=1`, to a query, `q`

$$
    f\left(q, d\right) = p\left(R=1|d,q\right), R\in{0,1}
$$

Where `R=0` corresponds to a document not relevant to `q`. To find the actual probability for a given query and document, we divide the number of relevant documents for a given query by the total number of documents retrieved for a query

$$
    p\left(R=1|d,q\right) = \frac{count\left(R=1|d,q\right)}{count\left(d,q\right)}
$$

The rank of a set of documents is then given by these calculated probabilities.

In the general case, rather than have a set of generated query and document terms, we approximate the probability using what is known as the query likelihood retrieval model. This can be interpreted as the probability that a user who considers document `d` relevant would pose query `q`.

$$
    p\left(q|d,R=1\right)
$$

## Query Likelihood Retrieval Model

The relevance of a query is given by the probability given above. To calculate the probability of a query, we assume that query terms are independently sampled from a given document. This assumption of independence means that the total calculated probability for a query is the product of the portability of each query term,

$$
    p\left(q|d\right) = \frac{i}{count\left|d\right|}*\frac{j}{count\left|d\right|}
$$

for query terms `i`, `j`. This is all well and good, until we realise that the query terms might not be found in an otherwise relevant document. In other words we could end up with `p(q|d)=0` even though the document is considered relevant.

Instead of assuming the user chooses query terms from the document, instead assume the user chooses from a much large corpus, a "document language model". This doesn't change anything with our expression for the probability, `p(q|d)`, but does fundamentally change the underlying probabilities we will use for each word: we shouldn't find ourselves discounting otherwise relevant documents.

It's also important at this stage to note that the actual relevance scoring function we will be working towards will be the logarithm of the query likelihood, 

$$
    f(q,d)=\log p\left(q|d\right)=\sum_{i=1}^{N} \log p\left(w_i|d\right)=\sum_{w\in V} count\left(w,q\right)\log p\left(w|d\right)
$$

## Document Language Model Smoothing

With the expression for the score, above, we now need to estimate the document language model, that is the terms `p(w|d)`. Importantly we want to assign a nonzero probability to query words not found in document. This process of smoothing involves reducing the probability of seen query words and increasing the probability of unseen query words - as the sum of probabilities must equal one. This means that the probability of a word in a given document is proportional to either the probability of the word in the document if it is found in the document,

$$
    p\left(w|d\right) = p_{seen}\left(w|d\right)
$$

or proportional to the probability of the word in a reference word collection `C`

$$
    p\left(w|d\right) = \alpha_d p\left(w|C\right)
$$

Rewriting our equation for `f(q,d)` above (skipping a few steps), we get,

$$
    \log p\left(q|d\right) \simeq \sum_{w\in d, w \in q} count\left(w,q\right)\log \frac{p_{seen}\left(w|d\right)}{\alpha_d p\left(w|C\right)}+n\log \alpha_d
$$

"Approximately equal", because the above equation omits a sum over the probabilities of words not found in the document - this is irrelevant for ranking purposes. This is where things get interesting. As promised, the form of the equation gives us many of features we simply assumed for the VSM ranking function,

* The numerator of the left hand expression effectively acts as the TF weighting
* The denominator as the IDF weighting i.e. the more frequent the term `w` is in `C`, the more it is discounted to the final rank
* The right hand side term is effectively equivalent to document length normalisation: the longer the document, the smaller this term as smoothing is less important.

## Jelinek-Mercer smoothing

A specific example of smoothing is linear interpolation with a constant mixing coefficient or Jelinek-Mercer smoothing. In this model, we use a single coefficient to determine what non-zero probability to apply to a query word not found in a given document.

$$
    p\left(w|d\right) = \left(1-\lambda\right)\frac{count\left(w,d\right)}{\left|d\right|}+\lambda p\left(w|C\right)
$$

where the mixing coefficient, lambda is a value between zero and one, inclusive.

## Wrap-up

Given this expression for maximum likelihood estimate we can then substitute it into our expression for the ranking function above,

$$
    f\left(q,d\right)=\sum_{w\in d, w \in q} count\left(w,q\right)\log \left(1+\frac{1-\lambda}{\lambda}\frac{count\left(w,d\right)}{\left|d\right|p\left(w|C\right)}\right)
$$

The final form of the scoring function given by Jelinek-Mercer smoothing is in fact very similar to that given by a VSM, since it is a sum of all the matched query terms. As noted above, we find many of the same features of VSMs that we get for free by virtue of the features of a PRM. An alternative to Jelinek-Mercer smoothing is Dirichlet prior or Bayesian smoothing, which uses a smoothing coefficient that depends on the size of the document in question.

All the best,

Tom
