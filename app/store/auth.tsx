import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Token } from "@/types/token";
import type { AuthContextType } from "@/types/authContext";

const useAuth = create<AuthContextType>()(
    persist(
        (set) => ({
            token: null,
            logIn: (token: Token) => set({ token }),
            logOut: () => set({ token: null }),
        }),
        {
            name: "token", // Key for localStorage
        }
    )
);

export default useAuth;
