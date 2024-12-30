import React from "react";
import { ActivityIndicator, View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);

const LoadingScreen: React.FC = () => {
    return (
        <StyledView className="flex-1 justify-center items-center bg-background">
            <ActivityIndicator size="large" color="#4169E1" />
        </StyledView>
    );
};

export default LoadingScreen;