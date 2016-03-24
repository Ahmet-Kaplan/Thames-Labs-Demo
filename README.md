# Current build status [![Circle CI](https://circleci.com/gh/CambridgeSoftwareLtd/RealtimeCRM.svg?style=svg&circle-token=6b8bfe9947235a21201212c7cacaaf287b6cf761)](https://circleci.com/gh/CambridgeSoftwareLtd/RealtimeCRM)

*N.B. CircleCI is currently linting ONLY - run tests locally before merging into master!*

## Setup

```
git clone https://github.com/CambridgeSoftwareLtd/RealtimeCRM.git
cd RealtimeCRM && npm install
```

## Running dev environment

In one terminal:

```
npm start
```

If you want tests, run the following in another terminal to automatically run any @dev tagged features:

```
npm run watch
```

## Full test run

*Before beginning a full test run do `meteor reset` to clear the database - this is a consequence of our tests having been designed to run in the isolated velocity mirror DB. We should fix this so they can coincide, but it hasn't been done yet*

Start a dev server with `npm start` then 

```
npm test
```

## Deploy

*Will require modulus credentials*

This will install dependencies via `npm install` then deploy to modulus.

```
npm run deploy
```
