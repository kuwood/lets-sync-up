var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('build'));

var server = http.Server(app);
var io = socket_io(server);

var roomCount = 0;
var state = {
  users: false,
  video: {
    playing: false,
    position: 0
  }
};

io.on('connection', socket => {
  console.log('user connected');
  socket.emit('join attempt', 'joining testRoom');
  socket.join('testRoom');
  roomCount += 1;
  if (roomCount === 1) {
    socket.emit('isOwner', true);
  }
  io.sockets.in('testRoom').emit('roomCount', roomCount);
  socket.on('join success', joinMessage => {
    console.log('user joined room. roomCount:', roomCount);
  });
  socket.on('isReady', data => {
    let userData = data
    state.users = data.isReady;
    if (userData.isOwner) {
      io.sockets.in('testRoom').emit('roomReady', state.users);
    }
  })
  socket.on('setPosition', data => {
    state.video = data
    io.sockets.to('testRoom').emit('broadcastPosition', state.video);
    console.log(state.video);
  })
  socket.on('disconnect', data => {
    roomCount--
    if (roomCount === 1) {
      io.sockets.in('testRoom').emit('isOwner', true);
    }
    console.log('user disconnected. roomCount:', roomCount);
    io.sockets.in('testRoom').emit('roomCount', roomCount);
  })
});

server.listen(process.env.PORT || 8080);
