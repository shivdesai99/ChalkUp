import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import { login } from "../../api/auth";

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
        <View>
            <Text className="text-2xl font-bold mb-5 text-center">Login</Text>
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                className="mb-4"
                placeholder="Enter your email"
                keyboardType="email-address"
                mode="outlined"
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                className="mb-4"
                placeholder="Enter your password"
                secureTextEntry
                mode="outlined"
            />
            {error && <Text className="text-red-500 mb-4 text-center">{error}</Text>}
            {isLoading ? (
                <ActivityIndicator animating={true} />
            ) : (
                <Button mode="contained" onPress={handleLogin} className="mt-2">
                    Login
                </Button>
            )}
        </View>
    );
};

export default LoginForm;