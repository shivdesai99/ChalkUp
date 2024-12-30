import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";

type AuthStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Home: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
            }}
        >
            {/* Define the Login screen */}
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* Define the Sign-Up screen */}
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            {/* Define the Home screen */}
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigation;