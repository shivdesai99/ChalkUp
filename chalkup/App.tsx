import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { GroupProvider } from "./src/context/GroupContext";
import LoadingScreen from "./src/screens/LoadingScreen";

const AppContent: React.FC = () => {
    const { loading, user } = useAuth();

    if (loading) {
        return <LoadingScreen />;
    }

    if (user) {
        return (
            <GroupProvider>
                <AuthNavigation />
            </GroupProvider>
        );
    }

    return <AuthNavigation />;
};

export default function App() {
    return (
        <AuthProvider>
            <PaperProvider>
                <NavigationContainer>
                    <AppContent />
                </NavigationContainer>
                <StatusBar style="auto" />
            </PaperProvider>
        </AuthProvider>
    );
}
