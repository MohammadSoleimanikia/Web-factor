import type { User } from "@/features/auth/types/user.type";

import type { Token } from "./token";

export type AuthContextType = {
    token: null | Token;
    profile: User | null;
    logIn: (token: Token) => void;
    logOut: () => void;
    setProfile: (profile: User) => void;
};
