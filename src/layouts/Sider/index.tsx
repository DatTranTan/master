import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as SC from "./styled";


export const Sider = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => {
   
  }, [Cookies.get("token"), openModal]);

  

  
  return (
    <SC.WrapperSider
      width={300}
      collapsedWidth={0}
      collapsed={collapsed}
      theme={"light"}
    >
     
    </SC.WrapperSider>
  );
};
