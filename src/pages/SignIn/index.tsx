import { Button, Form, Input, notification } from "antd";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Api from "../../api";
import { ROUTES_PATH } from "../../constants/routers";
import { RegisterType } from "../../types";
import * as Styled from "./styled";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form] = Form.useForm();
  const loginBtnRef = useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState<string>("login");

  useEffect(() => {
    const path = location.pathname;
    form.resetFields();
    if (path.includes("register")) {
      setMode("register");
    } else {
      setMode("login");
    }
  }, [location]);

  const onFinish = async (values: RegisterType) => {
    try {
      let res: any;

      if (mode === "register") {
        res = await Api.register({
          username: values.username,
          password: values.password,
          email: values.email,
          full_name: values.full_name,
        });

        notification.success({
          message: "THÀNH CÔNG",
          description: "Đăng ký tài khoản thành công!",
        });

        navigate(ROUTES_PATH.LOGIN);
        return;
      }

      res = await Api.login({
        username: values.username,
        password: values.password,
      });

      if (res) {
        Cookies.set("token", res?.access_token);

        notification.success({
          message: "THÀNH CÔNG",
          description: "Đăng nhập thành công!",
        });

        form.resetFields();
        navigate(ROUTES_PATH.DASHBOARD);
        // window.location.reload();
      }

    } catch (error) {
      notification.error({
        message: "LỖI",
        description:
          mode === "register"
            ? "Đăng ký thất bại, vui lòng thử lại."
            : "Thông tin đăng nhập không chính xác.",
      });
    }
  };


  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") loginBtnRef.current?.click();
  };

  return (
    <Styled.Wrapper>
      <Styled.FormContainer>
        <div className="title">
          {mode === "register" ? "đăng ký tài khoản" : "đăng nhập"}
        </div>
        <p>TRI THỨC QUAN HỆ VÀ ỨNG DỤNG</p>
        <Form
          form={form}
          layout="vertical"
          name="signInForm"
          onFinish={onFinish}
          autoComplete="off"
        >
          {mode === "register" && (
            <>
              <Form.Item<RegisterType>
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Không để trống trường này" },
                ]}
              >
                <Input size="large" placeholder="Nhập email" allowClear />
              </Form.Item>
              <Form.Item<RegisterType>
                label="Họ và tên"
                name="full_name"
                rules={[
                  { required: true, message: "Không để trống trường này" },
                ]}
              >
                <Input size="large" placeholder="Nhập họ và tên" allowClear />
              </Form.Item>
            </>
          )}
          <Form.Item<RegisterType>
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Không để trống trường này" }]}
          >
            <Input
              size="large"
              placeholder="Nhập tên đăng nhập"
              onKeyPress={handleEnterPress}
              allowClear
            />
          </Form.Item>

          <Form.Item<RegisterType>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Không để trống trường này" }]}
          >
            <Input.Password
              size="large"
              placeholder="Nhập mật khẩu"
              onKeyPress={handleEnterPress}
              allowClear
            />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              ref={loginBtnRef}
              style={{ display: "none" }}
            />
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              onClick={() => loginBtnRef.current?.click()}
            >
              XÁC NHẬN
            </Button>
          </Form.Item>
        </Form>
        {mode !== "register" ? (
          <div>
            {" "}
            Chưa có tài khoản? <a href="/register">Đăng ký tại đây</a>
          </div>
        ) : (
          <div>
            {" "}
            Đã có tài khoản? <a href="/login">Đăng nhập</a>
          </div>
        )}
      </Styled.FormContainer>
    </Styled.Wrapper>
  );
};

export default SignIn;
