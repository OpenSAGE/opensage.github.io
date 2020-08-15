# OpenSAGE website

![Deploy to GitHub Pages](https://github.com/OpenSAGE/opensage.github.io/workflows/Deploy%20to%20GitHub%20Pages/badge.svg?branch=gh-pages)

This is the website of the OpenSAGE project, based on [`gatsby`](https://www.gatsbyjs.org/).

Requires recent versions of both Node.js and `yarn` to build.

## How to develop

1. Run `yarn` to install required packages.
3. Run `yarn develop` to start the site in development mode. The server should start in http://localhost:8000, with automatic hot reload enabled.
4. Run `yarn build` to generate a static site, which will be placed in `/public`. You can preview the generated site with `yarn serve` after building - the server should start in http://localhost:9000.
5. The `gh-pages` branch is automatically deployed by GitHub Actions.

The project uses Prettier for automatic source code formatting. You can install it with `yarn global add prettier` and then run it using `yarn prettier`, or easily from VS Code with the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

## Authoring a blog post

Blog posts should be placed in `/posts`. You can create a subfolder for your post if you want to (good idea if you want to include images), but single Markdown files work as well. If you're running the site in development mode, the site should reload every time you save a markdown file.

A post should start with a "front matter"; a little metadata section which is parsed by the site. It should look something like this:

```
---
slug: "unique-id-for-the-post-in-kebab-case"
title: "Top 10 ways to parse object INIs - you didn't see #5 coming!"
author: "Your name here"
date: 2025-12-24
---
```

### Tips

- Do not add a top-level heading. It will be added automatically.
