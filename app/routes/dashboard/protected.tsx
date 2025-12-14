import { useAuth } from "@/store/auth";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

export default function Protected() {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
    else{
      navigate('/dashboard', { replace: true });
    }
  }, [token]);


  return <Outlet />;
}
