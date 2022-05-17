import { Navigate, Outlet, useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
  // const auth = useAuth();
  const location = useLocation();

  const token = localStorage.getItem("token");

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
