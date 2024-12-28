import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:5001/auth",
    headers: {
        "Content-Type": "application/json",
    },
});

// Login function
export const login = async (email: string, password: string) => {
    try {
        const response = await apiClient.post("/login", { email, password });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }

        throw new Error("An unexpected error occurred. Please try again.");
    }
};

// Register function
export const register = async (email: string, password: string, name: string) => {
    try {
        const response = await apiClient.post("/register", { email, password, name });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }

        throw new Error("An unexpected error occurred. Please try again.");
    }
};
