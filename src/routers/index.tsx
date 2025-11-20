import {
  Navigate,
  Routes as ReactRoutes,
  Route
} from "react-router-dom";

import { GroupRoutesConfig, PageRoutesConfig } from "../configs/routers";
import { ROUTES_PATH } from "../constants/routers";
import { GroupLayout } from "../layouts/GroupLayout";
import { PageLayout } from "../layouts/PageLayout";

const Routes = () => {
  return (
    <ReactRoutes>
      {/* <Route path='/' element={<SignIn />} /> */}
      <Route path="/" element={<PageLayout />}>
        {PageRoutesConfig.map((v, i) => (
          <Route key={i} path={v.path} element={<v.element />} />
        ))}
      </Route>

      <Route path="/" element={<GroupLayout />}>
        {GroupRoutesConfig.map((v, i) => (
          <Route key={i} path={v.path} element={<v.element />} />
        ))}
      </Route>

      <Route
        path="*"
        element={<Navigate to={ROUTES_PATH.LOGIN} replace />}
      />
    </ReactRoutes>
  );
};

export default Routes;
