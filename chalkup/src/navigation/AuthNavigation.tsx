import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            {/* Define the Login screen */}
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* Define the Sign-Up screen */}
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigation;