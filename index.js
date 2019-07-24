var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 3000);

var mangUser = [""];


// server lang nghe ket nooi
io.on("connection", function (socket) {
  console.log("Co nguoi ket noi: " + socket.id);  //phan biet socket
  // server lang nghe ngat ket noi

  socket.on("disconnect", function () {
    console.log(socket.id + " ngat ket noi");
    mangUser.splice(
      mangUser.indexOf(socket.UserName), 1
    );
    socket.broadcast.emit("Server-send-list", mangUser);
  });

  socket.on("client-send-user", function (data) {
    if (mangUser.indexOf(data) >= 0) {
      //false
      socket.emit("Server-send-userfailed");
    }
    else {
      //sucss
      mangUser.push(data);
      socket.UserName = data;
      socket.emit("Sever-send-loginSucc", data);
      io.sockets.emit("Server-send-list", mangUser);


    }

    //  io.sockets.emit("Server-send-data", data +"888");
    // socket.emit("Server-send-data", data +"888");
    // socket.broadcast.emit("Server-send-data", data + "888");
  });

  socket.on("logout", function () {
    mangUser.splice(
      mangUser.indexOf(socket.UserName), 1
    );
    socket.broadcast.emit("Server-send-list", mangUser);
  });

  socket.on("user-send-mess", function (data) {
    io.sockets.emit("server-send-mess", { un: socket.UserName, nd: data });
  });

  socket.on("dang-go", function () {
    var s = socket.UserName + "dang-go";
    io.sockets.emit("ai-do-dang-go", s);
  });
  socket.on("ngung-go", function () {
    var s = socket.UserName + "ngung-go";
    io.sockets.emit("ai-do-het-go", s);
  })

});


app.get("/", function (req, res) {
  res.render("trangchu");
})