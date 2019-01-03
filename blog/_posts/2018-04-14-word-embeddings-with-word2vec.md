---
layout: post
comments: true
title: 'Word Embeddings with Word2vec'
categories: ['word embeddings']
tags: ['word vectors', 'nlp', 'algorithms']
permalink: 'word-embeddings-with-word2vec'
fullview: true
 -
---

If you’ve read any of my previous blog posts on [information retrieval models](http://tpgmartin.com/information-retrieval-models-vector-space-model), you should have come across a reference to a "bag-of-words" model. That is where we just consider the frequency of terms in a given document as the starting point for our more elaborate models. In many cases this is perfectly acceptable simplification and can lead the very powerful applications such as the retrieval models previously discussed. But what are we losing? We no longer no the have any sense of the structure of the original document and in particular the relationship between the words.

In this blog post we will look at one of the most popular and well-known word embedding algorithms, Word2vec. Using a word embedding such as that created by the Word2vec algorithm we can learn the semantic and syntactic relationship between words in our document or set of documents (termed "corpus"). Where I would explain these terms as,

* Semantic: relating the meaning of the word
* Syntactic: relating to the spelling/structure of a word e.g. plural vs singular

We will cover the fundamental concepts behind it, how it works, and some competing algorithms.

The reading for this blog post came from a combination of ["Natural Language Processing in Action"](https://www.manning.com/books/natural-language-processing-in-action) and the original research papers by Tomas Mikolov et al.

## Fundamentals

The Word2vec model continues an established tradition of using neural networks to establish a language model. Word2vec itself is a fairly simple recurrent neural network made of,

* Input layer - words in corpus are passed in as one-hot encoded vectors
* Recurrent hidden layer - this uses a sigmoid activation function, with a number of neurons equal to the number of dimensions used to encode all the words of the vocabulary
* Output layer - this uses a sigmoid function to get a normalised probability vector from the activations of the hidden layer

The actual output value for a given run is taken to be word corresponding to the highest value in the probability vector. Once we have trained the network (see below) we can ignore the output of the network as we only care about the weights: these are what form the embeddings. In general, provided our corpus is not so specialised, we can use a pre-trained word embedding and avoid performing this step ourselves. 

A big part of Word2vec is the ability to process the relationship between words, as learned by the word-embedding, using simple linear algebra - so-called "vector oriented reasoning". Applicable to  both the semantic and syntactic relationship between words, this proceeds by way of analogy,

* Semantic: vec(king) - vec(man) + vec(woman) = vec(queen) i.e. "woman" is to "queen", as "man" is to "king"
* Syntactic: vec(apple) - vec(apples) ~= vec(banana) - vec(bananas) i.e. relate singular and plural forms

Where e.g. vec(king) is the word vector embedding given by dot product between input word vectors and weights matrix.

## Approaches

How does Word2vec actually learn the relationships between words? This algorithm takes it that these relationships emerge from the cooccurrence of words. There are two main approaches to determine this cooccurrence: the skip-gram approach and the continuous bag of words (CBOW) approach. 

Take the following sentence,

"The quick brown fox jumps over the lazy dog"

To generate training data we imagine having a small window that move across the document words. For instance, if this window is of five words width, we only consider samples of five words at a time (in the order they appear in the original document).

In the skip-gram approach, we are trying to predict the surrounding four words for a given input word - the word in the middle of our window. "Skip-gram" because we a creating n-grams that skip over words in the document e.g. want to find relationship between "The" for input "brown" ignoring "quick". The table below demonstrates what this would look like for the example sentence above. In the table headings used, w_t refers to the input word, and e.g. w_t-2 is the word two places before the input.

| Input Word w_t | Expected Output w_t-2 | Expected Output w_t-1 | Expected Output w_t+1 | Expected Output w_t+2 |
| -------------- | --------------------- | --------------------- | --------------------- | --------------------- |
| The | | | quick | brown |
| quick | | The | brown | fox |
| brown | The | quick | fox | jumps |

The skip-gram approach can be viewed as a kind of "flipped" version of CBOW approach, and vice versa. Instead of trying the predict the surrounding words for a given input word, we are trying to find the target word for the set of surrounding words. This approach is termed "continuous" bag of words, as we can imagine finding a new bag of words for a given target word as we slide the window along our document. The table below demonstrates what this would look like for the example sentence above, with the same notation as the skip-gram example.

| Input Word w_t-2 | Input Word w_t-1 | Input Word w_t+1 | Input Word w_t+2 | Expected Output w_t |
| ---------------- | ---------------- | ---------------- | ---------------- | ------------------- |
|                  |                  | quick | brown | The |
|  | The | brown | fox | quick |
| The | quick | fox | jumps | brown |


Using the network described above, we want to find the output vector of word probabilities for a given input word. This proceeds as a supervised learning task. Given the one-hot encoding of words in the corpus, each row in the weights matrix (from input to hidden layer) of our neural network is trained to represent the semantic meaning of individual words. That is, semantically similar words will have vector representations - they were originally surrounded by similar words. 

When would you choose one approach over the other? The skip-gram approach can have superior performance over CBOW for a small corpus or with rare terms. This is because skip-gram generates more examples for a given word due to the network structure. On the other hand CBOW is faster to train and can produce higher accuracies for more frequent words.

All the best,

Tom
