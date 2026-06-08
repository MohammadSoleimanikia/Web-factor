import { useQuery } from "@tanstack/react-query";

import type { User } from "@/features/auth/types/user.type";
import { apiFetch } from "@/lib/api";
import useAuth from "@/store/auth";

export function useProfile() {
    const { setProfile } = useAuth();

    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const data = await apiFetch<User>("/account/profile/");
            setProfile(data); 
            return data;
        },
        staleTime: 5 * 60 * 1000,
    });
}