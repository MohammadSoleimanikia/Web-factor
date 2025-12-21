import useAuth from "@/store/auth";
import { Navigate, Outlet } from "react-router";

export default function GuestOnly() {
    const token = useAuth((state) => state.token);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
