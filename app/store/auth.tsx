import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Token } from "@/types/token";
import type { AuthContextType } from "@/types/authContext";

const useAuth = create<AuthContextType>()(
    persist(
        (set, get) => ({
            token: null,
            logIn: (token: Token) => set({ token }),
            logOut: () => {
                set({ token: null });
                // Navigate to login if in browser
                if (typeof window !== "undefined") {
                    window.location.href = "/login";
                }
            },
        }),
        {
            name: "token", // Key for localStorage
        }
    )
);

export default useAuth;
