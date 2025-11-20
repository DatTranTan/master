import { useEffect } from "react";
import * as SC from "./styled";

export const Sider = () => {
  useEffect(() => {}, []);

  return (
    <SC.WrapperSider
      width={300}
      collapsedWidth={0}
      collapsed={true}
      theme={"light"}
    ></SC.WrapperSider>
  );
};
