import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  updateEmail,
  updatePassword,
} from "../../store/reducers/auth/authSlice";
import { login, registration } from "../../store/reducers/auth/authActions";
import { ILogin } from "../../models/ILogin";
import { useLocation } from "react-router-dom";
import { HomeContainer } from "../Home/Home";
import { Col, Row } from "antd";

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

    const data: ILogin = {
      email,
      password,
    };
    if (location.pathname === "/login") dispatch(login(data));
    else dispatch(registration(data));
  };
  return (
    <div style={{ height: "100%", display: "flex" }}>
      <Row>
        <Col xs={24} md={10}>
          <HomeContainer />
        </Col>
        <Col span={14}>
          <form>
            <div>
              EMAIL ={" "}
              <input type="email" value={email} onChange={onChangeEmail} />
              <br />
              PASSWORD =
              <input type="password" value={password} onChange={onChangePass} />
            </div>
            <div>
              {location.pathname === "/login" ? (
                <button type="submit" onClick={onClickHandler}>
                  Login
                </button>
              ) : (
                <button type="submit" onClick={onClickHandler}>
                  Registration
                </button>
              )}
            </div>
          </form>
        </Col>
      </Row>
    </div>
  );
};
