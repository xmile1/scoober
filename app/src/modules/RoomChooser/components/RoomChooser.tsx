import { useEffect } from "react";
import styled from "styled-components";

import { getRooms } from "@/common/services/api/rooms";
import { Room } from "@/common/models/room";

import { useAppDispatch } from "@/common/hooks";
import { setRooms } from "@/store/roomsSlice";

import { Text, RoomButton } from "@/common/components";

const Wrapper = styled.div`
  padding: 16px 16px 16px 24px;
`;

const RoomsList = styled.ul`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

type RoomChooserProps = {
  rooms: Room[];
  currentRoom?: Room | null;
  onRoomClick: (room: Room) => void;
};

export const RoomChooser = ({ rooms, currentRoom, onRoomClick }: RoomChooserProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchRooms() {
      const roomsData = await getRooms();
      dispatch(setRooms(roomsData));
    }

    fetchRooms();
  }, [dispatch]);

  const isActiveRoom = (room: Room) => room.id === currentRoom?.id;

  return (
    <Wrapper>
      <Text as="h4" weight="bold" color="secondary-text">
        Choose your game room
      </Text>
      <RoomsList>
        {rooms.map((room) => (
          <RoomButton isActive={isActiveRoom(room)} key={room.id} onClick={() => onRoomClick(room)}>
            <Text weight="bold" color="secondary-text">
              {room.name}
            </Text>
          </RoomButton>
        ))}
      </RoomsList>
    </Wrapper>
  );
};
