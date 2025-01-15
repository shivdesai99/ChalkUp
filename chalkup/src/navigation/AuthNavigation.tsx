import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import GroupScreen from "../screens/GroupScreen";

type AuthStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Group: undefined;
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
            {/* Define the Group screen */}
            <Stack.Screen name="Group" component={GroupScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigation;