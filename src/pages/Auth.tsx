import { Spin } from "antd";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { ConnectWalletButton } from "src/components/ConnectWalletButton";
import { useAuth } from "src/hooks/useAuth";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  display: flex;
  width: 1280px;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const StartingText = styled.p`
  margin-right: 20px;
`;

export const Auth = () => {
  const { checkAuth, hasInitialized } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!hasInitialized) {
    return (
      <Wrapper>
        <Spin />
      </Wrapper>
    );
  }

  return (
    <Wrapper
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3 }}
    >
      <StartingText>To start using chat, please</StartingText>
      <ConnectWalletButton />
    </Wrapper>
  );
};
