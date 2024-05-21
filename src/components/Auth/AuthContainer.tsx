import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  updateEmail,
  updatePassword,
} from "../../store/reducers/auth/authSlice";
import { login, registration } from "../../store/reducers/auth/authActions";
import { IAuth } from "../../models/IAuth";
import { useLocation } from "react-router-dom";
import { Button, Col, Form, Input, Row } from "antd";

export const AuthContainer = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { email, password } = useAppSelector(state => state.authReducer);
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(updateEmail(e.target.value));
  };
  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(updatePassword(e.target.value));
  };
  const onClickHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data: IAuth = {
      email,
      password,
    };
    if (location.pathname === "/login") dispatch(login(data));
    else dispatch(registration(data));
  };
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row>
        <Col span={22}>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 900 }}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input value={email} onChange={onChangeEmail} />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password onChange={onChangePass} value={password} />
            </Form.Item>
            <div>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  onClick={onClickHandler}
                  type="primary"
                  htmlType="submit"
                >
                  {location.pathname === "/login"
                    ? "Авторизоваться"
                    : "Зарегестрироваться"}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
