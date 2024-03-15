import { Room } from "@/common/models/room";
import http from "./http";



export const getRooms = async (): Promise<Room[]> => {
  const response = await http.fetch("/rooms");
  return response.json() as Promise<Room[]>;
};

