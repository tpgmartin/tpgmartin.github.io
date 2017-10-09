---
layout: post
comments: true
title: 'Pandas for Fun and Profit'
categories: ['data science', 'tutorial']
tags: ['datascience', 'numpy', 'pandas', 'python']
permalink: 'pandas-for-fun-and-profit'
fullview: true
 -
---

[Pandas](http://pandas.pydata.org/) is a powerful Python library for data analyis. Pandas is not the sole choice within the Python data analysis ecosystem, with a notable example being Numpy. However, Numpy is not very well suited for handling large tabular datasets of mixed types. Pandas itself is built on top of Numpy, so still has the conveniences of Numpy with added abilities. In this blog post, I want to review some of the key concepts that set Pandas apart from Numpy.

The mainstay of an Pandas program is a data structure known as a DataFrame. A DataFrame can be thought of as essentially a list of lists, but unlike a regular Numpy array a Pandas DataFrame can  

1. Contain multiple data types,
2. Support non-numeric indices,
3. And handles missing values better.

The remainder of this post will look at each of these in turn.

For the purpose of illustration, we will be using a the ["Daily Show Guests" dataset](https://github.com/fivethirtyeight/data/tree/33b01e4a37911fff33f1e8afa9bc01a8d3698d8b/daily-show-guests) from the FiveThirtyEigth repo. We can create a DataFrame by reading in the CSV file,

{% highlight python %}
import pandas as pd

daily_show_guests = pd.read_csv('daily_show_guests.csv')
{% endhighlight %}

DataFrames themselves are made up of another Pandas object known as Series objects, which is how Pandas represents the individual columns in a DataFrame. Series objects themselves are wrappers around Numpy arrays. Querying a DataFrame object by column name will return a Series object.

## 1. Multiple Data Types

One of the biggest differences from Numpy arrays is that Pandas Dataframes can contain different data types across different columns. Reading in the CSV file as above simply wouldn’t have been possible with Numpy. It is easy to verify the types by named column with the dataframe we created,

{% highlight python %}
daily_show_guests.dtypes
# Returns the following:
# YEAR                         int64
# GoogleKnowlege_Occupation    object
# Show                         object
# Group                        object
# Raw_Guest_List               object
# dtype: object
{% endhighlight %}

The above response might initially be confusing if you look at the CSV file, and highlights a subtlety we face when using Pandas. For instance, why do entries of the "Group" column have an `object` type? This is a consequence of Pandas dependency on Numpy: these `object` types are in fact Numpy objects and this is how Pandas represents strings of arbitrary length, rather than use Python strings.

As we will see in section 3, being able to support mutiple types has important consequences for how we can handle "missing values".

## 2. Custom Indices

Given a DataFrame, we might want to use something other than the default integer index to make intuitive selections on the initial DataFrame. We do this using the `set_index` method,

{% highlight python %}
# Check initial index
daily_show_guests.index #=> Returns RangeIndex(start=0, stop=2693, step=1)

daily_show_guests = daily_show_guests.set_index(keys='Show', drop=False)
# Check custom index
daily_show_guests.index #=> Returns
# Index(['1/11/99', '1/12/99', '1/13/99', '1/14/99', '1/18/99', '1/19/99',
#       '1/20/99', '1/21/99', '1/25/99', '1/26/99',
#       ...
#       '7/21/15', '7/22/15', '7/23/15', '7/27/15', '7/28/15', '7/29/15',
#       '7/30/15', '8/3/15', '8/4/15', '8/5/15'],
#      dtype='object', name='Show', length=2693)
{% endhighlight %}

We specifiy the `drop=False` attribute, as we don't want to delete the "Show" column after setting our custom index.

Even after sepcifying a custom index on a DataFrame, we still retain the original integer index so can use any either as a means of filtering. Either way, we have three ways of filtering a DataFrame by rows or columns

* DataFrame.iloc - integer based indexing
* DataFrame.loc - label based indexing
* Python slice range

{% highlight python %}
# Equivalent filtering methods
daily_show_guests.iloc[0:10]
daily_show_guests.loc["1/11/99":"1/26/99"]
daily_show_guests["1/11/99":"1/26/99"]
{% endhighlight %}

## 3. Handling Missing Values

Firstly, what exactly do we mean by a "missing value"? Put simply, a missing value is any value that is not present in the data. Seems easy, right? However, in the Python programming language a missing value can be represented by either a `None` object type value or `nan` float. This means that conceivably a missing value can be mapped to two distinct types, which may have all kinds of unintended consequences if we’re not careful. To take an example from [this excellent blog post](https://www.oreilly.com/learning/handling-missing-data) on the topic,

{% highlight python %}
np.array([1, None, 3, 4]).sum() #=> Returns TypeError

np.array([1, np.nan, 3, 4]).sum() #=> Returns nan
{% endhighlight %}

Instead of dealing with this messiness we can instead rely on Pandas to handle our missing values. Pandas treats `None` and `nan` interchangeably, and performs the necessary type casting behind the scenes, all we have to do is decide on some identifier for missing values. In the "Daily Show Guests" dataset, the string "NA" is used to mark missing values.

Pandas also gives us a set of methods we can call on our Series or DataFrame objects to deal with missing values. For example if we want to find rows with missing values we can call `isnull()` on the DataFrame, and then drop the rows with missing values.

{% highlight python %}
daily_show_guests.isnull().values.any() #=> Returns True

good_results = daily_show_guests.dropna()
good_results.isnull().values.any() #=> Returns False
{% endhighlight %}

Although this means we’re losing data, this might be acceptable if we're just interested in high-level correlations. If we want to be more careful we could replace missing values with something else using the `fillna()` method.

All the best,

Tom
