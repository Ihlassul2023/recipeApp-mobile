import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeStack from './pages/Home/HomeStack';
import AuthStack from './pages/Auth/AuthStack';
import ProfileStack from './pages/Profile/ProfileStack';
import AddMenu from './pages/Menu/AddMenu';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: (color, size) => {
            return (
              <Image
                source={require(`./assets/images/home.png`)}
                style={{width: 24, height: 24}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Menu"
        component={AddMenu}
        options={{
          headerShown: false,
          tabBarIcon: (color, size) => {
            return (
              <Image
                source={require(`./assets/images/plus-square.png`)}
                style={{width: 24, height: 24}}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: (color, size) => {
            return (
              <Image
                source={require(`./assets/images/user.png`)}
                style={{width: 24, height: 24}}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
const App = () => {
  const login = useSelector(state => state.login);
  AsyncStorage.getItem('').then(res => console.log(res));
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {login.data?.token ? (
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
