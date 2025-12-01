import type { User } from "@/types/user";

export async function signupUser(data: User) {
    const res = await fetch("https://tesrepo-final.onrender.com/api/v1/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw error;
    }

    return res.json();
}

export async function loginUser(data: User) {
    const res = await fetch("https://tesrepo-final.onrender.com/api/v1/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw error;
    }

    return res.json();
}