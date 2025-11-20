import { ROUTES_PATH } from "../constants/routers";
import { Dashboard } from "../pages/Dashboard";
import SignIn from "../pages/SignIn";

export const PageRoutesConfig = [
  {
    key: 1,
    path: ROUTES_PATH.LOGIN,
    element: SignIn,
    isPrivate: true,
  },
  {
    key: 2,
    path: ROUTES_PATH.REGISTER,
    element: SignIn,
    isPrivate: true,
  },
];

export const GroupRoutesConfig = [
  {
    key: 1,
    path: ROUTES_PATH.DASHBOARD,
    element: Dashboard,
    isPrivate: true,
  },
  
];
