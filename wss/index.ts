import express from "express";
import * as http from "http";
import SocketIO from "socket.io";

import APIService from "./api.service";

const port = 8082;
const server = http.createServer(express);
const io = SocketIO(server);
const apiService = new APIService();

enum GameState {
  WAIT = "wait",
  PLAY = "play",
}

io.on("connection", (socket) => {
  socket.on("login", ({ username }) => {
    apiService
      .createUser(socket.id, username)
      .then(() => {
        socket.emit("message", {
          user: username,
          message: `Welcome ${username}`,
          socketId: socket.id,
        });
      })
      .catch((err) => {
        socket.emit("error", { message: err });
      });
  });

  /* Join to the room */
  socket.on("joinRoom", async ({ username, room, roomType }) => {
    const maxRoomSize = roomType === "cpu" ? 1 : 2;

    const _room = io.sockets.adapter.rooms[room];
    if (_room?.length === maxRoomSize) {
      socket.emit("message", { message: "Room is full" });
      return;
    }

    try {
      const result = await apiService.getUserDetail(socket.id);
      const currentRoom = result?.data.room;
      if (currentRoom) {
        socket.leave(currentRoom);
        socket.to(currentRoom).emit("message", {
          user: username,
          message: `${username} has left the room.`,
          room: currentRoom,
        });
      }
    } catch (err) {
      socket.emit("error", { message: err });
    }

    apiService
      .assignRoom(room, socket.id, roomType)
      .then(() => {
        socket.emit("message", {
          user: username,
          message: `welcome to room ${room}`,
          room: room,
        });
        if (roomType !== "cpu") {
          socket.broadcast.to(room).emit("message", {
            user: username,
            message: `has joined ${room}`,
            room: room,
          });
        }

        /* Check the room with how many socket is connected */
        socket.join(room, () => {
          if (
            io.nsps["/"].adapter.rooms[room] &&
            io.nsps["/"].adapter.rooms[room]?.length === maxRoomSize
          ) {

            const players = Object.keys(io.sockets.adapter.rooms[room]?.sockets ?? {});

            if (roomType === "cpu") {
              players.forEach(playerSocketId => {
                io.to(playerSocketId).emit("opponentName", {
                  opponentName: "AI",
                });
              });
            } else {
              Promise.all(players.map(playerSocketId => apiService.getUserDetail(playerSocketId)))
                .then(playerDetails => {
                  playerDetails.forEach((player, index) => {
                    const opponent = playerDetails[(index + 1) % playerDetails.length];
                    io.to(player?.data.id).emit("opponentName", {
                      opponentName: opponent?.data.name,
                    });
                  });
                });
            }

            io.to(room).emit("onReady", {
              state: true,
              userId: Object.keys(
                io.sockets.adapter.rooms[room]?.sockets ?? {}
              )[0],
            });


          }
        });
      })
      .catch((err) => {
        socket.emit("error", { message: err });
      });
  });

  /* Start the game and send the first random number with turn control */
  socket.on("letsPlay", () => {
    apiService
      .getUserDetail(socket.id)
      .then((result) => {
        io.to(result?.data.room).emit("randomNumber", {
          number: `${apiService.createRandomNumber(1999, 9999)}`,
          isFirst: true,
        });

        io.to(result?.data.room).emit("activateYourTurn", {
          user: Object.keys(io.sockets.adapter.rooms[result?.data.room]?.sockets ?? {})[0] || null,
          state: GameState.PLAY,
        });
      })
      .catch((err) => {
        socket.emit("error", { message: err });
      });
  });

  /* Send Calculated number back with Divisible control */
  socket.on("sendNumber", ({ number, selectedNumber }) => {
    apiService.getUserDetail(socket.id).then((result) => {
      const numbers = [selectedNumber, number];
      const sumValues = (num: number[]) => {
        return num.reduce((a: number, b: number) => {
          return a + b;
        });
      };

      const calculationResult = (number: number[], numberB: number): number => {
        const res = sumValues(number);
        if (res % 3 == 0) {
          return res / 3;
        } else {
          return numberB;
        }
      };

      const lastResult = calculationResult(numbers, number);

      // When the second oponnent is a CPU
      if (result?.data?.roomType === "cpu") {
        // After clients selection it will wait 2 seconds for the CPU selection

        setTimeout(() => {
          const setOfRandomNumbers = [1, 0, -1];
          const randomCPU =
            setOfRandomNumbers[
            Math.floor(Math.random() * setOfRandomNumbers.length)
            ];
          const combinedNumbers = [randomCPU, lastResult];
          const CPUResult = calculationResult(combinedNumbers, lastResult);
          io.to(result?.data.room).emit("randomNumber", {
            number: calculationResult(combinedNumbers, lastResult),
            isFirst: false,
            user: "CPU",
            selectedNumber: randomCPU,
            isCorrectResult: CPUResult == lastResult ? false : true,
          });

          io.to(result?.data.room).emit("activateYourTurn", {
            user: socket.id,
            state: GameState.PLAY,
          });

          if (calculationResult(combinedNumbers, lastResult) === 1) {
            io.to(result?.data.room).emit("gameOver", {
              user: "CPU",
              isOver: true,
            });
          }
        }, 2000);
      }
      io.to(result?.data.room).emit("randomNumber", {
        number: calculationResult(numbers, number),
        isFirst: false,
        user: result?.data.name,
        selectedNumber: selectedNumber,
        isCorrectResult:
          calculationResult(numbers, number) == number ? false : true,
      });

      io.to(result?.data.room).emit("activateYourTurn", {
        user: socket.id,
        state: GameState.WAIT,
      });

      /* if 1 is reached than emit the GameOver Listener */
      if (calculationResult(numbers, number) == 1) {
        io.to(result?.data.room).emit("gameOver", {
          user: result?.data.name,
          isOver: true,
        });
      }
    });
  });

  /* Clear all data and states when the user leave the room */
  socket.on("leaveRoom", () => {
    apiService.getUserDetail(socket.id).then((result) => {
      io.to(result?.data.room).emit("onReady", { state: false });
      apiService.removeUserFromRoom(socket.id).then(() => {
        socket.leave(result?.data.room);
      });
    });
  });

  /* OnDisconnet clear all login and room data from the connected socket */
  socket.on("disconnect", () => {
    apiService.getUserDetail(socket.id).then((result) => {
      socket.broadcast.to(result?.data.room).emit("onReady", { state: false });
      apiService.removeUserFromRoom(socket.id).then(() => {
        socket.leave(result?.data.room);
      });
    });

    // Clear selected user from FakeDb and broadcast the event to the subscribers
    apiService.clearUser(socket.id).then(() => {
      socket.broadcast.emit("listTrigger", `${true}`);
    });
  });
});

server.listen(port, () => {
  console.log(
    `Socket Connection Established on ${process.env.HOST_LOCAL} in port ${process.env.SOCKET_PORT}`
  );
});
