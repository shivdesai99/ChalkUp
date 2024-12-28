import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { styled } from "nativewind";
import { View, Text } from "react-native";
import { register } from "../../api/auth";

const StyledView = styled(View);
const StyledText = styled(Text);

interface SignUpFormProps {
    onSignUpSuccess: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUpSuccess }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        setError(null);

        if (!name || !email || !password) {
            setError("All fields are required.");
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setIsLoading(true);
        try {
            await register(email, password, name); // Call the register API
            onSignUpSuccess();
        } catch (err: any) {
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <StyledView className="bg-surface p-5 rounded-md shadow-medium">
            <StyledText className="text-xl font-bold mb-5 text-center text-textPrimary">
                Sign Up
            </StyledText>
            <TextInput
                label="Name"
                value={name}
                onChangeText={setName}
                className="mb-4"
                placeholder="Enter your name"
                theme={{ colors: { text: "#FFFFF0", primary: "#4169E1" } }}
            />
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                className="mb-4"
                placeholder="Enter your email"
                keyboardType="email-address"
                theme={{ colors: { text: "#FFFFF0", primary: "#4169E1" } }}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                className="mb-4"
                placeholder="Enter your password"
                secureTextEntry
                theme={{ colors: { text: "#FFFFF0", primary: "#4169E1" } }}
            />
            {error && (
                <StyledText className="text-red-500 mb-4 text-center">{error}</StyledText>
            )}
            {isLoading ? (
                <ActivityIndicator animating={true} color="#4169E1" />
            ) : (
                <Button
                    mode="contained"
                    onPress={handleSignUp}
                    className="mt-2"
                    buttonColor="#4169E1"
                    textColor="#FFFFF0"
                >
                    Sign Up
                </Button>
            )}
        </StyledView>
    );
};

export default SignUpForm;