import React, { useState } from "react";
import { Modal, View, TextInput, Button } from "react-native";
import { styled } from "nativewind";
import { useGroup } from "../../context/GroupContext";

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);

interface JoinGroupModalProps {
    group: { groupId: number; name: string };
    onClose: () => void;
}

const JoinGroupModal: React.FC<JoinGroupModalProps> = ({ group, onClose }) => {
    const { joinGroup } = useGroup();
    const [joinCode, setJoinCode] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleJoin = async () => {
        try {
            await joinGroup(group.groupId, joinCode);
            onClose();
        } catch (err: any) {
            setError(err.message || "Failed to join the group.");
        }
    };

    return (
        <Modal visible={true} transparent={true} animationType="slide">
            <StyledView className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <StyledView className="bg-surface p-6 rounded-md shadow-strong w-4/5">
                    <StyledTextInput
                        placeholder="Enter join code"
                        value={joinCode}
                        onChangeText={setJoinCode}
                        className="bg-background text-textPrimary p-2 rounded-md mb-4"
                    />
                    {error && <StyledTextInput className="text-red-500 mb-2">{error}</StyledTextInput>}
                    <Button title="Join Group" onPress={handleJoin} color="#4169E1" />
                    <Button title="Cancel" onPress={onClose} color="#555" />
                </StyledView>
            </StyledView>
        </Modal>
    );
};

export default JoinGroupModal;