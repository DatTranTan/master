import { Layout } from "antd";
import styled from "styled-components";
import { scrollbar } from "../../constants/size";

const { Content } = Layout;

export const Wrapper = styled(Layout)`
  overflow: hidden;
  background: #fff;
  .ant-layout .ant-layout-sider,
  .ant-layout-sider-children {
    background-color: #ffffff;
    ${scrollbar}
    overflow-y: auto;
  }
`;

export const ContentWrapperBrowser = styled(Content)`
  height: calc(100vh - 70px);
  background: #fff;
  /* max-width: 1200px; */
  margin: auto;
  overflow-y: auto;
`;

export const ContentWrapperMobile = styled(Content)`
  padding: 0;
  padding-bottom: 5rem;
  background-color: #ffffff;
  overflow-y: auto;
  overflow-x: hidden;

  ${scrollbar}
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background: #b4b4b4;
    border-radius: 10px;
  }
`;
