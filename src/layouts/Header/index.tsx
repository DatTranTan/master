import { Button, Col, Drawer, notification, Popover, Row } from "antd";
import { useEffect, useState } from "react";
import icon_user from "../../assets/icon-user.png";
import icon from "../../assets/icon.png";
import * as SC from "./styled";

import { MenuOutlined, PoweroffOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

import { BrowserView, MobileView } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../../constants/routers";

export const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const logOut = async () => {
    await setOpen(false);
    await Cookies.remove("token");
    await notification.success({
      message: "THÀNH CÔNG",
      description: <b>Hẹn gặp lại nhé!</b>,
    });
    await navigate(ROUTES_PATH.LOGIN);
  };

  useEffect(() => {
    if (!Cookies.get("token")) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [Cookies.get("token"), openModal]);

  return (
    <SC.Wrapper>
      <BrowserView>
        <SC.WrapperBrowser>
          <div className="wrapper-header">
            <div className="logo">
              <img
                className="logo-image"
                src={icon}
                alt=""
                loading="lazy"
                onClick={() => {
                  navigate(`${ROUTES_PATH.DASHBOARD}`);
                }}
              />
              <span className="logo-text">
                Mô hình tri thức quan hệ và ứng dụng
              </span>
            </div>

            <div className="collection"></div>
            <div className="user">
              <Popover
                placement="bottomLeft"
                content={
                  <div style={{ minWidth: 200 }}>
                    <div className="user-text" onClick={logOut}>
                      Đăng xuất
                    </div>
                  </div>
                }
                arrow={false}
              >
                <img
                  className="user-image"
                  src={icon_user}
                  alt=""
                  loading="lazy"
                />
              </Popover>
            </div>
          </div>
        </SC.WrapperBrowser>
      </BrowserView>
      <MobileView>
        <Drawer
          onClose={onClose}
          open={open}
          width={"85%"}
          styles={{ body: { padding: "0" } }}
        >
          <div style={{ padding: "0 1rem" }}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Button
                  size="large"
                  block
                  danger
                  icon={<PoweroffOutlined />}
                  onClick={logOut}
                >
                  Đăng xuất
                </Button>
              </Col>
            </Row>
          </div>
        </Drawer>
        <SC.WrapperMobile>
          <div className="logo">
            <img
              className="logo-image"
              src={icon}
              alt=""
              loading="lazy"
              onClick={() => {
                navigate(`${ROUTES_PATH.DASHBOARD}`);
              }}
            />
            <span className="logo-text">
              Mô hình tri thức quan hệ<br/>và ứng dụng
            </span>
          </div>
          <div>
            <MenuOutlined className="icon-menu" onClick={showDrawer} />
          </div>
        </SC.WrapperMobile>
      </MobileView>
    </SC.Wrapper>
  );
};
