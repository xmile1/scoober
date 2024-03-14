import { Page } from "@/common/components";
import { getRooms } from "@/common/services/api/rooms";
import { socket } from "@/common/services/api/socket";
import { RoomChooser } from "@/modules/RoomChooser";
import { GameRoom } from "@/modules/GameRoom";
import { useCallback, useEffect } from "react";
import { GameOver } from "@/modules/GameOver";
import { GameRoomWrapper, RoomsWrapper } from "./Rooms.styles";
import { Room } from "@/common/models/room";
import { useNotification } from "@/modules/Notification";
import { useAppSelector, useAppDispatch, useSocketEvent } from "@/common/hooks";
import { setRooms, setCurrentRoom } from '@/store/roomsSlice';
import { setUsername, setIsMyTurn, setOpponentName } from '@/store/playerStateSlice';
import { setFirstNumber, resetHistory, setHistoryItem } from "@/store/historySlice";


type RandomNumberPayload = {
  isFirst: boolean;
  number: number;
  selectedNumber: number;
  user: string;
}

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
    async function fetchRooms() {
      const roomsData = await getRooms();
      dispatch(setRooms(roomsData));
    }

    fetchRooms();
  }, [dispatch]);

  useEffect(() => {
    const login = () => {
      const username = `guest${Math.floor(Math.random() * 10000 + 90000)}`;
      dispatch(setUsername(username));
      socket.emit("login", { username });
    };
    login();
  }, [dispatch]);


  const onRandomNumber = useCallback((payload : RandomNumberPayload) => {
    const { isFirst, number, selectedNumber, user } = payload;
    if (isFirst) return dispatch(setFirstNumber(number));

    dispatch(setHistoryItem({selectedNumber, number, user}));  
 }, [dispatch]);

  const onOpponentName = useCallback(({ opponentName }: { opponentName: string }) => {
    dispatch(setOpponentName(opponentName));
  }, [dispatch]);

  const onMessage = useCallback(({ message }: { message: string }) => {
    showNotification(message);
  }, [showNotification]);

  useSocketEvent(socket, "randomNumber", onRandomNumber);
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


