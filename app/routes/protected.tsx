import { useAuth } from "@/store/auth";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

export default function Protected() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  if (!user) return null;

  return <Outlet />;
}
