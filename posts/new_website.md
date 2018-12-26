---
slug: "new-website"
title: "We have a new website!"
author: "Paavo Huhtala"
date: "2018-12-26"
---

As you've probably noticed from reading this, we now have a website. The goal is to gather information about the project in a more end user friendly format & style than the [GitHub page](https://github.com/OpenSAGE/OpenSAGE), and to have a place where we can publish (hopefully!) regular development updates about the project. Previous blog posts about OpenSAGE were published on [Tim's blog](http://timjones.io/), and they have been imported to this blog too - you can find them from [the archive](/blog).

This website came to be when we decided we want to do a "A year in review" -style blog post about the things we've built this past year. I voluntereed to write that post, but I couldn't decide where I'd want to publish it. One thing lead to another, and as a typical example of yak shaving I ultimately ended up creating an entirely new website for the project.

## About the implementation

I wrote the first version of this site using [`react-static`](https://github.com/nozzle/react-static), a [React](https://reactjs.org/)-based static site generator. While I managed to build most of the site in just a few days, there were a number of issues with the generator (mainly that the "static" portion of it didn't work at all) that ultimately made me switch to [Gatsby](https://www.gatsbyjs.org/), an another React-based static site generator with a bigger userbase and larger ecosystem. Because both generators are based on React and their approach to static site generation is almost identical, the initial port took me just about 30 minutes, and not too many code changes.

From the visitor point of view it's a static website (meaning there's no backend or database) hosted on GitHub Pages consisting of just plain old HTML and CSS. The framework also supports progressive enhancement via JavaScript - if JS is available, the site automatically prefetches linked pages while you read, so page transitions are near-instantaneous and don't require a full reload.

The site itself consists of standard React components and blog posts written in Markdown. When running the site in development mode everything from stylesheets to screenshots is hotloaded within a second when source files change, which provides quite a nice development / blog post authoring experience.

You can find the source code of this website (including this blog post!) on [GitHub](https://github.com/OpenSAGE/opensage.github.io/tree/gh-pages).