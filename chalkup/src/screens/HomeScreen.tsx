import React from "react";
import { View, Text } from "react-native";
import { styled } from "nativewind";
import { useAuth } from "../context/AuthContext";

const StyledView = styled(View);
const StyledText = styled(Text);

const HomeScreen: React.FC = () => {
    const { user } = useAuth();

    return (
        <StyledView className="flex-1 justify-center items-center bg-background">
            <StyledText className="text-2xl font-bold text-primary">
                Welcome, {user?.name}!
            </StyledText>
        </StyledView>
    );
};

export default HomeScreen;
