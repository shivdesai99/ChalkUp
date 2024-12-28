import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { styled } from "nativewind";
import { View, Text } from "react-native";
import { login } from "../../api/auth";

const StyledView = styled(View);
const StyledText = styled(Text);

interface LoginFormProps {
    onLoginSuccess: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setError(null);
        if (!email || !password) {
            setError("Both fields are required.");
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await login(email, password); // Call the API
            onLoginSuccess(response.token);
        } catch (err: any) {
            setError(err.message || "Invalid email or password.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <StyledView className="bg-surface p-5 rounded-md shadow-medium">
            <StyledText className="text-xl font-bold mb-5 text-center text-textPrimary">
                Login
            </StyledText>
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
                    onPress={handleLogin}
                    className="mt-2"
                    buttonColor="#4169E1"
                    textColor="#FFFFF0"
                >
                    Login
                </Button>
            )}
        </StyledView>
    );
};

export default LoginForm;
