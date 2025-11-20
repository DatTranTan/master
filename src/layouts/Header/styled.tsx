import { Layout } from "antd";
import styled from "styled-components";
import { color, fontSize, fontWeight, space } from "../../constants/theme";

const { Header } = Layout;

export const Wrapper = styled.div``;

export const WrapperBrowser = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  background-color: #ffffff;
  padding: 0;
  height: 60px;

  .wrapper-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    height: 60px;
    line-height: unset;
    border-bottom: 1px solid #dadada;
    padding: 5px 3rem;
  }

  .logo {
    display: flex;
    align-items: center;
    min-width: 150px;
  }

  .logo-image {
    width: 50px;
    object-fit: cover;
    height: auto;
    cursor: pointer;
  }

  .logo-text {
    color: #114ccb;
    font-family: "Montserrat", sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 1px;
    margin-left: 3px;
    text-transform: uppercase;
  }

  .collection {
    display: flex;
    gap: 3rem;
  }

  .collection-text {
    color: #344767;
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
  }

  .user {
    display: flex;
    align-items: center;
    min-width: 150px;
    justify-content: end;
  }

  .user-image {
    width: 35px;
    object-fit: cover;
    height: auto;
    cursor: pointer;
  }
`;

export const WrapperItemHeader = styled.div<{ $visible: boolean }>`
  height: auto;
  background: #344767;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(-100%)"};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};

  .item-content {
    margin: auto;
    display: flex;
    max-width: 1200px;
    align-items: center;
    justify-content: center;
    gap: 0.5rem 1rem;
    flex-wrap: wrap;
    padding: 10px;
  }

  .wrapper-item-text {
    color: #fff;
    padding: 0px 20px 2px;
    border-radius: 20px;
    line-height: normal;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }

  .item-text-choose {
    color: #344767;
    background: #fff;
  }
`;

export const WrapperMobile = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  height: 60px;
  padding: 0.5rem 1rem;
  line-height: unset;
  border-bottom: 2px solid #dadada;

  .icon-menu {
    font-size: 1.5rem;
  }

  .logo {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .logo-image {
    height: 100%;
  }

  .logo-text {
    color: #114ccb;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    letter-spacing: 1px;
    margin-left: 3px;
    text-transform: uppercase;
  }
`;

export const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  .logo {
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .right-top {
    display: flex;
    justify-content: end;
  }

  .right-top__input {
    width: 250px;
    margin-right: ${space.md};
  }

  .right-bottom {
    display: flex;
    justify-content: center;
    gap: ${space.xl};
    margin-top: ${space.sm};
  }

  .right-bottom__item {
    font-size: ${fontSize.md};
    font-weight: ${fontWeight.bold};
    cursor: pointer;
  }

  .right-bottom__menu {
    font-size: ${fontSize.md};
    font-weight: ${fontWeight.bold};
    cursor: pointer;
  }

  .right-bottom__menu:hover {
    color: ${color.default};
  }

  .ant-popover-content {
    display: flex;
    flex-direction: column;
    gap: ${space.sm};
    min-width: 200px;
  }

  .ant-menu .ant-menu-item {
    display: flex;
  }
`;
