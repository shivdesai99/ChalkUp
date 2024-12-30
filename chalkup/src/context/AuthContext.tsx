import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { verifyToken } from "../api/auth";

interface AuthContextProps {
    user: { id: number; name: string; email: string } | null;
    token: string | null;
    loading: boolean;
    setUser: (user: { id: number; name: string; email: string } | null) => void;
    setToken: (token: string | null) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const logout = async () => {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem("authToken");
    };

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("authToken");
                if (storedToken) {
                    const userData = await verifyToken(storedToken);
                    setToken(storedToken);
                    setUser(userData);
                }
            } catch (error) {
                console.error("Session restoration failed:", error);
            } finally {
                setLoading(false);
            }
        };
        restoreSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, loading, setUser, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};