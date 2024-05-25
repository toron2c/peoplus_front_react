import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import style from "./Home.module.css";
import { Space } from "antd";
import Link from "antd/es/typography/Link";
import { NavLink } from "react-router-dom";

export const HomeContainer = () => {
  return (
    <div className={style.homeContainer}>
      <Space direction="vertical" size="middle">
        <Title>Добро пожаловать!</Title>
        <Title level={2}>
          Вы находитесь на главной страннице
          <br />
          <span className={style.logo}>PEOPLUS</span>
        </Title>
        <Paragraph>
          Здесь вы найдёте удобный инструмент, который поможет вам эффективно
          планировать своё время и достигать поставленных целей. Наш сайт создан
          для тех, кто хочет разбивать большие дела на маленькие и легко их
          выполнять.
        </Paragraph>
        <NavLink to="registration">
          <Link>Registration</Link>
        </NavLink>
      </Space>
    </div>
  );
};
