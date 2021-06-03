const express = require("express");
const http = require("http");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;

const router = require("./router");
let cors = require("cors");
let app = express();

app.use(cors());

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// const io = socketio(server);

io.on("connection", (socket) => {
  console.log("we have a new connection!!!");

  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room);

    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);
    console.log("add user", user);
    socket.emit("message", { user: "admin", text: `${user.name}, welcome to the room ${room}` });

    socket.broadcast.to(user.room).emit("message", { user: user.name, text: "message" });

    socket.join(user.room);

    // const error = true;
    // if (error) {
    //   callback({ error: "error 500" });
    // }
    callback();
  });

  socket.on("sendMesage", (message, callback) => {
    console.log(message);
    callback();
    console.log("socket id", socket.id);

    const user = getUser(socket.id);
    console.log("user", user);
    user && io.to(user.room).emit("message", { user: user.name, text: message });
  });

  socket.on("disconnect", () => {
    console.log("User had left !!!");
    // const user = removeUser(socket.id);
    // if (user) {
    //   io.to(user.room).emit("message", { user: "admin", text: `${user.name} has left` });
    // }
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
