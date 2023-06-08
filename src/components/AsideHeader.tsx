import { Modal } from "antd";
import { useAuth } from "src/hooks/useAuth";
import styled from "styled-components";
import { Settings } from "./Settings";
import { useState } from "react";
import { useSockets } from "src/hooks/useSockets";
import { CreateChat } from "./CreateChat";
import { useVenomWallet } from "src/hooks/useVenomWallet";
import { ExternalLink } from "./ExternalLink";
import { Copy } from "./Copy";
import { useCurrentState } from "src/hooks/useCurrentState";
import { useChats } from "src/hooks/useChats";
import { useStandaloneCryption } from "src/hooks/useStandaloneCryption";

const HeaderText = styled.div`
  padding: 20px 0px 20px 25px;
  font-size: 14px;
  line-height: 28px;
  font-weight: 500px;
  display: flex;
  flex-direction: column;
`;

const OnlineIcon = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 7px;
  height: 7px;
  border-radius: 100%;
  background-color: ${(props) => props.theme.colorPrimary};
  display: inline-block;
  font-family: ;
`;

const Address = styled.code`
  display: flex;
  align-items: center;
  width: 170px;
  justify-content: space-between;
  cursor: pointer;

  & > .external-link {
    transition: opacity 0.1s ease;
    opacity: 0;
  }

  &:hover > .external-link {
    opacity: 1;
  }

  & > .copy {
    transition: opacity 0.1s ease;
    opacity: 0;
  }

  &:hover > .copy {
    opacity: 1;
  }
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
  const wallet = useVenomWallet();
  const address = wallet.address?.toString();
  const { logOut } = useAuth();
  const { resetState } = useCurrentState();
  const { resetState: resetChats } = useChats();
  const { resetState: resetStandalone } = useStandaloneCryption();
  const { deleteUserSocket } = useSockets();
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const [isOpenCreateChat, setIsOpenCreateChat] = useState(false);

  const onLogOut = () => {
    logOut();
    deleteUserSocket();
    resetState();
    resetChats();
    resetStandalone();
  };

  const toggleSettings = () => {
    setIsOpenSettings(!isOpenSettings);
  };

  const toggleCreateChat = () => {
    setIsOpenCreateChat(!isOpenCreateChat);
  };

  return (
    <Wrapper>
      <HeaderText>
        {/* Messages */}
        <Address>
          <OnlineIcon />
          {address?.slice(0, 5)}...{address?.slice(-5)}
          <ExternalLink type="accounts" hash={String(address)} />
          <Copy text={address?.toString()} />
        </Address>
      </HeaderText>
      <Buttons>
        <Icon onClick={toggleCreateChat} src="/img/add-contact.svg" />
        <Icon onClick={toggleSettings} src="/img/settings.svg" />
        <Icon onClick={onLogOut} src="/img/logout.svg" />
      </Buttons>
      <Modal
        centered={true}
        title="Create chat"
        open={isOpenCreateChat}
        onCancel={toggleCreateChat}
        maskClosable={true}
        footer={null}
        width={300}
      >
        <CreateChat forceClose={toggleCreateChat} />
      </Modal>
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
