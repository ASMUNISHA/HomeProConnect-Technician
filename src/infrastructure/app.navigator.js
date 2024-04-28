import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
//import { HomeNavigator } from "./HomeScreen/HomeNavigator";
//import { EnquiryNavigator } from "./EnquiryScreen/EnquiryNavigator";
//import { AccountMenu } from './AccountScreen/AccountMenu';
//import { BookingMenu } from './BookingScreen/BookingMenu';
//import { EnquiryMenu } from "./EnquiryScreen/EnquiryMenu";


const AccountMenu=()=>(<Text>Account</Text>);
const BookingMenu=()=>(<Text>Booking</Text>);

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Bookings: "reader-outline",
  Enquiry: "clipboard-outline",
};

const createScreenOptions = ({route})=>{
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon:({size,color}) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator=()=>(
          <Tab.Navigator
              screenOptions={createScreenOptions}
              initialRouteName="Bookings"
              // tabBarOptions={{
              //   activeTintColor: "tomato",
              //   inactiveTintColor: "gray",
              // }}
          >
            <Tab.Screen name="Bookings" component={AccountMenu} options={{headerShown: false}} />
            <Tab.Screen name="Enquiry" component={BookingMenu} options={{headerShown: false}}/>
          </Tab.Navigator>
);