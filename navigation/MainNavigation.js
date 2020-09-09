import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import Board from "../screens/Main/Board";
import BoardPost from "../screens/Main/BoardPost";
import BoardWrite from "../screens/Main/BoardWrite";


const Stack = createStackNavigator();

function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="Board" component={Board} />
        <Stack.Screen name="BoardPost" component={BoardPost} />
        <Stack.Screen name="BoardWrite" component={BoardWrite} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
