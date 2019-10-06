# Melosync Web App

[![Build Status](https://travis-ci.org/melosync/web-app.svg?branch=master)](https://travis-ci.org/melosync/web-app)

## Table of content

<!-- The section between the `toc` tags is automatically generated with `npm run readme:update` -->

<!-- toc -->

- [Quickstart](#quickstart)
  * [Prerequisites](#prerequisites)
  * [Up and running](#up-and-running)
  * [Other commands](#other-commands)
    + [Shell access](#shell-access)
- [Deployment](#deployment)
  * [Build](#build)

<!-- tocstop -->

## Quickstart

### Prerequisites

- `Node` version 11 with `yarn`
- `Docker`

### Up and running

First of all, install the project dependencies:

```sh
yarn install
```

Then, start the development server using:

```sh
yarn start
```

The server will listen on your local port `3000`. You will now be able to access it throught [http://localhost:3000/](http://localhost:3000/).

### Other commands

#### Shell access

We provide a `Docker` image that should be used in all management operations.
This image is considered the default environment specification.

To start a shell in this environment, run the following:

```sh
docker-compose run --rm web sh
```

You can then run commands like `yarn add ...` from the container.

> The `--rm` option is used to remove the container after its execution and not have mulitple existing instances

> Most of the commands described in this file should be run using this shell access.

## Deployment

### Build

To build a production package, run the following:

```sh
# Remove the previous build
rm -rf build

# Create a new build
yarn run build
```

You can inspect that the build is correct localy using:

```sh
npx serve -s build
```

And then access the built image from [http://localhost:5000/](http://localhost:5000/).
