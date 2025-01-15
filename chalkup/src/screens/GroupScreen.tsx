import React, { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { styled } from "nativewind";
import MyGroupsScreen from "./MyGroupsScreen";
import JoinGroupScreen from "./JoinGroupScreen";
import { useAuth } from "../context/AuthContext";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);

const GroupScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"myGroups" | "joinGroup">("myGroups");
    const { user } = useAuth();

    return (
        <StyledSafeAreaView className="flex-1 bg-background">
            {/* Header */}
            <StyledView className="flex-row justify-between items-center p-4">
                <StyledText className="text-xl font-bold text-primary">
                    {user?.name || "User"}
                </StyledText>
            </StyledView>

            {/* Tabs */}
            <StyledView className="flex-row justify-center border-b border-gray-600">
                <StyledText
                    className={`flex-1 text-center p-2 ${
                        activeTab === "myGroups" ? "text-primary border-b-2 border-primary" : "text-textSecondary"
                    }`}
                    onPress={() => setActiveTab("myGroups")}
                >
                    My Groups
                </StyledText>
                <StyledText
                    className={`flex-1 text-center p-2 ${
                        activeTab === "joinGroup" ? "text-primary border-b-2 border-primary" : "text-textSecondary"
                    }`}
                    onPress={() => setActiveTab("joinGroup")}
                >
                    Join Group
                </StyledText>
            </StyledView>

            {/* Tab Content */}
            <StyledView className="flex-1 p-4">
                {activeTab === "myGroups" ? <MyGroupsScreen /> : <JoinGroupScreen />}
            </StyledView>
        </StyledSafeAreaView>
    );
};

export default GroupScreen;
