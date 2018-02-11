---
layout: post
comments: true
title: 'Information Retrieval Models: Vector Space Model'
categories: ['retrieval models']
tags: ['information', 'text', 'model', 'vector']
permalink: 'information-retrieval-models-vector-space-model'
fullview: true
 -
---

In this and the following blog post I want to provide a very high-level overview of how an information retrieval model works. These models are designed to be able to find the best match to some query text from a corpus of text documents, by ranking each document by some quantitative measure of relevance. For instance, when I use a search engine, it will try to return documents that are considered most relevant for my current query. Common between all such information retrieval models, is that they assume a "bag-of-words" representation of text: any text sample is reducible to the set of words occurring in the text without regard to the grammar or word order. This also means that the query can be broken down into a linear combination of individual query words.

This particular post will discuss the vector space model (VSM) framework for interpreting queries, documents, and the similarity between them. Working from a very basic understanding, we will see how we can achieve a ranking function very close to the state-of-art [Okapi BM25 retrieval model](https://en.wikipedia.org/wiki/Okapi_BM25) by adding assumptions to our ranking function. The next post will look at probabilistic retrieval models, comparing them with VSM.

Much of this material came from my reading of ["Text Data Management and Analysis"](http://www.morganclaypoolpublishers.com/catalog_Orig/product_info.php?products_id=954) by ChengXiang Zhai and Sean Massung.

## Set-up

VSM represents all the individually occurring words in our corpus as a dimension in a vector space, such that the total number of dimensions of vector space is the total size of the corpus. This allows us to represent the query of document text as a vector given by a linear sum of the of the individual words in this vector space. We only care if a word does or doesn't appear in a query or document, so our query and document vectors only contain ones or zeros, indicating presence or absence respectively.

$$
    q=\left(x_1,...,x_N\right),
    d=\left(y_1,...,y_N\right)
$$

 Given this representation, we can then determine that the similarity is given by the "closeness" between two vectors. In 2D, [it is easy to show](https://en.wikipedia.org/wiki/Vector_space_model#/media/File:Vector_space_model.jpg) that the more similar query and document vectors have the smaller angle between them. More generally, we use the dot product operator, which becomes large and positive for near identical query and document vectors, and approaches 0 where the two vectors are completely different. The dot product is then just the sum over product

$$
    sim(q,d)=q \cdot d=\sum_{i=1}^{N} x_iy_i
$$

for query and document vectors as defined above.

## Term Frequency

What if we were to take into account the frequency with which a particular word occurred in a given document? This is the term frequency (TF). TF should give us a better sense of the relevance of a document in relation to a query. In doing this, we modify our vectors to include the frequency of each word in the vector, $count(w,q)$, $count(w,d)$ for the query and document vectors respectively. The equation for similarity above then becomes

$$
    sim(count(w,q),count(w,d))=\sum_{i=1}^{N} x_iy_i
$$

where in this case $x,y\geq0$. The rest of this blog, we will adjust $count(w,d)$ to be able to produce more meaningful rankings.

## Inverse Document Frequency

Term frequency alone may not give us the document ranking that we'd really want. It may turn out that a given query term is just very common, so just because a document contains lots of occurrences of this term is not a good gauge of that document's relevance to the query. The remedy for this is to introduce inverse document frequency (IDF). This is a global statistic, which penalises words that are frequent across documents. IDF is often given as,

$$
    IDF(w)=\log\frac{M+1}{df(w)}
$$

where $M$ is the total number of documents in the collection, $df(w)$ is "document frequency" the number of documents that contain the given term, $w$. The $1$ in the numerator is just to prevent $IDF(w)$ reducing to zero in as $df(w)$ approached $M$.

## TF Transformation

Similar to IDF, TF transformation penalises commonly occurring words. However, in this case, this penalty applies to words found in the target document only. As before, the presence of a given query term in a document is less relevant the more frequent it occurs in that document. This is often given by taking the logarithm of frequency with which a word query term occurs in a document. This is simply because logarithmic growth is very slow. The most effective transformation that is commonly used is known as BM25 TF, where we replace our naive $count(w,d)$ with $TF(w,d)$, given by the following equation,

$$
    TF(w,d)=\frac{(k+1)*count(w,d)}{count(w,d)+k}
$$

for some parameter $k\geq0$. Unlike a simple logarithmic function, $TF(w,d)$ above is bounded above by $k+1$. This is important to prevent any one term from dominating query results: a term cannot spam query responses.

## Document Length Normalization

Finally, we want our similarity rankings to be able to take into account total document length. This is important to consider as a longer document is more likely to match a query - there's simply more text that could match the query text. An effective approach is to use pivoted length normalisation, which both penalises documents that are longer than the average document length, and rewards documents that are shorter. This variable DLN is given as,

$$
    DLN=1-b+b\frac{|d|}{avdl}
$$

where, $|d|$ is the current document length, $avdl$ is the average document length in the collection, and $b$ a non-zero parameter between the values of zero and one.

## Wrap-up

Putting all of the above components together we get the following ranking function,

$$
    f(q,d)=\sum_w count(w,q)*\frac{(k+1)*count(w,d)}{count(w,d) + k\left(1-b+b\frac{|d|}{avdl}\right)}*\log\frac{M+1}{df(w)}
$$

which is in fact the ranking function for the Okapi BM25 ranking algorithm. Moving left to right we have,

* The term frequency for the query
* The term frequency for the document after applying the BM25 TF transformation
* The pivoted length normalisation
* The IDF

As as promised, we have seen step-by-step where all these components come from.

Obviously I have skipped a lot of detail for the sake of brevity, but there is still perhaps some lingering concern about some the components we've covered. Even though VSM gives a very robust and meaningful interpretation of terms in our corpus: they are vectors in a vector space, the other components seem to just be assumptions that just so happen to do well in application. This has been, [and remains to be a problem](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.97.7340&rep=rep1&type=pdf) for some researchers in this field, who continue to search for a more robust theoretical foundation of the heuristics given above. If this is you, then you'd be happy to hear that many of the features of VSM retrieval models emerge following the more mathematically robust approach taken by probabilistic retrieval models, which I'll cover next time.

All the best,

Tom
