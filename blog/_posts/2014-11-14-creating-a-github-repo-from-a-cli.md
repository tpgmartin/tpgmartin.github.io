---
layout: post
comments: true
title: "Creating a GitHub Repo from a CLI"
categories: ['tutorial', 'general']
tags: ['unix', 'github', 'command-line']
permalink: "/blog/creating-a-github-repo-from-a-cli"
fullview: true
 -
---
Having spent the past couple weeks wrestling with what to write about I've settled on this helpful tidbit. My constant need to refer to this basic workflow is some indication that (a) it's useful, and (b) I really ought to have better recall. Although there are helpful [command-line tools](https://hub.github.com/) out there that steamroll over much of what is to follow, I myself am in a bit of [Homebrew limbo](http://jcvangent.com/fixing-homebrew-os-x-10-10-yosemite/), not to mention the following is arguably more enlightening.

Aim of the game: Create a repo from a command-line interface and push the local repo to GitHub. This gives us that much more control in setting up the initial directory structure before starting out on a project. Having run a `git init` in our root directory and made our first commit we can get started.

First we need to create the GitHub repo from the command-line. To do this we use the [unix `curl`](http://curl.haxx.se/docs/manpage.html) command, which allows us to interact with the server. Following the [GitHub API](https://developer.github.com/v3/) we write,

{% highlight bash %}
  curl -u 'USER' https://api.github.com/user/repos -d '{"name":"REPO"}'
{% endhighlight %}

where we specify our GitHub username and the repo name in place of 'USER' and 'REPO' respectively. The option `-u` specifies the username (and password) to be used, and `-d` indicates a POST request. At a minimum we should specify our username and the repo name. We can easily include [more information](https://developer.github.com/v3/repos/#create) in the POST request as required. We can also specify [further authentication](https://developer.github.com/v3/#authentication) following the `-u` parameter if desired. Following exactly as above, we will be prompted to type our password after entering the `curl` command.

Now to add the remote,

{% highlight bash %}
  git remote add origin git@github.com:USER/REPO.git
{% endhighlight %}

where 'USER' and 'REPO' are our GitHub username and the new repo name, as above. This creates an alias for the URL specified, in all subsquent `push` commands we need only specify our remote with `origin`, which will be understood as the full URL.

It should be said that this step require you to already have set up an SSH key with your GitHub account, if not you can follow the steps [here](https://help.github.com/articles/generating-ssh-keys/). You can just as easily push to an HTTPS URL, which is this case would correspond to, `https://github.com/USER/REPO.git`.

And finally, we can push our new project to our remote repo,

{% highlight bash %}
  git push origin master
{% endhighlight %}

With any luck, we should have a commit in our newly minted remote repo. 

All the best,

Tom