const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

let users = [];

io.on("connection", (socket) => {

  // ❌ block extra users
  if (users.length >= 2) {
    socket.emit("full", "Only 2 users allowed ❌");
    socket.disconnect();
    return;
  }

  // assign names
  let userName = users.length === 0 ? "Me" : "User";

  users.push({ id: socket.id, name: userName });

  io.emit("users", users.map(u => u.name));

  // message
  socket.on("chat message", (msg) => {
    io.emit("chat message", {
      user: userName,
      message: msg
    });
  });

  // disconnect
  socket.on("disconnect", () => {
    users = users.filter(u => u.id !== socket.id);
    io.emit("users", users.map(u => u.name));
  });

});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log("Server running on " + PORT));