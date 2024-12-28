import React from "react";
import { View, Text, Alert } from "react-native";
import LoginForm from "../components/forms/LoginForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const LoginScreen: React.FC = () => {
    const navigation = useNavigation();

    const handleLoginSuccess = async (token: string) => {
        try {
            await AsyncStorage.setItem("authToken", token);
            Alert.alert("Login Successful", "You have successfully logged in!");
            navigation.navigate("Home" as never);
        } catch (error) {
            Alert.alert("Error", "An error occurred while saving your session. Please try again.");
        }
    };

    return (
        <View className="flex-1 justify-center px-2 bg-gray-100">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            <View className="mt-4 items-center">
                <Text className="text-lg mb-2">Don't have an account?</Text>
                <Button
                    mode="text"
                    onPress={() => navigation.navigate("SignUp" as never)}
                >
                    Sign Up
                </Button>
            </View>
        </View>
    );
};

export default LoginScreen;