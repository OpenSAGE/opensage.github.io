# OpenSAGE website

[![Build Status](https://travis-ci.org/OpenSAGE/Website.svg?branch=master)](https://travis-ci.org/OpenSAGE/Website)

This is the website of the OpenSAGE project, based on `react-static`.

Requires recent versions of both Node.js and `yarn` to build.

## How to develop

1. Run `yarn` to install required packages.
2. Run `yarn start` to start the site in development mode. The server should start in http://localhost:3000, with automatic hot reload enabled.
3. Run `yarn build` to produce a static site, which will be placed in the `dist` folder.
4. Deploy to GitHub Pages with: TBD

The project uses Prettier for automatic source code formatting. You can install it with `yarn global add prettier` and then run it using `yarn prettier`, or easily from VS Code with the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

## Authoring a blog post

1. Create a new folder under `/posts`. The name of the folder will serve as the unique id of your post.
2. Create two new files, `index.md` (the blog post in Markdown format) and `post.json` (metadata).
   - See pre-existing blog posts for the data format.
3. Write the blog post. If you're running the website in development mode, the blog post will hot reload as you save.
4. Add images under `/public/assets/posts/$your_post_id/`.
   - This is just a convention; you can re-use images if you really want to.
   - Run `yarn thumbs` to generate thumbnails. These should not be committed to the repo, but as of now it's necessary to generate thumbnails in order to see images in your posts.

### Tips

- Do not add a top-level heading. It will be added automatically.
