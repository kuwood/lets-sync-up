var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('build'));

var server = http.Server(app);
var io = socket_io(server);

var roomCount = 0;
var state = {
  room: {
    ready: false,
    ownerReady: false
  },
  users: {},
  video: {
    playing: false,
    position: 0
  }
};

function roomReady() {
  let readyCount = 0;
  let userLength = Object.keys(state.users).length
  // check to see if all users are ready
  for (let key in state.users) {
    if (state.users.hasOwnProperty(key)) {
      if (state.users[key].isReady) readyCount++;
    };
  };
  // if all are ready change state to room ready
  console.log(userLength, 'length/readyCount', readyCount);
  if ( userLength === 1 || userLength - 1 === readyCount || userLength === readyCount) {
    state.room.ready = true;
    io.sockets.in('testRoom').emit('roomReady', state.room.ready);
  } else {
    state.room.ready = false;
    io.sockets.in('testRoom').emit('roomReady', state.room.ready);
  };
}

io.on('connection', socket => {
  socket.join('testRoom');
  roomCount += 1;
  console.log('user connected', socket.id);
  console.log('user joined testRoom. roomCount:', roomCount, 'room ready', state.room.ready);

  // add new connection to state
  state.users[socket.id] = {
    isReady: false
  };
  console.log(state.users);

  // handle owner assignment
  if (roomCount === 1) {
    socket.emit('isOwner', true);
    state.users[socket.id].isOwner = true;
  };
  roomReady()
  io.sockets.in('testRoom').emit('roomCount', roomCount);

  // handle isReady
  socket.on('isReady', data => {
    console.log(socket.id, 'isReady ', data, 'room ready ', state.room.ready);
    state.users[socket.id].isReady = data.isReady;
    roomReady();
  });

  // handle ownerReady
  socket.on('ownerReady', bool => {
    console.log('ownerReady is', bool);
    state.room.ownerReady = bool
    io.sockets.in('testRoom').emit('roomOwnerStatus', state.room.ownerReady)
  });

  // handle position setting
  socket.on('setPosition', data => {
    state.video = data;
    io.sockets.to('testRoom').emit('broadcastPosition', state.video);
    console.log(state.video);
  });

  // handle disconnects
  socket.on('disconnect', data => {
    delete state.users[socket.id];
    roomCount--;
    if (roomCount === 1) {
      io.sockets.in('testRoom').emit('isOwner', true);
    }
    roomReady()
    console.log('user disconnected. roomCount:', roomCount);
    io.sockets.in('testRoom').emit('roomCount', roomCount);
  });
});

server.listen(process.env.PORT || 8080);
