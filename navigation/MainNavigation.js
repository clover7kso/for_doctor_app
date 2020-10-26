import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CardStyleInterpolators } from "@react-navigation/stack";

import PostTop from "../screens/Post/PostTop";
import PostMany from "../screens/Post/PostMany";
import PostOne from "../screens/Post/PostOne";
import PostUpload from "../screens/Post/PostUpload";

import ProductCategory from "../screens/Product/ProductCategory";
import ProductMany from "../screens/Product/ProductMany";
import ProductOne from "../screens/Product/ProductOne";

import Profile from "../screens/Profile/Profile";
import ProfileAvatarEdit from "../screens/Profile/ProfileAvatarEdit";
import ProfileMyComment from "../screens/Profile/ProfileMyComment";
import ProfileMyLaw from "../screens/Profile/ProfileMyLaw";
import ProfileMyMarketing from "../screens/Profile/ProfileMyMarketing";
import ProfileMyPost from "../screens/Profile/ProfileMyPost";
import ProfileMyProduct from "../screens/Profile/ProfileMyProduct";
import ProfileCenter from "../screens/Profile/ProfileCenter";

import Home from "../screens/Home";
import Message from "../screens/Chat/Message";
import Rooms from "../screens/Chat/Rooms";

const Stack = createStackNavigator();

function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="Rooms" component={Rooms} />

        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ProfileAvatarEdit" component={ProfileAvatarEdit} />
        <Stack.Screen name="ProfileMyComment" component={ProfileMyComment} />
        <Stack.Screen name="ProfileMyLaw" component={ProfileMyLaw} />
        <Stack.Screen name="ProfileMyMarketing" component={ProfileMyMarketing}/>
        <Stack.Screen name="ProfileMyPost" component={ProfileMyPost} />
        <Stack.Screen name="ProfileMyProduct" component={ProfileMyProduct} />
        <Stack.Screen name="ProfileCenter" component={ProfileCenter} />

        <Stack.Screen name="PostTop" component={PostTop} />
        <Stack.Screen name="PostMany" component={PostMany} />
        <Stack.Screen name="PostOne" component={PostOne} />
        <Stack.Screen name="PostUpload" component={PostUpload} />

        <Stack.Screen name="ProductCategory" component={ProductCategory} />
        <Stack.Screen name="ProductMany" component={ProductMany} />
        <Stack.Screen name="ProductOne" component={ProductOne} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
