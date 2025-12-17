import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/store/auth";

export default function GuestOnly() {
    const { token } = useAuth();

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
