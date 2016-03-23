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

In another terminal:

```
npm run watch
```

## Full test run

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
