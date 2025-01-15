import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { fetchGroupsAPI, fetchAllGroupsAPI, joinGroupAPI } from "../api/groups";
import { useAuth } from "./AuthContext";

interface GroupContextProps {
    myGroups: Array<{ group_id: number; name: string; member_count: number }>;
    allGroups: Array<{ group_id: number; name: string; member_count: number }>;
    fetchMyGroups: () => Promise<void>;
    fetchAllGroups: () => Promise<void>;
    joinGroup: (groupId: number, joinCode: string) => Promise<void>;
    loading: boolean;
}

const GroupContext = createContext<GroupContextProps | undefined>(undefined);

export const GroupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [myGroups, setMyGroups] = useState([]);
    const [allGroups, setAllGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token, user } = useAuth();

    const fetchMyGroups = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const fetchedGroups = await fetchGroupsAPI(token);
            setMyGroups(fetchedGroups);
        } catch (error) {
            console.error("Failed to fetch groups:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllGroups = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const allGroups = await fetchAllGroupsAPI(token);
            setAllGroups(allGroups);
        } catch (error) {
            console.error("Failed to fetch all groups: ", error);
        } finally {
            setLoading(false);
        }
    };

    const joinGroup = async (groupId: number, joinCode: string) => {
        try {
            await joinGroupAPI(token, groupId, joinCode);
            await fetchMyGroups();
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (token && user) {
                try {
                    await Promise.all([fetchMyGroups(), fetchAllGroups()]);
                } catch (error) {
                    console.error("Error fetching groups data:", error);
                }
            }
        };
    
        fetchData();
    }, [token, user]);

    return (
        <GroupContext.Provider value={{ myGroups, allGroups, fetchMyGroups, fetchAllGroups, joinGroup, loading }}>
            {children}
        </GroupContext.Provider>
    );
};

export const useGroup = () => {
    const context = useContext(GroupContext);
    if (!context) {
        throw new Error("useGroup must be used within a GroupProvider");
    }
    return context;
};
