import { useAuth } from "Hooks/useAuth/use_auth";
import { httpCore } from "Http/http";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function AuthWrapper() {

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  window.addEventListener('beforeunload', function () {
    disconnect();
  }, false);

  function disconnect() {
    var x = 200;
    var a = (new Date()).getTime() + x;
    let req = true;
    while ((new Date()).getTime() < a) {
      if (req) {
        req = false;
        httpCore.post(`/logout/${auth.userId}/`);
      }
    }
  }

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      navigate("/");
    } else if (location.pathname === "/") {
      navigate("/list/prestadores");
    }
  });

  return <Outlet />;
}

export default AuthWrapper;