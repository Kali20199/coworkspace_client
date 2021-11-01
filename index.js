/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification'


PushNotification.configure({
  
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
    requestPermissions: Platform.OS === 'ios'
}),

AppRegistry.registerComponent(appName, () => App);
