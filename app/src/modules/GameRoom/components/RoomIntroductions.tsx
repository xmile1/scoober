import { Text } from "@/common/components";
import styled from "styled-components";

const Hourglass = styled(Text)`
  display: inline-block;
  animation: spin 3s infinite linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  
  height: 30vh;
  flex-direction: column;
`;

const StartingNumber = styled(Wrapper)`
  gap: 16px;
  padding: 32px;
  text-align: center;
`;

type RoomIntroductionsProps = {
  isWaitingForPlayerToJoin?: boolean;
  hasNotSelectedARoom?: boolean;
  isGameStarting: boolean;
  firstNumber?: number;
};

export const RoomIntroductions = ({
  hasNotSelectedARoom,
  isWaitingForPlayerToJoin,
  isGameStarting,
  firstNumber,
}: RoomIntroductionsProps) => {
  
  return (
    <>
      {hasNotSelectedARoom && (
        <Wrapper>
          <Text as="h3" size="l" weight="bold">Welcome to Scoober!</Text>
          <Text size="m">To begin the fun, select a game room of your choice.</Text>
        </Wrapper>
      )}
      {isWaitingForPlayerToJoin && (
        <Wrapper>
          <Text size="m" weight="bold">
            Waiting for an opponent to join...
          </Text>
          <Hourglass aria-label="Hourglass waiting icon" size="xl">⏳</Hourglass>
        </Wrapper>
      )}
      {isGameStarting && (
        <StartingNumber>
          <Text as="h2" size="xl" weight="bold">
            Starting Number: {firstNumber}
          </Text>
          <Text size="m">
            Let the game begin! <br/> Adjust the Starting Number by either subtracting 1, adding 1, or keeping it the same to make it divisible by three. Take turns and strategize to outwit your opponent, aiming to reduce the number to one and claim the ultimate victory. Let's play!
          </Text>
        </StartingNumber>
      )}
    </>
  );
};
