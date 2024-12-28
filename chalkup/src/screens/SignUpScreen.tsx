import React from "react";
import { Alert } from "react-native";
import SignUpForm from "../components/forms/SignUpForm";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";


const StyledView = styled(View);
const StyledText = styled(Text);

const SignUpScreen: React.FC = () => {
    const navigation = useNavigation();

    const handleSignUpSuccess = () => {
        Alert.alert("Sign Up Successful", "Your account has been created!");
        navigation.navigate("Login" as never);
    };

    return (
        <StyledView className="flex-1 justify-center px-5 bg-background">
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