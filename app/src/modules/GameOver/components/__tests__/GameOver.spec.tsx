import { describe, expect, it } from "vitest";
import { act, render, screen } from "@/tests/render";
import { GameOver } from "../GameOver";
import { triggerSocketEvent } from "@/tests/mocks/socket.io-client.mock";

describe("GameOver", () => {
  describe("when the user wins the game", () => {
    it("should display the winning message", async () => {
      render(<GameOver onNewGame={() => {}} username="guest1" />);
      act(() => triggerSocketEvent("gameOver", { user: "guest1" }));
      
      expect(screen.getByText("You won")).toBeInTheDocument();
    });

    it("should display the 'New Game' button", async () => {
      render(<GameOver onNewGame={() => {}} username="guest1" />);
      act(() => triggerSocketEvent("gameOver", { user: "guest1" }));
      
      expect(screen.getByRole("button", { name: /New Game/i })).toBeInTheDocument();
    });
  });

  describe("when the user loses the game", () => {
    it("should display the losing message", async () => {
      render(<GameOver onNewGame={() => {}} username="guest1" />);
      act(() => triggerSocketEvent("gameOver", { user: "guest2" }));
      
      expect(screen.getByText("You lost")).toBeInTheDocument();
    });

    it("should display the 'New Game' button", async () => {
      render(<GameOver onNewGame={() => {}} username="guest1" />);
      act(() => triggerSocketEvent("gameOver", { user: "guest2" }));
      
      expect(screen.getByRole("button", { name: /New Game/i })).toBeInTheDocument();
    });
  });
});
