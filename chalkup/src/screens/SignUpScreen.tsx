import React from "react";
import { Alert } from "react-native";
import SignUpForm from "../components/forms/SignUpForm";
import { styled } from "nativewind";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const StyledView = styled(View);
const StyledText = styled(Text);

const SignUpScreen: React.FC = () => {
    const navigation = useNavigation();
    const { setUser, setToken } = useAuth();

    const handleSignUpSuccess = async (token: string, user: { id: number; name: string; email: string }) => {
        try {
            setToken(token);
            setUser(user);
            Alert.alert("Sign Up Successful", "Your account has been created!");
            navigation.navigate("Group" as never);
        } catch (error) {
            Alert.alert("Error", "An error occurred while saving your session. Please try again.");
        }
    };

    return (
        <StyledView className="flex-1 justify-center px-5 bg-background">
            <StyledText className="text-6xl font-bold text-center text-primary mb-8">
                ChalkUp
            </StyledText>
            <StyledView className="space-y-8">
                <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
                <StyledView className="items-center">
                    <StyledText className="text-md text-textSecondary mb-2">
                        Already have an account?
                    </StyledText>
                    <Button
                        mode="text"
                        onPress={() => navigation.navigate("Login" as never)}
                        labelStyle={{ color: "#4169E1" }}
                    >
                        Login
                    </Button>
                </StyledView>
            </StyledView>
        </StyledView>
    );
};

export default SignUpScreen;