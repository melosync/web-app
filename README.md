# Melosync Web App

[![Build Status](https://travis-ci.org/melosync/web-app.svg?branch=master)](https://travis-ci.org/melosync/web-app)
[![Heroku](https://heroku-badge.herokuapp.com/?app=melosync)](https://melosync.herokuapp.com)

## Table of content

<!-- The section between the `toc` tags is automatically generated with `npm run readme:update` -->

<!-- toc -->

- [Quickstart](#quickstart)
  * [Prerequisites](#prerequisites)
  * [Up and running](#up-and-running)
  * [Other commands](#other-commands)
    + [Linter](#linter)
    + [Generate translation files from code](#generate-translation-files-from-code)
- [Deployment](#deployment)
  * [Build](#build)
  * [Continuous Deployment](#continuous-deployment)

<!-- tocstop -->

## Quickstart

### Prerequisites

- `Node` version 11 (with npm)

### Up and running

First of all, install the project dependencies:

```sh
npm install
```

Then, start the development server using:

```sh
npm start
```

The server will listen on your local port `3000`. You will now be able to access it throught [http://localhost:3000/](http://localhost:3000/).

### Other commands

#### Linter

Every Pull Request will test that your code is correctly formatted and follows our coding standards using [eslint](https://eslint.org).

You can run the linter locally using the command:

```sh
npm run lint
```

We also provide a command to automatically re-format your files:

```sh
npm run lint:fix
```

#### Generate translation files from code

To automatically update the translation files from the code, run the following:

```sh
npm run i18next:extract
```

You can then see the changes in the [translation folder](https://github.com/melosync/web-app/tree/master/public/locales):

```
web-app
|- public
|  |- locales
|  |  |- en
|  |  |  |- translation.json
|  |  |- fr
|  |     |- translation.json
|  |- ...
|- ...
```

## Deployment

### Build

To build a production package, run the following:

```sh
npm run build
```

You can inspect that the build is correct localy using:

```sh
npm run serve
```

And then access the built image from [http://localhost:5000/](http://localhost:5000/).

### Continuous Deployment

We use [Heroku](https://www.heroku.com)'s integration with GiitHub to provide continuous deployment of the codebase. Every merge on the `master` will trigger a new build and deploy the new release.

This environment is accessible here: https://melosync.herokuapp.com
