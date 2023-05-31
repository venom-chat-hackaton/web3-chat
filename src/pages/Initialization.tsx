import { Spin, Steps } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "src/components/Button";
import { useAuth } from "src/hooks/useAuth";
import styled from "styled-components";

const StyledSteps = styled(Steps)``;

const Wrapper = styled(motion.div)`
  display: flex;
  width: 1280px;
  height: 100%;
  align-items: center;
  justify-content: center;
  .custom-step >>> .ant-steps-item-tail::after {
    background-color: red !important;
  }
`;

const Progress = styled.div`
  color: ${(props) => props.theme.colorTextBase};
`;

const StepsWrapper = styled.div`
  width: 350px;
  margin-bottom: 10px;
`;

const StepWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Step = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 10px;
  height: 10px;
  border-radius: 100%;
`;

const CompletedStep = styled(Step)`
  background-color: ${(props) => props.theme.colorPrimary};
`;

const IncompletedStep = styled(Step)`
  background-color: ${(props) => props.theme.colorBorder};
`;

export const Initialization = () => {
  const [checkingSocket, setIsCheckingSocket] = useState(false);
  const [creatingSocket, setIsCreatingSocket] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);
  const { createSocket, checkSocket } = useAuth();

  const onClick = async () => {
    setIsCreatingSocket(true);
    await createSocket();
    setIsCreatingSocket(false);
  };

  useEffect(() => {
    const initalizeChecking = async () => {
      setIsCheckingSocket(true);
      const check = await checkSocket();
      setIsCheckingSocket(false);
    };
    initalizeChecking();
  }, []);

  return (
    <Wrapper
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3 }}
    >
      <Progress>
        <StepsWrapper>
          <StyledSteps
            className="custom-step"
            direction="vertical"
            current={currentStep}
            items={[
              {
                title: "Checking initialization",
                description: checkingSocket
                  ? "Checking if you are already a user"
                  : "You need to initialize your socket",
                status: "wait",
                icon: checkingSocket ? (
                  <Spin size="small" />
                ) : (
                  <StepWrapper>
                    <CompletedStep />
                  </StepWrapper>
                ),
              },
              {
                title: "In Progress",
                description: "Initializing your socket",
                icon: creatingSocket ? (
                  <Spin size="small" />
                ) : (
                  <StepWrapper>
                    <IncompletedStep />
                  </StepWrapper>
                ),
              },
              {
                title: "Loading chat history",
                icon: (
                  <StepWrapper>
                    <IncompletedStep />
                  </StepWrapper>
                ),
              },
            ]}
          />
        </StepsWrapper>
        <Button onClick={onClick} text="Initialize" type="primary" />
      </Progress>
    </Wrapper>
  );
};
