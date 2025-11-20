import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  // if (!Cookies.get("token")) {
  //   return <Navigate to={ROUTES_PATH.SIGN_IN} replace />;
  // }

  return children ? children : <Outlet />;
};

export default RequireAuth;
