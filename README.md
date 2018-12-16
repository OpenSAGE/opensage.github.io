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
