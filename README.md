# Movies

This repository contains a mobile application made with React-Native. It allows user to know the best movies in the whole world.

## Installation :wrench:

1. Install node modules with npm.

```bash
npm install
```

Or with yarn:

```bash
yarn
```

2. Install pods.
```
cd ios
pod install
```

3. Change build system to Legacy:

- Open iOS project on xcode > File > Workspace settings... > Change Build system to "Legacy"

4. Set up .env file
```
API_BASEURL='https://api.themoviedb.org/3'
API_KEY=your key from TMDB
API_IMAGES_BASEURL='http://image.tmdb.org/t/p/w500'
```

5. Build the main.jsbundle file.
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

Do the following:
```
cd ios
fastlane sigh --adhoc
fastlane pipeline
```

### Build APK for android

TODO
