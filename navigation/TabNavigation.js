import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: { height: 60 },
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconColor;
            if (route.name === "Home") {
              iconName = Platform.OS === "ios" ? "ios-home" : "md-home";
              iconColor = focused ? "#000000" : "#F3F3F3";
            } else if (route.name === "Search") {
              iconName = Platform.OS === "ios" ? "ios-calendar" : "md-calendar";
              iconColor = focused ? "#000000" : "#F3F3F3";
            } else if (route.name === "Notifications") {
              iconName = focused
                ? Platform.OS === "ios"
                  ? "ios-mail-open"
                  : "md-mail-open"
                : Platform.OS === "ios"
                ? "ios-mail"
                : "md-mail";

              iconColor = focused ? "#000000" : "#F3F3F3";
            } else if (route.name === "Profile") {
              iconName = Platform.OS === "ios" ? "ios-person" : "md-person";
              iconColor = focused ? "#000000" : "#F3F3F3";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={32} color={iconColor} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabNavigation;
