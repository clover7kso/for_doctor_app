import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PostTop from "../screens/Post/PostTop";
import PostMany from "../screens/Post/PostMany";
import PostOne from "../screens/Post/PostOne";
import PostWrite from "../screens/Post/PostWrite";

import ProductCategory from "../screens/Product/ProductCategory";
import ProductMany from "../screens/Product/ProductMany";
import ProductOne from "../screens/Product/ProductOne";

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
        <Stack.Screen name="PostTop" component={PostTop} />
        <Stack.Screen name="PostMany" component={PostMany} />
        <Stack.Screen name="PostOne" component={PostOne} />
        <Stack.Screen name="PostWrite" component={PostWrite} />
        <Stack.Screen name="ProductCategory" component={ProductCategory} />
        <Stack.Screen name="ProductMany" component={ProductMany} />
        <Stack.Screen name="ProductOne" component={ProductOne} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
