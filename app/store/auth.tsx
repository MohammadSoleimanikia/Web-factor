import type { AuthContext } from "@/types/authContext";
import type { User } from "@/types/user";
import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const logIn = (user: User) => {
        setUser(user);
    };
    const logOut = () => {
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
