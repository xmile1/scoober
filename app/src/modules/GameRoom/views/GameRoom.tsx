import {
  GameRoomLayout,
  WaitingForOpponent,
} from "../styles/GameRoom.styles";
import { useCallback, useEffect, useRef } from "react";
import { HistoryItem as HistoryItemModel, OnReadyResponse, Room } from "@/common/models/room";
import { HistoryItem } from "../components/HistoryItem";
import { PlayerChoiceButtons } from "../components/PlayerChoiceButtons";
import { RoomIntroductions } from "../components/RoomIntroductions";
import { socket } from "@/common/services/api/socket";
import { useSocketEvent } from "@/common/hooks";

type GameRoomProps = {
  myTurn: boolean;
  history: HistoryItemModel[];
  username: string;
  firstNumber?: number;
  currentRoom: Room | null;
  setMyTurn: (isMyTurn: boolean) => void;
};

export const GameRoom = ({
  myTurn,
  history,
  firstNumber,
  currentRoom,
  username,
  setMyTurn,
}: GameRoomProps) => {
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      endOfHistoryRef.current?.scrollIntoView?.({ behavior: "smooth", block: "end" });
    };
    setTimeout(scrollToBottom, 80);
  }, [history]);

  const isGameInProgress = !!firstNumber || history.length > 0;
  const isWaitingForOpponentToPlay = isGameInProgress && !myTurn;
  const isWaitingForOpponentToJoin = !!currentRoom && !firstNumber;

  const onReady = ({ state, userId }: OnReadyResponse) => {
    const isFirstUser = state && userId === socket.id;
    if (isFirstUser) {
      socket.emit("letsPlay");
    }
  };

  const onActivateYourTurn = useCallback(
    (data: { user: string; state: string }) => {
      const isMyTurn = data.user === socket.id ? data.state === "play" : data.state === "wait";
      setMyTurn(isMyTurn);
    },
    [setMyTurn]
  );

  useSocketEvent(socket, "onReady", onReady);
  useSocketEvent(socket, "activateYourTurn", onActivateYourTurn);

  function selectAnswer(selectedNumber: number) {
    socket.emit("sendNumber", {
      selectedNumber,
      number: history[history.length - 1]?.result || firstNumber,
    });
  }

  return (
    <GameRoomLayout>
      <RoomIntroductions
        hasNotSelectedARoom={!currentRoom}
        isWaitingForPlayerToJoin={isWaitingForOpponentToJoin}
        isGameStarting={!!firstNumber && history.length === 0}
        firstNumber={firstNumber}
      />
      {history.map((item) => (
        <HistoryItem key={item.id} item={item} username={username} />
      ))}
      <PlayerChoiceButtons myTurn={myTurn} selectAnswer={selectAnswer} />
      {isWaitingForOpponentToPlay && (
        <WaitingForOpponent weight="bold">Waiting for your opponent to play...</WaitingForOpponent>
      )}
      <div ref={endOfHistoryRef} />
    </GameRoomLayout>
  );
};
