import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface GroupCardProps {
    groupName: string;
    memberCount: number;
    onPress: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ groupName, memberCount, onPress }) => {
    return (
        <StyledTouchableOpacity
            onPress={onPress}
            className="p-4 bg-surface rounded-md shadow-medium mb-4"
        >
            <StyledText className="text-lg text-primary font-bold">{groupName}</StyledText>
            <StyledText className="text-md text-textSecondary">{memberCount} members</StyledText>
        </StyledTouchableOpacity>
    );
};

export default GroupCard;
