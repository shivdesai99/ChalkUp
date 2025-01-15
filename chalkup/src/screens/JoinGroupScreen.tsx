import React, { useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { styled } from "nativewind";
import { useGroup } from "../context/GroupContext";
import GroupCard from "../components/ui/GroupCard";
import JoinGroupModal from "../components/modals/JoinGroupModal";

const StyledView = styled(View);
const StyledText = styled(Text);

const JoinGroupScreen: React.FC = () => {
    const [selectedGroup, setSelectedGroup] = useState<{ groupId: number; name: string } | null>(null);
    const { allGroups, loading } = useGroup();

    return (
        <StyledView className="flex-1 bg-background p-4">
            {loading ? (
                <StyledView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#4169E1" />
                </StyledView>
            ) : allGroups.length > 0 ? (
                <FlatList
                    data={allGroups}
                    keyExtractor={(item) => item.group_id.toString()}
                    renderItem={({ item }) => (
                        <GroupCard
                            groupName={item.name}
                            memberCount={item.member_count}
                            onPress={() => setSelectedGroup({ groupId: item.group_id, name: item.name })}
                        />
                    )}
                />
            ) : (
                <StyledView className="flex-1 justify-center items-center">
                    <StyledText className="text-lg text-textSecondary">
                        No groups available to join at the moment.
                    </StyledText>
                </StyledView>
            )}
            {selectedGroup && (
                <JoinGroupModal
                    group={selectedGroup}
                    onClose={() => setSelectedGroup(null)}
                />
            )}
        </StyledView>
    );
};

export default JoinGroupScreen;