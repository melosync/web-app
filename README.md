# Melosync Web App

[![Build Status](https://travis-ci.org/melosync/web-app.svg?branch=master)](https://travis-ci.org/melosync/web-app)

## Table of content

<!-- The section between the `toc` tags is automatically generated with `npm run readme:update` -->

<!-- toc -->

- [Quickstart (with Docker)](#quickstart-with-docker)
  * [Prerequisites](#prerequisites)
  * [Up and running](#up-and-running)
  * [Other commands](#other-commands)
    + [Shell access](#shell-access)
- [Quickstart (without Docker)](#quickstart-without-docker)
- [Deployment](#deployment)

<!-- tocstop -->

## Quickstart (with Docker)

We recommend using docker and docker-compose to make the setup easier.

### Prerequisites

- `docker` and `docker-compose`: see [https://docs.docker.com/install/overview/](https://docs.docker.com/install/overview/)

### Up and running

To start the local development server, run the following:

```sh
docker-compose up web
```

The server will be started and listen on your local port `3000`. You will be able to access it throught [http://localhost:3000/](http://localhost:3000/).

To stop all running containers, run:

```sh
docker-compose down
```

### Other commands

#### Shell access

To start a shell inside the container, run the following:

```sh
docker-compose run --rm web sh
```

You can then run commands like `npm install ...` from the container.

> The `--rm` option is used to remove the container after its execution and not have mulitple existing instances

## Quickstart (without Docker)

// TODO

## Deployment

// TODO
