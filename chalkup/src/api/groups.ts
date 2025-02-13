import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:5001",
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchGroupsAPI = async (token: string) => {
    try {
        console.log("Fetching groups with token:", token);
        const response = await apiClient.get("/group/my-groups", {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return response.data.myGroups;
    } catch (error: any) {
        console.error("Error fetching groups:", error.response?.data || error.message);
        throw new Error("Failed to fetch groups");
    }
};

export const fetchAllGroupsAPI = async (token: string) => {
    try {
        console.log("Fetching all groups for Join Group Screen with token: ", token);
        const response = await apiClient.get("/group/all-groups", {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return response.data.groups;
    } catch (error: any) {
        console.error("Error fetching all groups:", error.response?.data || error.message);
        throw new Error("Failed to fetch all groups");
    }
}

export const joinGroupAPI = async (token: string | null, groupId: number, joinCode: string) => {
    if (!token) {
        console.error("Join group attempt without token");
        throw new Error("Missing token");
    }

    try {
        console.log("Attempting to join group with token:", token);
        const response = await apiClient.post(
            "/group/join",
            { groupId, joinCode },
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Successfully joined group:", response.data.group);
        return response.data.group;
    } catch (error: any) {
        console.error("Error joining group:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to join group");
    }
};
