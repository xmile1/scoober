# Scoober Frontend Challenge Server Side

![](https://img.shields.io/badge/Code-NodeJs-informational?style=flat&logo=Node.js&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Code-Typescript-informational?style=flat&logo=typescript&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Editor-VsCode-informational?style=flat&logo=visualstudio&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Code-JsonServer-informational?style=flat&logo=json&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Tools-Socket.io-informational?style=flat&logo=socket.io&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Tools-Docker.io-informational?style=flat&logo=Docker&logoColor=white&color=2bbc8a)
![](https://img.shields.io/badge/Package-Npm-informational?style=flat&logo=npm&logoColor=white&color=2bbc8a)


# Introduction
This is the server part of the challenge which can be optionally use by the candidate to complete the frontend technical challenge. This is using socket.io to serve the communication between clients. Clients can subscribe to different events to complete the requirements.
​
## Technical Challenge
​
### Goal
​
The Goal is to implement a game with two independent units – the players – communicating with each other using an API.
​
### Description
​
When a player starts, they incept a random (whole) number and send it to the second player as an approach of starting the game. The receiving player can then choose between adding one of {-1,0,1} in order to get to a number that is divisible by 3. The resulting whole number is then sent back to the original sender.
​
The same rules are applied until one player reaches the number 1 (after the division. See example below.) https://invis.io/JHN2247E9MK
​
Also feel free to use the provided design screens and assets.

For each "move", a sufficient output should be generated (mandatory: the added, and the resulting number).
​
Both players should be able to play automatically without user input. One of the players should optionally be adjustable by a user.
​
### Notes & Requirements
​
- Each player has to be ​logged in before they start to play 
- Games should be playable under rooms, as default we are provided the rooms ( two rooms againts CPU and one ) please look at: **fakeDb/fake.json** or [API Docu](https://documenter.getpostman.com/view/17986533/UV5XhxLB)
- Each player runs on its own (independent programs, two browsers, web‐workers or a choice of your own).
- Communication via an API (REST, Sockets).
- A player may not be available when the other one starts.
- Try to be platform independent, in other words the project must be runnable easily in every environment.
- Please share your project on GitHub and send us the link.
​
### Extras
​
Implementing a fancy UI using (and improving) provided design

### **Required Technologies**
- React
- Redux
- Typescript
- Unit Test (Jest etc...)

# Getting Started

First clone the repository in your local, you have two different option for starting the application first is with **Docker** and the second is for **NON Docker Users** you can choose one of them.

### **Docker Desktop Users**
 - `docker-compose up --build`

### **Non Docker Users**
 in your root directory where the repository is cloned 
 - `cd ./wss`
 - `npm install`
 - starting the fake DB JsonServer: `npm run start:server` 
 - open a new terminal and type: `npm run start` this will established the socket connection


# Available Socket Events
 Below you will find a list from available events, might be usefull during your development, 
## Broadcast Events from Server => Client
 -  **`randomNumber`**
 -  **`activateYourTurn`**
 -  **`gameOver`**
 -  **`onReady`**
 -  **`error`**
 - **`message`**
 - **`listTrigger`**

## Fired events from Client Side => Server
- **`connection`**
- **`login`**
- **`joinRoom`**
-  **`sendNumber`**
-  **`leaveRoom`**
-  **`letsPlay`**

### **connection**
 when the connection is established with socket on client side

### **login**
when the user is logged in to the game, it creates a user data on fakeDB and broadcast a `message` event after promise is resolved

### **joinRoom**
when the user join the room via client side
it assing the client to the room, broadcast a `message` event after the promise is resolved. and it lets the user join the room and broadcast an `onReady` event. If the room type is CPU the `maxRoomSize` is 1 otherwise it will be waiting for the second opponent

### **letsPlay**
after the event is fired from the client-side it sends a request to fakeDb to get the userDetail,after success result it broadcast the  `randomNumber` event to the room which will visible for all opponents, and it broadcast `activateYourTurn` and the first connected use starts to play

### **sendNumber**
it sends the number back from the client with selected one of the numbers ( 1,0,-1), it broadcast `randomNumber` event with the calculated result back and activate the opponents turn with the `activateYourTurn` event, for CPU users this section is automated please look at the **code line 113**


# Fake DB JsonServer
It's server which creates full fake REST API for more detail

[JSON Server Document](https://github.com/typicode/json-server)
as default we are set three rooms
please check the `./fakeDb/fake.json` file

**Some Helpful API Methods**

[API DOCUMENT](https://documenter.getpostman.com/view/17986533/UV5XhxLB)



