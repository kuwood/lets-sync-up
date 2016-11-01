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
  io.sockets.in('testRoom').emit('roomCount', roomCount);
  socket.on('join success', data => {
    console.log(data);
  });
  socket.on('isReady', data => {
    state.users = data;
    io.sockets.in('testRoom').emit('roomReady', state.users);
    console.log(state.users);
  })
  socket.on('setPosition', data => {
    state.video = data
    io.sockets.to('testRoom').emit('broadcastPosition', state.video);
    console.log(state.video);
  })
});


server.listen(process.env.PORT || 8080);
