This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

# Info
## React-native: 0.74


## Step 1: Install the project:
### For Android and iOS

```bash
npm install
```
### For iOS only 

```bash
bundle install
npx pod-install
```

## Step 2: Run the project
### For Android (Android Studio emulator open, check all conditions are met on it)

```bash
npm run android
```

### For iOS
```bash
npx react-native run-ios --simulator="<emulator_name>"
```

If everything is set up _correctly_, you should be running the app.
This is one way to run your app — you can also run it from Xcode directly.


## Congratulations! :tada:

You've successfully run and modified this React Native App.

## Libraries installed/used and for what purpose:

### FS
Reddit Posts image caching (download locally for better performance but especially for offline usage).

### NetInfo
Detect connection changes for several logic conditions (offline mode).

### Navigation/native, native-stack
Navigation and stack screen creation.

### Redux: toolkit, persist andthunk
Global state management for caching mechanism (calls for each category only after, at least, 2 minutes since last category fetch. Also, data persisted for offline usage).\
Easier redux store creation and management.\
Persist store between app sessions.\
Handle asynchronous actions and following side-effects (api calls in this case especially).\

### AsyncStorage
Persistor storage method.\
Used to store webview pages for offline usage (downloaded on PostDetail screen mount)

### Axios
API requests

### Date-fns
Date formatting

### Toast-message
For user information when needed

### Webview
Display posts directly on web, online and offline

## Notes:
 Continuous scrolling/fetching was implemented but had no more time to fix a looping bug, probably threshold related or overall logic, so its commented out.\ For Monitoring and production trouble shooting, a FakeAmplitudeService and a FakeSentryService were created, as a demo to how they would be implemented and used. FakeSentryService also as a custom "Wrap" function to have the app inside the error boundary of Sentry, as in a normal implementation.

