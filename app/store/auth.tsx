import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AuthContextType } from "@/types/authContext";
import type { Token } from "@/types/token";
import type { User } from "@/types/user";

const BASE_URL = "https://yasinhossini94.pythonanywhere.com/account";
const useAuth = create<AuthContextType>()(
    persist(
        (set) => ({
            token: null,
            profile: null,
            logIn: (token: Token) => set({ token }),
            logOut: () => set({ token: null, profile: null }),
            setProfile: (profile: User) => {
                const updatedProfile = {
                    ...profile,
                    logo: profile.profile.logo
                        ? `${BASE_URL}${profile.profile.logo}`
                        : null,
                };
                set({ profile: updatedProfile });
            },
        }),
        {
            name: "auth", // Key for localStorage
        }
    )
);

export default useAuth;
