import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BoardPostTop from "../screens/Board/BoardPostTop";
import BoardPostMany from "../screens/Board/BoardPostMany";
import BoardPostOne from "../screens/Board/BoardPostOne";
import BoardWrite from "../screens/Board/BoardWrite";

import ProductCategory from "../screens/Product/ProductCategory";

import Home from "../screens/Home";
import Message from "../screens/Message";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();

function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="BoardPostTop" component={BoardPostTop} />
        <Stack.Screen name="BoardPostMany" component={BoardPostMany} />
        <Stack.Screen name="BoardPostOne" component={BoardPostOne} />
        <Stack.Screen name="BoardWrite" component={BoardWrite} />
        <Stack.Screen name="ProductCategory" component={ProductCategory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
