import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
  const auth = useAuth();
  const location = useLocation();
  console.log(auth);

  return auth.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/candidate/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
