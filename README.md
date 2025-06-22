# Url Shortener

This is a URL shortener API built with [Nest](https://github.com/nestjs/nest).

## Installation

### With Docker

This project is configured to run with Docker. You can use the following commands to get started:

```bash
# To build and run the containers
$ yarn compose:up

# To run the containers in watch mode
$ yarn compose:up:dev

# To stop the containers
$ yarn compose:down
```

The `docker-compose.yml` file is configured to use a PostgreSQL database. You can change the database configuration in the `.env` file.

### Without Docker

If you prefer to run the application without Docker, you will need to have Node.js and Yarn installed on your machine. You will also need to have a running instance of PostgreSQL.

First, install the dependencies:

```bash
$ yarn install
```

Then run migrations:

```bash
$ yarn typeorm:migrate
```

Then, you can run the application with the following commands:

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Running the tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Documentation

This project uses Swagger for API documentation. Once the application is running, you can access the documentation at `http://localhost:3000/openapi`.

It's also possible to download the OpenAPI specification in either **json** or **yaml** format:

- OpenAPI spec ([`json`](http://localhost:3000/openapi-json))
- OpenAPI spec ([`yaml`](http://localhost:3000/openapi-yaml))
