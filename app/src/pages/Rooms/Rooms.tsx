import { Page } from "@/common/components";
import { getRooms } from "@/common/services/api/rooms";
import { socket } from "@/common/services/api/socket";
import { RoomChooser } from "@/modules/RoomChooser";
import { GameRoom } from "@/modules/GameRoom";
import { useCallback, useEffect, useState } from "react";
import { GameOver } from "@/modules/GameOver";
import { useSocketEvent } from "@/common/hooks";
import { GameRoomWrapper, RoomsWrapper } from "./Rooms.styles";
import { HistoryItem, Room } from "@/common/models/room";

export const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [username, setUsername] = useState<string>("");
  const [myTurn, setMyTurn] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [currentRoom, setCurrentRoom] = useState<Room>();
  const [opponentName, setOpponentName] = useState<string>("");


  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    async function fetchRooms() {
      const roomsData = await getRooms();
      setRooms(roomsData);
    }

    fetchRooms();
  }, []);

  useEffect(() => {
    const login = () => {
      const username = `guest${Math.floor(Math.random() * 10000 + 90000)}`;
      setUsername(username);
      socket.emit("login", { username });
    };
    login();
  }, []);

  const onRandomNumber = useCallback(
    ({
      isFirst,
      number,
      selectedNumber,
      user,
    }: {
      isFirst: boolean;
      number: number;
      selectedNumber?: number;
      user: string;
    }) => {
      if (isFirst) {
        setFirstNumber(number);
        return;
      }

      setHistory((prevHistory) => {
        const lastResult = prevHistory?.at(-1)?.result ?? firstNumber;
        const historyItem: HistoryItem = {
          selectedNumber: selectedNumber!,
          number: lastResult,
          result: number,
          user,
          id: Math.random().toString(16).substring(2, 8),
        };
        return [...prevHistory, historyItem];
      });
    },
    [firstNumber]
  );

  useSocketEvent(socket, "randomNumber", onRandomNumber);

  useSocketEvent(socket, "opponentName", ({opponentName}: {opponentName: string}) => {
    setOpponentName(opponentName);
  });

  const joinRoom = useCallback((room: Room) => {
      socket.emit("joinRoom", { room: room.id, username: username, roomType: room.type });
      setCurrentRoom(room);
    },
    [username]
  );

  const startGame = useCallback(
    (room?: Room) => {
      setHistory([]);
      setFirstNumber(0);
      setMyTurn(false);
      joinRoom(room ?? (currentRoom as Room));
    },
    [currentRoom, joinRoom]
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
            setMyTurn={setMyTurn}
            username={username}
          />
        </GameRoomWrapper>
      </RoomsWrapper>
    </Page>
  );
};
