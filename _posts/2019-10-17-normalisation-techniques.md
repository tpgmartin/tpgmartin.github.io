---
layout: post
comments: true
title: 'Normalisation Techniques'
categories: ['data science']
tags: ['data preprocessing', 'data cleaning']
permalink: 'normalisation-techniques'
fullview: true
 -
---

## Introduction

Feature normalisation is a key step in preprocessing data, either before or as part of the training process. In this blog post, I want to discuss the motivation behind normalisation and summaries some of the key techniques used. Most of the material from the blog is based on my reading of Google's excellent ["Data Preparation and Feature Engineering in ML"](https://developers.google.com/machine-learning/data-prep) course.

This particular blog post fits into the wider topic of feature engineering or data transformation as a whole, which relates to other techniques such as bucketing and embedding as well. For the purpose of this blog post I will be conflating techniques which may otherwise be considered separately as standardisation and normalisation proper. The typical distinction between the two [is detailed here](https://stats.stackexchange.com/questions/10289/whats-the-difference-between-normalization-and-standardization).

The techniques to be considered are,

* Scaling (to a range)
* Feature clipping
* Log scaling
* Z-score

In all cases, it is important to visualise your data and explore the summary statistics to ensure the transformation applied is appropriate for the dataset considered.

## Why Transform your Data?

In this blog post, we will only consider transformation of numerical features. In this case, the motivation behind normalisation is to ensure the values of a given feature are on a comparable scale. This is to ensure the data quality, and relatedly, better model performance and an accelerated training process. This may be required even in the case of certain gradient optimisers, which can handle the unnormalised data across different features, cannot necessarily handle a wide range of values for a single feature. The data transformation itself can either happen before training or within the model itself. The main tradeoff being that the former is performed in batch whereas the latter is performed per iteration. Deciding between these two approaches will also depend as to whether the model lives online or offline.

## Scaling

This is simply mapping from the given numeric range of a feature to a standard range, typically between zero and one, inclusive. Achieve this by transforming using min-max scaling,

$$
    x'=\frac{x-x_min}{x_max-x_min}.
$$

This transformation is particularly appropriate if the upper and lower bounds of the data are known, with few or no outliers, and the data is uniformly distributed.

## Feature Clipping

Set all feature above or below a certain threshold to a chosen fixed value. This threshold (or thresholds) is an arbitrary number, in some cases it is taken to be a multiple of the standard deviation. May apply feature clipping before or after other normalisations, which is useful in the case of other transformations that assume there to be few outliers.

## Log Scaling

This is appropriate when the distribution of datapoints follow a [power law distribution](https://en.wikipedia.org/wiki/Power_law#Power-law_probability_distributions). This transformation aids in applying linear modeling to the dataset. The base of the log is, generally speaking, not that important to the overall transformation.

## Z-Score

Transform feature value in terms of the number of standard deviations away from the mean. The transformed distribution will have a mean of zero and standard deviation of one. It is desirable, but not necessary, that the feature values contain few outliers.

$$
    x'=\frac{x-\mu}{\sigma}
$$

All the best,

Tom
