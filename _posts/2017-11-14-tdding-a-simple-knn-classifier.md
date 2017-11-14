---
layout: post
comments: true
title: 'TDDing a Simple KNN Classifier'
categories: ['machine learning', 'tdd']
tags: ['machine learning', 'knn', 'tdd', 'from scratcgh']
permalink: 'tdding-a-simple-knn-classifier'
fullview: true
 -
---

In this blog I want to demonstrate how to implement a simple K Nearest Neighbour classifier from scratch using test-driven development (TDD). Although this is not something you would typically do day-to-day, it is a good way to fully understand how the classifier internals work albeit in a much more watered-down form. This blog takes a cue from the excellent [Google Developers "Machine Learning Recipes"](https://www.youtube.com/watch?v=cKxRvEZd3Mw&list=PLT6elRN3Aer7ncFlaCz8Zz-4B5cnsrOMt) series, but goes approaches the classifier implementation using TDD as well as generalising the prediction algorithm.

## Scikit-Learn Implementation

Our starting place will be the Scikit-Learn (abbreviated to sklearn) implementation of the KNN classifier,

{% highlight python %}
from sklearn import datasets
from sklearn.cross_validation import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

iris = datasets.load_iris()

X = iris.data
y = iris.target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=0)

clf = KNeighborsClassifier(n_neighbors=3)

clf.fit(X_train, y_train)

predictions = clf.predict(X_test)

print(accuracy_score(y_test, predictions))
{% endhighlight %}

Going from top to bottom, we,

