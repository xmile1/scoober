import { useCallback, useState } from "react";
import { Button, Modal, Text } from "@/common/components";
import loseIcon from "@/assets/icons/lose.svg";
import winIcon from "@/assets/icons/win.svg";
import styled from "styled-components";
import { useSocketEvent } from "@/common/hooks";
import { socket } from "@/common/services/api/socket";

const GameOverMessage = styled(Text)`
  margin: 16px 0;
`;

type GameOverProps = { onNewGame: () => void; username: string };

export const GameOver = ({ onNewGame, username }: GameOverProps) => {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const isWinner = winner === username;

  const handleNewGame = useCallback(() => {
    setIsGameOver(false);
    onNewGame();
  }, [onNewGame]);

  const onGameOver = useCallback(({ user }: { user: string }) => {
    setIsGameOver(true);
    setWinner(user);
    socket?.emit("leaveRoom");
  }, []);

  useSocketEvent(socket, "gameOver", onGameOver);

  return isGameOver ? (
    <Modal>
      <img src={isWinner ? winIcon : loseIcon} alt={isWinner ? "Winner icon" : "Loser icon"} />
      <GameOverMessage size="xl" weight="bold" color="alternative-text">
        {isWinner ? "You won" : "You lost"}
      </GameOverMessage>
      <Button onClick={handleNewGame}> New Game </Button>
    </Modal>
  ) : null;
};
