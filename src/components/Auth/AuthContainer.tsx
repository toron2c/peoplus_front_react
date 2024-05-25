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
  const { email, password, error, isError } = useAppSelector(
    state => state.authReducer
  );

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateEmail(e.target.value));
  };
  const onChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(updatePassword(e.target.value));
  };
  const onClickHandler = (e: React.SyntheticEvent) => {
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
            style={{ maxWidth: 600, width: 240 }}
            autoComplete="off"
            onFinish={onClickHandler}
          >
            {isError && (
              <Form.Item
                wrapperCol={{
                  offset: 7,
                  span: 14,
                  xs: { offset: 6, span: 10 },
                }}
              >
                <div className="ant-form-item-explain ant-form-item-explain-error">
                  {error}
                </div>
              </Form.Item>
            )}
            <Form.Item
              name="email"
              label="E-mail"
              validateStatus={isError ? "error" : "validating"}
              rules={[
                {
                  type: "email",
                  message: "Введите Email в формате - email@email.ru",
                },
                {
                  required: true,
                  message: "Введите ваш Email",
                },
              ]}
            >
              <Input
                placeholder="example@example.com"
                value={email}
                onChange={onChangeEmail}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              validateStatus={isError ? "error" : "validating"}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="password"
                onChange={onChangePass}
                value={password}
              />
            </Form.Item>
            <div>
              <Form.Item
                validateStatus={isError ? "error" : "validating"}
                wrapperCol={{
                  offset: 8,
                  span: 16,
                  xs: { offset: 6, span: 10 },
                }}
              >
                <Button disabled={isError} type="primary" htmlType="submit">
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
