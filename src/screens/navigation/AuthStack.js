import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Login from '../Login';
import Signup from '../Register';
import Welcome from '../Welcome';

const Stack = createStackNavigator();

export const AuthStack=()=> {
  return (
    <Stack.Navigator 
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    }}
    initialRouteName="Welcome" >
        <Stack.Screen name='Welcome' component={Welcome}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Signup} />
    </Stack.Navigator>
  );
}