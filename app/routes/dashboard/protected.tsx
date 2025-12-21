import useAuth from "@/store/auth";
import { Outlet, useNavigate } from "react-router";

export default function Protected() {
    const token = useAuth((state) => state.token);
    const navigate = useNavigate();

    if (!token) {
        navigate("/login", { replace: true });
    }

    return <Outlet />;
}