1. Load the [iris data set](http://scikit-learn.org/stable/auto_examples/datasets/plot_iris_dataset.html) from sklearn, this is a set of 150 entries with four features, each row corresponding to one of three labels
2. Assign the input and target features to variables `X` and `y`
3. Perform a test-train split on the data set
4. Initialise the KNN classifier
5. Pass in the training data. The training data forms the reference for our test data
6. Test the classifier with the test data
7. Print out the accuracy of the classifier

This is the basic workflow we want to retain, only we will call our own classifier rather than `KNeighborsClassifier`, while keeping the same API contract. The above code sample will also act as a performance benchmark, which we will return to later on.

| Neighbours | Benchmark Accuracy |
| ---------- | ------------------ |
| 1          | 90.7%              |
| 3          | 93.3%              |
| 5          | 96%                |
| 7          | 96%                |

## Some Theory

Before we get to coding anything else, let's think about how the KNN algorithm works. Put simply, we want to predict the label for a given row in our dataset. For a given row in the test data, we compare it against each row in the training data. To do this we make the assumption that the label for our given row must be the same as the label of the *nearest* neigbouring row in the training dataset. This can be just the single nearest neigbour or the most frequently occuring label of several nearest neigbour as specified by the `n_neighbours` parameter. Nearest in this case is given by some measure of the difference between individual features in each row under consideration - the smaller this difference the closer the points are, the more likely they are to have the same label. Our distance measure will be the Euclidean distance, which is just a general form of Pythagoras' theorem:

{% highlight python %}
# Each list give feature values for row
row_1 = [ 4.6,  3.1,  1.5,  0.2 ]
row_2 = [ 5.8,  2.8,  5.1,  2.4 ]

euc_distance = ( (4.6 - 5.8) ** 2 + (3.1 - 2.8) ** 2 + (1.5 - 5.1) ** 2 + (0.2 - 2.4) ** 2 ) ** 0.5
{% endhighlight %}

For this TDD approach we will be using [pytest](https://docs.pytest.org/en/latest/). To follow along create two files in the same directory, `main.py` and `test.py`. Running `pytest test.py` from the command line should run the test suite.

## Nearest-Neighbour Implementation

In our first attempt, we will be creating a KNN classifier that only considers a single nearest neighbour, the correct label is simply the label of the single row in the training data with smallest distance to the current row in the test data under consideration. To code this implementation, we will be using the outside-in approach to TDD: we define the API interface, and code the internals from there.

Following the example of the sklearn code sample above, we want to be able to initialise the classifier with a parameter `n_neighbours`, which should default to one if not provided. Writing out our first test,

{% highlight python %}
# test.py
def test_KNN_should_be_initialised_with_n_neighbors():
    clf = KNN()

    assert clf.n_neighbors == 1
{% endhighlight %}

Running this should obviously fail. In a new file `main.py` we want to create our new class with a constructor that satisfies the requirements of the test,

{% highlight python %}
# main.py
class KNN():

    def __init__(self, n_neighbors=1):
        self.n_neighbors = n_neighbors
{% endhighlight %}

Then update the test file to import this file,

{% highlight python %}
# test.py
from main import KNN

def test_KNN_should_be_initialised_with_n_neighbors():
    clf = KNN()

    assert clf.n_neighbors == 1
{% endhighlight %}

And we should have a green test. 

We've now completed our first successful cycle of TDD, and the rest is wash and repeat. Our next test should allow us to bootstrap our classifier by calling the `fit()` method. This allows us to pass in training data and training labels, `X_train` and `y_train` respectively. To test this, we need to specify some mock data corresponding to these values in addition to calling the classifier. The mock data could be anything though so long as it is truthy - I've tried to mimick the structure of the iris data set of four features per input. The updated test file is below with the previous test case omitted for clarity.

{% highlight python %}
# test.py

# mock data
X_train = [
    [0, 0, 0, 0]
]
y_train = [0]

# ... other code ...

def test_should_be_able_to_pass_training_data_to_classifier(n_neighbors):
    clf = KNN(n_neighbors)

    clf.fit(X_train, y_train)

    assert clf.X_train == X_train
    assert clf.y_train == y_train
{% endhighlight %}

The fix for this is very simple, just create a `fit()` method for our class,

{% highlight python %}
# main.py
class KNN():

    # ... other code ...

    def fit(self, X_train, y_train):
        self.X_train = X_train
        self.y_train = y_train
{% endhighlight %}

We get to green once again. Now we come to actually prediction the label. Starting more simply this time, let's write out a single test case following the API above,

{% highlight python %}
#test.py
X_test = [[0, 0, 0, 0]]
y_test = 0

def test_predict_should_return_label_for_test_data():
    clf = KNN()

    clf.fit(X_train, y_train) # taken from the previous mock data

    predictions = clf.predict(X_test)

    assert predictions == y_test
{% endhighlight %}

In addition to the mock data previously defined, we have the test data `X_test` and `y_test`. The simple fix is to define `predict()` and return a hardcoded value

{% highlight python %}
# main.py
class KNN():

    # ... other code ...

    def predict(self, X_test):
        return 0
{% endhighlight %}

This will make the current test green, but won't help if the test data changes, which is precisely what we'll do

{% highlight python %}
#test.py
X_train = [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [2, 2, 2, 2],
    [2, 2, 2, 2],
    [2, 2, 2, 2],
    [2, 2, 2, 2]
]
y_train = [0, 1, 1, 2, 2, 2, 2]

# ... other code ...
{% endhighlight %}

I'll come to explain the precise arrangement later on, but now we have multiple contending rows. The algorithm for prediction is as follows, for a given `X_test` value,

* Initialise variables to keep track of the smallest distance and corresponding index for the row in the training data
* Then iterate through the training data
* For given row in training data find the distance between that row and `X_test`
* If newly calculated distance is smaller than current smallest distance then then update both the smallest distance and the corresponding index
* Having gone through all the training data, return the label corresponding closest index

The final piece of the puzzle is how we will calculate the distance between two rows, which as we said above with be given by the Euclidean distance. Rather than do this from scratch we will import the `distance` module from the SciPy library. Putting this all together we should get the following.

{% highlight python %}
# main.py
from scipy.spatial import distance

class KNN():

    # ... other code ...

    def predict(self, X_test):
        closest_distance = distance.euclidean(X_test, self.X_train[0])
        closest_index = 0
        for i in range(1, len(self.X_train)):
            dist = distance.euclidean(X_test, self.X_train[i])
            if dist < closest_distance:
                closest_distance = dist
                closest_index = i
        return self.y_train[closest_index]
        
{% endhighlight %}

The final step to make is to consider the case where we have multiple rows in `X_test` - we need to call the above method for each row. I'm going to skip through the steps to do this, but the key word is 'refactor': I've moved the previous implementation into its own method `__closest`. `predict` now iteratively calls this new method and returns an array of predictions corresponding to each row in `X_test`. To TDD this, simply extend `X_test` and `y_test`.

{% highlight python %}
# main.py
class KNN():

    # ... other code ...

    def predict(self, X_test):
        predictions = []
        for row in X_test:
            prediction = self.__closest(row)
            predictions.append(prediction)
        return predictions

    def __closest(self, row):
        closest_distance = distance.euclidean(X_test, self.X_train[0])
        closest_index = 0
        for i in range(1, len(self.X_train)):
            dist = distance.euclidean(X_test, self.X_train[i])
            if dist < closest_distance:
                closest_distance = dist
                closest_index = i
        return self.y_train[closest_index]
        
{% endhighlight %}

This is the complete implementation of our KNN classifier where `n_neigbors` is implicity set to one. The reported accuracy is 90.7% - matching the benchmark perfectly.

----------------------------------------------------------------------------------------------------------------------------------------------

## KNN Implementation

Now we want to generalise the classifier where `n_neighbors` is some odd number greater than or equal to one (odd to prevent ties). Having tests in place makes this process much easier as we can always backtrack if we break some functionality. Before going any further, we should add some test cases - we want to follow the philosophy of testing requirements not specific examples, or in other words a single test should run with a number of different parameters. Pytest terms this a 'parametrizing' test functions:

{% highlight python %}
# test.py
import pytest
from main import KNN

@pytest.mark.parametrize(('n_neighbors'),[1,3,5])
def test_KNN_should_be_initialised_with_n_neighbors(n_neighbors):
    clf = KNN(n_neighbors)

    assert clf.n_neighbors == n_neighbors
{% endhighlight %}

The parameters used are completely arbitrary, but will form the basis of a comparison with the benchmark later on. Running this now, we should see three separate tests execute. The same change should also be made to the `fit()` test. Updating the `predict()` test is a little different, because we want to update this function's internals as well. So far we have only considered taking the label of the single nearest row in the training data as *the* correct label - but what if we were to take the most frequently occuring label from a set of training data rows? We should see an increase in the reported accuracy.

The algorithm will be as follows,

1. For a given row in the test data, find all the distances from the rows in the training data following our distance measure
2. For this distances, find the k smallest values, where k is given by `n_neighbors`
3. For these k values, return the most common, this is the predicted label

Before we get to the implementation, we need to set up the tests. We need to parameterise both `n_neighbors` and `y_test` - the predicted label. Why's that? Well first, think about what the new algoritm does: it returns the most commonly occuring value from a set of values.

(The following two paragraphs can be skipped as they are not critical to understanding the rest of the blog, but just explain my thought process for how I structured the tests in some detail.)

What might not be clear is what that means for us given that I want to keep `X_train` and `y_train` unchanged, which are repeated below.

{% highlight python %}
X_train = [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [2, 2, 2, 2],
    [2, 2, 2, 2],
    [2, 2, 2, 2],
    [2, 2, 2, 2]
]
y_train = [0, 1, 1, 2, 2, 2, 2]
{% endhighlight %}

If we take the k smallest distances between `X_test` and the rows in `X_train`, then the might find ourselves with a tie - something I don't want to consider for the sake of simplicity. Considering odd values for `n_neighbors` only for `X_test = [[0, 0, 0, 0]]`, then if `n_neighbors = 1`, our predicted label should be `0` as this is the label of the single row with the smallest distance from `X_test`. For `n_neighbors = 3`, we should instead get a predicted label of `1`. That is because although row `[0, 0, 0, 0]` has the single smallest distance, of the three rows with the smallest distance `[[0, 0, 0, 0], [1, 1, 1, 1], [1, 1, 1, 1]]`, two of the three have the label `1`. Moving to `n_neighbors = 5` is where things get difficult, because for our `X_train` the five rows with smallest distances will have labels `[0, 1, 1, 2, 2]` leading to a tie. This is precisely what I don't want! So if I'm commited to keeping `X_train` and `y_train` constant the best thing to do is skip `n_neighbors = 5` and instead consider `n_neighbors = 7`. That is simply because for the given `X_train` and `y_Train` above, I can get an absolute majority from the labels `[0, 1, 1, 2, 2, 2, 2]`.

Puttig the above discussion altogether, for our `X_train` and `y_train`, the predicted label, `y_test` will vary for different values of `n_neighbors`. So our updated `predict()` test will look like,

{% highlight python %}
# test.py
@pytest.mark.parametrize(('n_neighbors', 'y_test'),[(1, [0]),(3, [1]), (7, [2])])
def test_predict_should_return_label_for_test_data(n_neighbors, y_test):
    clf = KNN(n_neighbors)

    clf.fit(X_train, y_train)

    predictions = clf.predict(X_test)

    assert predictions == y_test
{% endhighlight %}

Now we can break the tests! We don't need to do anything directly to `predict()` as it is just the interface. To make this easier, I want to split `__closest` into two methods, `__closest`, which will now find and return a list of the distances betweet `X_test` and the rows in `X_train`, and `__vote`, which will gind the most common values out of the smallest `n_neighbors` distances.

{% highlight python %}
# main.py
from scipy.spatial import distance
from collections import Counter

class KNN():

    # ... other code ...

    def __closest(self, row):
        distances = []
        for i in range(len(self.X_train)):
            dist = distance.euclidean(row, self.X_train[i])
            distances.append((self.y_train[i], dist))
        sorted_distances = sorted(distances, key=lambda x: x[1])
        return self.__vote(sorted_distances)

    def __vote(self, distances):
        labels = []
        for i in range(self.n_neighbors):
            labels.append(distances[i][0])
        return Counter(labels).most_common(1)[0][0]
        
{% endhighlight %}

There are few things going on the code sample worth highlighting,

* As we want to return the label, not the distance, I chose to create a tuple for each distance and the corresponding label in `y_train`. These are then appended to the list
* To make `__vote` simpler, we are passing a sorted list of tuples, sorting by the distance. There are many ways to do this, but I used a lambda function
* `__vote` should be fairly self-explanatory. To make things simpler, I'm using a `Counter` object to find the most common label from the list of labels

Using a list comprehension we can make this much cleaner,

{% highlight python %}
from collections import Counter

// ... more code ...

def __vote(self, distances):
    return Counter(x[0] for x in distances[:self.n_neighbors]).most_common(1)[0][0]
{% endhighlight %}

The full code can be found [here](https://gist.github.com/tpgmartin/a49843b3f56c8c4e48574f84deda9d2e)

## Evaluation

Putting this altogether, and rerunning the first code sample only substituting the sklearn KNN classifier for our own we obtain,

| Neighbours | Our Accuracy | Benchmark Accuracy |
| ---------- | ------------ | ------------------ |
| 1          | 90.7%        | 90.7%              |
| 3          | 93.3%        | 93.3%              |
| 5          | 96%          | 96%                |
| 7          | 96%          | 96%                |

Which is great news: we are able to obtain the same accuracy with our simple implementation. However our implemenation is several orders of magnitude slower than sklearn's. Interesting to note, but perhaps not suprising, our original implementation with `n_neighbors` hardcoded to one has a faster running time of around 80 ms.

| Neighbours | Our Running Time (ms) | Benchmark Running Time (ms) |
| ---------- | --------------------- | --------------------------- |
| 1          | 95.4                  | 0.451                       |
| 3          | 94.3                  | 0.539                       |
| 5          | 88.6                  | 0.458                       |
| 7          | 102                   | 0.465                       |

All the best,

Tom
