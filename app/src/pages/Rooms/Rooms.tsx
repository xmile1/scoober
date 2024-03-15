import { useCallback, useEffect } from "react";
import { socket } from "@/common/services/api/socket";
import { useAppSelector, useAppDispatch, useSocketEvent } from "@/common/hooks";

import { Page } from "@/common/components";
import { RoomChooser } from "@/modules/RoomChooser";
import { GameRoom } from "@/modules/GameRoom";
import { GameOver } from "@/modules/GameOver";

import { Room } from "@/common/models/room";
import { useNotification } from "@/modules/Notification";

import { setCurrentRoom } from '@/store/roomsSlice';
import { setUsername, setIsMyTurn, setOpponentName } from '@/store/playerStateSlice';
import { setFirstNumber, resetHistory } from "@/store/historySlice";

import { GameRoomWrapper, RoomsWrapper } from "./Rooms.styles";

export const Rooms = () => {
  const dispatch = useAppDispatch();
  const { showNotification } = useNotification();

  const rooms = useAppSelector((state) => state.rooms.rooms);
  const currentRoom = useAppSelector((state) => state.rooms.currentRoom);
  const username = useAppSelector((state) => state.playerState.username);
  const myTurn = useAppSelector((state) => state.playerState.isMyTurn);
  const opponentName = useAppSelector((state) => state.playerState.opponentName);
  const history = useAppSelector((state) => state.history.history);
  const firstNumber = useAppSelector((state) => state.history.firstNumber);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const login = () => {
      const username = `guest${Math.floor(Math.random() * 10000 + 90000)}`;
      dispatch(setUsername(username));
      socket.emit("login", { username });
    };
    login();
  }, [dispatch]);

  const onOpponentName = useCallback(({ opponentName }: { opponentName: string }) => {
    dispatch(setOpponentName(opponentName));
  }, [dispatch]);

  const onMessage = useCallback(({ message }: { message: string }) => {
    showNotification(message);
  }, [showNotification]);

  useSocketEvent(socket, "opponentName", onOpponentName);
  useSocketEvent(socket, "message", onMessage);

  const joinRoom = useCallback((room: Room) => {
      socket.emit("joinRoom", { room: room.id, username: username, roomType: room.type });
      dispatch(setCurrentRoom(room));
    },
    [username, dispatch]
  );

  const startGame = useCallback((room?: Room) => {
      dispatch(resetHistory());
      dispatch(setFirstNumber(0));
      dispatch(setIsMyTurn(false));
      joinRoom(room ?? (currentRoom as Room));
    },
    [currentRoom, joinRoom, dispatch]
  );

  return (
    <Page opponentName={opponentName}>
      <RoomsWrapper>
        <RoomChooser rooms={rooms} currentRoom={currentRoom} onRoomClick={startGame} />
        <GameRoomWrapper>
          <GameOver onNewGame={() => startGame()} username={username} />
          <GameRoom
            currentRoom={currentRoom}
            firstNumber={firstNumber}
            history={history}
            myTurn={myTurn}
            setMyTurn={(isMyTurn: boolean) => dispatch(setIsMyTurn(isMyTurn))}
            username={username}
          />
        </GameRoomWrapper>
      </RoomsWrapper>
    </Page>
  );
};


