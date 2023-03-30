import { useAuth } from "Hooks/useAuth/use_auth";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function AuthWrapper() {

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      navigate("/");
    }else if(location.pathname === "/") {
      navigate("/list/prestadores");
    }
  });

  return <Outlet />;
}

export default AuthWrapper;