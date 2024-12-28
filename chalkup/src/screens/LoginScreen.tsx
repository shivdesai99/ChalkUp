import React from "react";
import { Alert } from "react-native";
import LoginForm from "../components/forms/LoginForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

const StyledView = styled(View);
const StyledText = styled(Text);

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
        <StyledView className="flex-1 justify-center px-5 bg-background">
            <StyledView className="space-y-8">
                <LoginForm onLoginSuccess={handleLoginSuccess} />
                <StyledView className="items-center">
                    <StyledText className="text-md text-textSecondary mb-2">
                        Don't have an account?
                    </StyledText>
                    <Button
                        mode="text"
                        onPress={() => navigation.navigate("SignUp" as never)}
                        labelStyle={{ color: "#4169E1" }}
                    >
                        Sign Up
                    </Button>
                </StyledView>
            </StyledView>
        </StyledView>
    );
};

export default LoginScreen;
