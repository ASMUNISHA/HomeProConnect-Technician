import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {AppStack} from './src/screens/navigation/AppStack';
import {AuthStack} from './src/screens/navigation/AuthStack';
import Navigation from './src/services/Navigation';
import Authentication from './src/services/Authentication';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './src/Redux/Reducer/user';



const Stack = createStackNavigator();

export default function App() {

  const dispatch = useDispatch();

  const { userData, login } = useSelector(state => state.User);
  
  const [loginChk, setloginChk] = useState(true);


  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
     let data = await Authentication.getAccount();
     if (data != null) {
        dispatch(setUser(data));
        setloginChk(false)
     }else{
        setloginChk(false)
     }
  }

  if (loginChk) {
    return null;
  }

  return (
      <NavigationContainer ref={r => Navigation.setTopLevelNavigator(r)}>
        <Stack.Navigator
          detachInactiveScreens={false}
          initialRouteName="Auth"
          screenOptions={{
            headerShown:false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          {!login ?  
          <Stack.Screen name="AuthStack" component={AuthStack} /> :
          <Stack.Screen name="AppStack" component={AppStack} /> }
        </Stack.Navigator>
      </NavigationContainer>
  );
}