import { Page } from "@/common/components";
import { getRooms } from "@/common/services/api/rooms";
import { socket } from "@/common/services/api/socket";
import { RoomChooser } from "@/modules/RoomChooser";
import { useCallback, useEffect, useState } from "react";
import { GameOver } from "@/modules/GameOver";
import { RoomsWrapper } from "./Rooms.styles";
import { useEffect, useState } from "react";
import { Room } from "@/common/models/room";

export const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [username, setUsername] = useState<string>("");
  const [currentRoom, setCurrentRoom] = useState<Room>();

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

  const joinRoom = useCallback((room: Room) => {
      socket.emit("joinRoom", { room: room.id, username: username, roomType: room.type });
      setCurrentRoom(room);
    },
    [username]
  );


  return (
    <Page>
      <RoomsWrapper>
        <RoomChooser rooms={rooms} currentRoom={currentRoom} onRoomClick={joinRoom} />
      </RoomsWrapper>
    </Page>
  );
};
