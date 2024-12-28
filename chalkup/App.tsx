import React from "react";
import { Provider as PaperProvider } from "react-native-paper"; // Provides theming and components for React Native Paper.
import { NavigationContainer } from "@react-navigation/native"; // Wraps the app with navigation capabilities.
import AuthNavigation from "./src/navigation/AuthNavigation"; // Handles navigation for authentication screens.
import { StatusBar } from "expo-status-bar"; // Provides a consistent status bar across platforms.

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        {/* AuthNavigation manages routes like LoginScreen and SignUpScreen */}
        <AuthNavigation />
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}