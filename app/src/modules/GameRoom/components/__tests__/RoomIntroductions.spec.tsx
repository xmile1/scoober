import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RoomIntroductions } from '../RoomIntroductions';

describe('RoomIntroductions', () => {
  it('should display welcome message when no room is selected', () => {
    render(<RoomIntroductions hasNotSelectedARoom={true} isGameStarting={false} />);
    expect(screen.getByText(/Welcome to Scoober!/i)).toBeInTheDocument();
    expect(screen.getByText(/To begin the fun, select a game room of your choice./i)).toBeInTheDocument();
  });

  it('should display waiting message when waiting for player to join', () => {
    render(<RoomIntroductions isWaitingForPlayerToJoin={true} isGameStarting={false} />);
    expect(screen.getByText(/Waiting for an opponent to join.../i)).toBeInTheDocument();
  });

  it('should display starting number when game is starting', () => {
    render(<RoomIntroductions isGameStarting={true} firstNumber={3} />);
    expect(screen.getByText(/Starting Number: 3/i)).toBeInTheDocument();
  });

  it('should display game instructions when game is starting', () => {
    render(<RoomIntroductions isGameStarting={true} firstNumber={3} />);
    expect(screen.getByText(/Let the game begin!/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Adjust the Starting Number by either subtracting 1, adding 1, or keeping it the same to make it divisible by three./i
      )
    ).toBeInTheDocument();
  });
});
