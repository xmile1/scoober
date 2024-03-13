import { Page } from "@/common/components";
import { getRooms } from "@/common/services/api/rooms";
import { socket } from "@/common/services/api/socket";
import { RoomChooser } from "@/modules/RoomChooser";
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

  return (
    <Page>
      <RoomsWrapper>
        <RoomChooser rooms={rooms} currentRoom={currentRoom} onRoomClick={()=>{}} />
        <div/>

      </RoomsWrapper>
    </Page>
  );
};
