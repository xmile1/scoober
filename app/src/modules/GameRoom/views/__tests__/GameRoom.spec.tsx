import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameRoom } from "../GameRoom";
import { socket } from "@/tests/mocks/socket.io-client.mock";

const reusableProps = {
  history: [],
  myTurn: false,
  username: "testUser",
  currentRoom: { id: "test", type: "default", name: "Test Room", owner: "testOwner" },
  selectAnswer: () => {},
  setMyTurn: vi.fn(),
};

describe("GameRoom", () => {
  describe("when it is the user's turn", () => {
    it("should show the buttons to play", async () => {
      render(<GameRoom {...reusableProps} myTurn={true} />);
      expect(screen.getByRole("button", { name: /-1/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /0/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /\+1/i })).toBeInTheDocument();
    });
  });

  it("should emit 'sendNumber' with the correct payload on button click", async () => {
    render(<GameRoom {...reusableProps} myTurn={true} firstNumber={250} />);
    const minusOneButton = screen.getByRole("button", { name: /-1/i });
    userEvent.click(minusOneButton);
    await waitFor(() => expect(socket.emit).toHaveBeenCalledWith("sendNumber", {
      selectedNumber: -1,
      number: 250,
    }));
  });

  it("should display the history correctly", async () => {
    const history = [
      { id: "1", user: "testUser", number: 250, selectedNumber: -1, result: 83 },
      { id: "2", user: "opponentUser", number: 83, selectedNumber: 0, result: 27 },
      { id: "3", user: "testUser", number: 27, selectedNumber: 0, result: 9 },
    ];
    render(<GameRoom {...reusableProps} history={history} />);
    history.forEach(({ selectedNumber, number, result }) => {
      const formattedSelectedNumber =
        selectedNumber > 0 ? `+${selectedNumber}` : selectedNumber.toString();
      const historyText = `[ ( ${formattedSelectedNumber} + ${number} ) / 3 ] = ${result}`;
      expect(screen.getByText(historyText)).toBeInTheDocument();
    });
  });
});
