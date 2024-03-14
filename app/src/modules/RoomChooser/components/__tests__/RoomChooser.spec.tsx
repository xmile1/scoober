import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@/tests/render";
import { RoomChooser } from "../RoomChooser";
import userEvent from "@testing-library/user-event";

const mockRooms = [
  { id: "1", name: "Room 1", type: "cpu", owner: "John Doe" },
  { id: "2", name: "Room 2", type: "human", owner: "Jane Doe" },
  { id: "3", name: "Room 3", type: "human", owner: "John Doe" },
];

describe("RoomChooser", () => {
  it("should display all available rooms", async () => {
    render(<RoomChooser rooms={mockRooms} onRoomClick={() => {}} />);
    expect(screen.getByText("Room 1")).toBeInTheDocument();
    expect(screen.getByText("Room 2")).toBeInTheDocument();
    expect(screen.getByText("Room 3")).toBeInTheDocument();
  });

  it("should call onRoomClick with the correct room when a room is clicked", async () => {
    const onRoomClickMock = vi.fn();
    render(<RoomChooser rooms={mockRooms} onRoomClick={onRoomClickMock} />);
    const roomButton = screen.getByText("Room 1");
    await userEvent.click(roomButton);
    expect(onRoomClickMock).toHaveBeenCalledWith(mockRooms[0]);
  });
});
