import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
}).listen(8000);

const users = {};
const canvas = {};

// Set up Socket.IO event listeners
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("create_room", (data) => {
    const { room, name } = data;
    const roomset = io.of("/").adapter.rooms;
    if (!roomset.has(room)) {
      socket.join(room);
      users[room] = {};
      users[room][socket.id] = name;
      socket.emit("room_created", {
        res: true,
      });
      io.to(room).emit("users", { users: users[room] });
    } else {
      socket.emit("room_created", { res: false });
    }
  });
  // Handle join room event
  socket.on("join_room", (data) => {
    const { url, name } = data;
    const roomset = io.of("/").adapter.rooms;
    if (roomset.has(url)) {
      socket.join(url);
      users[url][socket.id] = name;
      socket.emit("room_joined", {
        res: true,
      });
      socket.emit("Board-data", canvas[url]);
      io.to(url).emit("users", { users: users[url] });
      io.to(url).emit("joined");
    } else {
      socket.emit("room_joined", { res: false });
    }
  });

  socket.on("remove_user", ({ user, room }) => {
    const userSocket = io.sockets.sockets.get(user);
    if (userSocket) {
      userSocket.leave(room);
      userSocket.emit("removed", room);
    }
    delete users[room][user];
    io.to(room).emit("users", { users: users[room] });
  });

  // Handle message event
  socket.on("Board", (data) => {
    canvas[data.room] = data.board;
    io.to(data.room).emit("Board-data", {
      board: canvas[data.room],
      room: data.room,
    });
  });

  socket.on("exit", (room) => {
    socket.leave(room);
  });

  // Handle disconnect event
  socket.on("disconnect", () => {
    const rooms = socket.rooms;
    console.log(rooms);
    Array.from(rooms).forEach((room) => {
      console.log(users[room][socket.id], " disconnected from: ", room);
      delete users[room][socket.id];
      io.to(room).emit("users", { users: users[room] });
    });
  });
});
