import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../screens/Auth/Signup";
import SignupDoctor from "../screens/Auth/SignupDoctor";
import SignupMarketer from "../screens/Auth/SignupMarketer";
import Findpw from "../screens/Auth/Findpw";
import FindpwConfirm from "../screens/Auth/FindpwConfirm";
import AuthHome from "../screens/Auth/AuthHome";
import Login from "../screens/Auth/Login";
import TakePhoto from "../screens/Auth/TakePhoto";

const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="AuthHome" component={AuthHome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Findpw" component={Findpw} />
        <Stack.Screen name="FindpwConfirm" component={FindpwConfirm} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignupDoctor" component={SignupDoctor} />
        <Stack.Screen name="SignupMarketer" component={SignupMarketer} />
        <Stack.Screen name="TakePhoto" component={TakePhoto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigation;
