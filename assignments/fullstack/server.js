const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

//Config used to indicate the location of the frontend files.
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

//Render the index when the main page is accessed.
app.use("/", (request, response) => {
  response.render("index.html");
});

//Receives the message from the user and returns the same message.
io.on("connection", (socket) => {
  console.log(`new connection: ${socket.id}`);

  socket.on("sendMessage", (data) => {
    socket.emit("currentMessage", data);
  });
});

server.listen(5000, () => console.log("Server Started..."));
