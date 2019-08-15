---
layout: post
comments: true
title: 'Hierarchical/Multi-level Indexing'
categories: ['data science']
tags: ['reviews', 'pandas', 'indexing']
permalink: 'hierarchical-multi-level-indexing'
fullview: true
 -
---

## Introduction

A key stage in any data analysis procedure is to split the initial dataset into more meaningful groups, which can be achieved in Pandas using the DataFrame `groupby()` method. It can be more useful still to manipulate the returned DataFrame into more meaningful groups using hierarchical (interchangeably multi-level) indices. In this blog, we will go through Pandas DataFrames indices in general, how we can customise them, and typical instances when we might use hierarchical indices. The data used in the code examples in this article come from UK population estimates provided by the [ONS](https://www.nomisweb.co.uk).


## DataFrame Indices

First things first, let's get the initial dataset we'll use for this article.

```
# Get initial DataFrame
url = 'https://www.nomisweb.co.uk/api/v01/dataset/NM_31_1.jsonstat.json'
data = jsonstat.from_url(url)
df = data.to_data_frame('geography')
df.reset_index(inplace=True)
```

The above will return a DataFrame containing a chronological record of population counts by UK region and year, as well as some basic demographic information such as sex and age group.

In general, whenever a new Pandas DataFrame is created, using for example the DataFrame constructor or reading from a file, a numerical index of integers is also created starting at zero and increasing in increments of one. By default, this is a `RangeIndex` object, as you can confirm by looking up the DataFrame's index attribute,

```
df.index
#=> RangeIndex(start=0, stop=22800, step=1)
```

Pandas also supports setting custom indices from any number of the existing columns using the `set_index()` method. By specifying the keyword argument `drop=False` we make sure to retain the column after setting our custom index. Even after specifying a custom index on a DataFrame, we still retain the original integer index so can use either as a means of filtering or selecting from the DataFrame. `DataFrame.iloc` is used for integer-based indexing, whereas `DataFrame.loc` is used for label-based indexing. Ideally an index should be a unique and meaningful identifier for each row. This is precisely why we may choose to use multi-level indexing in the first place. Given a custom index, we can revert to the standard numerical index with `DataFrame.reset_index()`. For our purposes, this doesn't make too much sense, but imagine having a collection of measurements for a set of unique datetimes: We could choose the datetime as our index.

## Groupby & Hierarchical Indices

A more typical scenario where we would come across hierarchical indices is in the case of using the `DataFrame.groupby` function. Given our DataFrame above, imagine we wanted to find the breakdown of the latest population statistics by region and sex,

```
# This line is to find the population count by sex for the most recently recorded year i.e. df.data.max()
df = df[(df.date == df.date.max()) & (df.age == 'All ages') & (df.measures == 'Value')][['geography', 'sex','Value']]

# This is just to standardise the column names
df.columns.values[0] = 'region'
df.columns.values[-1] = 'value'
```

Calling `groupby()` on this DataFrame will allow us to group by the desired categorise for our analysis, which in this case will be the region and sex. We want to find the sum total populations conditioning for region and sex,

```
df_grouped  = df.groupby(['region', 'sex']).sum()

# | region            | sex    | value      |
# | ----------------- | ------ | ---------- |
# | England and Wales | Female | 29900600.0 |
# |                   | Male   | 29215300.0 |
# |                   | Total  | 59115800.0 |
# | Northern Ireland  | Female | 955400.0   |
# |                   | Male   | 926200.0   |
# |                   | Total  | 1881600.0  |
# | Scotland          | Female | 2789300.0  |
# |                   | Male   | 2648800.0  |
# |                   | Total  | 5438100.0  |
# | Wales             | Female | 1591300.0  |
# |                   | Male   | 1547300.0  |
# |                   | Total  | 3138600.0  |
```

The index of the DataFrame `df_grouped` will be a hierarchical index, with each "region" index containing multiple "sex" indices.  We can confirm this by looking up the index attribute of `df_grouped`,

```
df_grouped.index

# => MultiIndex(levels=[['England and Wales', 'Northern Ireland', 'Scotland', 'Wales'], ['Female', 'Male', 'Total']], codes=[[0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3], [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2]],    names=['region', 'sex'])
```

We may instead want to swap the levels of the hierarchical index so that each sex index contains multiple region indices. To do this, call `swaplevel()` on the DataFrame.

```
df_grouped.swaplevel().index

# => MultiIndex(levels=[['Female', 'Male', 'Total'], ['England and Wales', 'Northern Ireland', 'Scotland', 'Wales']],
           codes=[[0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2], [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3]],
           names=['sex', 'region'])
```

For presentational purposes, it is useful to pivot one of the hierarchical indices. Pandas `unstack()` method pivots a level of the hierarchical indices, to produce a DataFrame with a new level of columns labels corresponding to the pivoted index labels. By default, `unstack()` pivots on the innermost index.

```
df_grouped.unstack('sex')

#                     | value                                |
# | sex               | Female     | Male       | Total      |
# | region            | ---------- | ---------- | ---------- |
# | England and Wales | 29900600.0 | 29215300.0 | 59115800.0 |
# | Northern Ireland  | 955400.0   | 926200.0   | 1881600.0  |
# | Scotland          | 2789300.0  | 2648800.0  | 5438100.0  |
# | Wales             | 1591300.0  | 1547300.0  | 3138600.0  |

```

The resulting DataFrame of this "unstacking" will no longer have a hierarchical index,

```
df_grouped.unstack('sex').index

#=> Index(['England and Wales', 'Northern Ireland', 'Scotland', 'Wales'], dtype='object', name='region')

```



All the best,

Tom
