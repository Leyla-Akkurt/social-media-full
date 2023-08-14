const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:5173",
  },
});
let users = [];

//not push same user again again check the user first
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.sockedId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //connect the socket io server
  console.log("a user connected");
  //take socketId and userId from client
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    //send the user to the client
    io.emit("getUsers", users);
  });

  //get and send the users message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    //find the user that we send the message
    const user = getUser(receiverId);
    //to send a message to a spesific user we should use io.to(socket_id).emit method
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //disconnected the server
  socket.on("disconnected", (socket) => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
