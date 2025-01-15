import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { styled } from "nativewind";
import { useGroup } from "../context/GroupContext";
import GroupCard from "../components/ui/GroupCard";

const StyledView = styled(View);
const StyledText = styled(Text);

const MyGroupsScreen: React.FC = () => {
    const { myGroups, loading } = useGroup();

    return (
        <StyledView className="flex-1 bg-background p-4">
            {loading ? (
                <StyledView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#4169E1" />
                </StyledView>
            ) : myGroups.length > 0 ? (
                <FlatList
                    data={myGroups}
                    keyExtractor={(item) => item.group_id.toString()}
                    renderItem={({ item }) => (
                        <GroupCard
                            groupName={item.name}
                            memberCount={item.member_count}
                            onPress={() => console.log(`Group ${item.name} selected`)}
                        />
                    )}
                />
            ) : (
                <StyledView className="flex-1 justify-center items-center">
                    <StyledText className="text-lg text-textSecondary">
                        You are not a member of any groups yet.
                    </StyledText>
                </StyledView>
            )}
        </StyledView>
    );
};

export default MyGroupsScreen;
