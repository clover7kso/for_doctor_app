import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Board from "../screens/Board/Board";
import BoardPost from "../screens/Board/BoardPost";
import BoardWrite from "../screens/Board/BoardWrite";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();

function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Board" component={Board} />
        <Stack.Screen name="BoardPost" component={BoardPost} />
        <Stack.Screen name="BoardWrite" component={BoardWrite} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
