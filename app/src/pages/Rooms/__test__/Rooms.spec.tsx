import { describe, expect, it } from "vitest";
import { act, render, screen } from "@/tests/render";
import { Rooms } from "../Rooms";
import { triggerSocketEvent } from "@/tests/mocks/socket.io-client.mock";

describe("Rooms", () => {
    it("displays the history upon receiving a 'randomNumber' event", async () => {
      render(<Rooms />);

      act(() => triggerSocketEvent("randomNumber", { isFirst: false, number: 5, selectedNumber: 1, user: "guest1" }));

      expect(screen.getByText("[ ( +1 + 0 ) / 3 ] = 5")).toBeInTheDocument();
    });
});
