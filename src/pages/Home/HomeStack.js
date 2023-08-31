import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import NewMenu from './NewMenu';
import PopularMenu from './PopularMenu';
import DetailMenu from './DetailMenu';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewMenu"
        component={NewMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PopularMenu"
        component={PopularMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailMenu"
        component={DetailMenu}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
