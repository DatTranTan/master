import { BrowserView, MobileView } from "react-device-detect";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../Header";
import * as SC from "./styled";

export const GroupLayout = () => {
  const { pathname } = useLocation();


  return (
    <SC.Wrapper>
      <BrowserView>
        <Header />
        <SC.ContentWrapperBrowser>
          <Outlet />
        </SC.ContentWrapperBrowser>
      </BrowserView>
      <MobileView>
        <Header />
        <SC.ContentWrapperMobile>
          <Outlet />
        </SC.ContentWrapperMobile>
      </MobileView>
    </SC.Wrapper>
  );
};
