/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppProject from './src/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storages from './src/storages/store';
import React, {Component} from 'react';
import OneSignal from 'react-native-onesignal';
import {ONESIGNAL_APP_ID} from '@env';

const {store, persistor} = storages();
class App extends Component {
  async componentDidMount() {
    OneSignal.setAppId(ONESIGNAL_APP_ID);
    OneSignal.promptForPushNotificationsWithUserResponse();
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        notificationReceivedEvent.complete(notification);
      },
    );
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
    });
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppProject />
        </PersistGate>
      </Provider>
    );
  }
}

// function App() {
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <AppProject />
//       </PersistGate>
//     </Provider>
//   );
// }

AppRegistry.registerComponent(appName, () => App);
