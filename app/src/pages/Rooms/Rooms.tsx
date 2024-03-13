import { Page } from "@/common/components";
import { getRooms } from "@/common/services/api/rooms";
import { RoomChooser } from "@/modules/RoomChooser";
import {  RoomsWrapper } from "./Rooms.styles";
import { Room } from "@/common/models/room";

export const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room>();

  useEffect(() => {
    async function fetchRooms() {
      const roomsData = await getRooms();
      setRooms(roomsData);
    }

    fetchRooms();
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
