# Movies

This repository contains a mobile application made with React-Native. It allows user to know the best movies in the whole world.

## Installation :wrench:

Install node modules with npm.
``` 
npm install
```
or with yarn
```
yarn 
```

Install pods.
```
cd ios
pod install
```

Build the main.jsbundle file.
```
npm run build:ios
```
or
```
npm run build:android
```
Then now you can run the app in development.
```
npm run ios
```
or
```
npm run android
```
## Building app :hammer:

### Build IPA for iOS

For building an IPA, you need: 
- Access to the certificates repository.

Before start the building process, **open iOS project on xcode > File > Workspace settings... > Change Build system to "Legacy"** and run the following:
```
cd ios
fastlane sigh --adhoc
fastlane pipeline
```

### Build APK for android

TODO

## Known issues :warning:

```shell
error Unable to resolve module `Dimensions` from `node_modules/react-native-viewport-units/viewport-units.js`: Dimensions could not be found within the project.
```
To solve this, go to the following route:
```
./node_modules/react-native-viewport-units/viewport-units.js
```
And replace the file with this
```javascript
'use strict';

var React = require('react-native')
var { Dimensions } = React; 
var { width, height } = Dimensions.get('window');

var units = {
  vw: width/100
, vh: height/100
};

units.vmin = Math.min(units.vw, units.vh);
units.vmax = Math.max(units.vw, units.vh);

module.exports = units;
```
