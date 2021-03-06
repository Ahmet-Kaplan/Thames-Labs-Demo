# Current build status [![Circle CI](https://circleci.com/gh/CambridgeSoftwareLtd/RealtimeCRM.svg?style=svg&circle-token=6b8bfe9947235a21201212c7cacaaf287b6cf761)](https://circleci.com/gh/CambridgeSoftwareLtd/RealtimeCRM)

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

## Unit tests

To run all tests once: `npm run unit-test`. All test results will be shown in the console.

To run all tests every time a file is changed: `npm run unit-test:browser`. Server tests will be shown in the console, client tests will be shown at http://localhost:3100/

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

## Android dev
*The Android SDK and Java JDK are required. Meteor's mobile guide: http://guide.meteor.com/mobile.html*

Make sure your device is connected via USB, has debug mode on and is on the same network then run:

```
export ANDROID_HOME="<path/of/your/sdk>"
npm run android
```
Debug by going to chrome://inspect

## IOS dev
*Requires a mac with Xcode installed.*

```
npm run ios
```

This will open Xcode where you can choose your device or emulator to run the app on.

## Mobile build
*Only required when device specific code ( e.g. java ) has been edited*

Do a meteor reset to remove conflicting local files and then build.

```
npm run buildmobile
```
### Android

Sign BOTH apk files (ARM and x86) using "realtime.keystore" ***-APK must be signed with this key or the app will not update***

Zipalign files (instructions in meteor guide)

Upload using Android Development Console.

### IOS

Open the output job in Xcode
Follow Apple's instructions: https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html
