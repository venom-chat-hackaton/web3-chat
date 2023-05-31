import { Modal } from "antd";
import { useAuth } from "src/hooks/useAuth";
import styled from "styled-components";
import { Settings } from "./Settings";
import { useState } from "react";

const HeaderText = styled.div`
  padding: 20px 0px 20px 25px;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500px;
`;

const Icon = styled.img`
  transition: filter 0.1s ease;
  cursor: pointer;
  width: 18px;
  height: 18px;
  filter: ${(props) => props.theme.colorTextBaseFilter};

  &:hover {
    filter: invert(57%) sepia(95%) saturate(399%) hue-rotate(112deg)
      brightness(95%) contrast(87%);
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  width: 100px;
  justify-content: space-between;
  align-items: center;
  margin-right: 25px;
`;

export const AsideHeader = () => {
  const { logOut } = useAuth();
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const onLogOut = () => {
    logOut();
  };

  const toggleSettings = () => {
    setIsOpenSettings(!isOpenSettings);
  };

  return (
    <Wrapper>
      <HeaderText>Messages</HeaderText>
      <Buttons>
        <Icon src="/img/add-contact.svg" />
        <Icon onClick={toggleSettings} src="/img/settings.svg" />
        <Icon onClick={onLogOut} src="/img/logout.svg" />
      </Buttons>
      <Modal
        centered={true}
        title="Settings"
        open={isOpenSettings}
        onCancel={toggleSettings}
        maskClosable={true}
        footer={null}
        width={300}
      >
        <Settings />
      </Modal>
    </Wrapper>
  );
};
