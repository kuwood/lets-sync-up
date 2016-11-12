var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('build'));

var server = http.Server(app);
var io = socket_io(server);

var roomStates = {}
var state = function() {
  this.room = {
    ready: false,
    ownerReady: false,
    id: null,
    count: 0
  };
  this.users = {};
  this.video = {
    id: null,
    playing: false,
    position: 0
  };
};

function leaveRoom(socket) {
  let rooms = socket.rooms
  console.log(socket, 'MASsIVE DISCONNECT SOCKET OBJECT');
  console.log(rooms, 'SOCKET IS LEAVING FROM THESE ROOMS');
  for (let room in rooms) {
    console.log('HIIIIIIIIIIII');
    console.log('HIIIIIIIIIIII');
    console.log('HIIIIIIIIIIII');
    console.log('HIIIIIIIIIIII');
    if (room.substring(0,4) === 'room') {
      // delete user from room
      roomStates[room].room.count -= 1;
      delete roomStates[room].users[socket.id];
      console.log('user disconnected. roomCount:', roomStates[room].room.count);
      // re assign owner
      if (roomStates[room].room.count === 1) {
        io.sockets.in(room).emit('isOwner', true);
      }
      if (Object.keys(roomStates[room].users).length < 1) {
        delete roomStates[room]
      } else {
        // check room ready status
        roomReady(roomStates[room])
        io.sockets.in(room).emit('roomCount', roomStates[room].room.count);
      }
    }
  }
}

function roomReady(roomState) {
  console.log('checl room ready', roomState.room);
  let readyCount = 0;
  console.log(roomState.users);
  let userLength = Object.keys(roomState.users).length
  // check to see if all users are ready
  for (let key in roomState.users) {
    if (roomState.users.hasOwnProperty(key)) {
      if (roomState.users[key].isReady) readyCount++;
    };
  };
  // if all are ready change state to room ready
  console.log(userLength, 'length/readyCount', readyCount);
  if ( userLength === 1 || userLength - 1 === readyCount || userLength === readyCount) {
    console.log('assigning room state true');
    roomState.room.ready = true;
    io.sockets.in(roomState.room.id).emit('roomReady', roomState.room.ready);
  } else {
    console.log('assigning room state false');
    roomState.room.ready = false;
    io.sockets.in(roomState.room.id).emit('roomReady', roomState.room.ready);
  };
}

io.on('connection', socket => {
  // TODO: Transfer state logic based on room
  console.log('user connected', socket.id);
  console.log(roomStates);

  socket.on('createRoom', () => {
    console.log('createRoom request');
    var room = `room${socket.id}`;
    console.log(room, 'will be joined');
    socket.join(room);
    console.log(socket.adapter.rooms, 'rooooooooooooooooooom');
    roomStates[room] = new state()
    roomStates[room].room.id = room
    console.log(roomStates[room]);
    socket.emit('roomRedirect', room);
    // add new user to state on channel join
    roomStates[room].users[socket.id] = {
      isOwner: true
    };
    // roomStates[room].room.count += 1;
    // socket.emit('isOwner', true);
    // roomReady(roomStates[room])
    console.log(`user joined ${room}. roomCount: ${roomStates[room].room.count}, room ready ${roomStates[room].room.ready}`);
  });

  socket.on('joinRoom', roomId => {
    // if not in room join the room
    if (!Object.keys(socket.rooms).includes(roomId)) socket.join(roomId);
    // add new user to state on channel join
    console.log(roomId, 'is roomId');
    roomStates[roomId].users[socket.id] = {
      isReady: false
    };
    roomStates[roomId].room.count += 1;
    // handle owner assignment
    if (roomStates[roomId].room.count === 1) {
      socket.emit('isOwner', true);
      roomStates[roomId].users[socket.id].isOwner = true;
    };
    // pass video
    if (roomStates[roomId].video.id) socket.emit('setVideo', roomStates[roomId].video.id)
    // room ready check
    console.log(roomStates[roomId], 'THIS WHOLE ROOMS STATE');
    roomReady(roomStates[roomId])
  });

  // assign videoId by passing id(video) and room(id)
  socket.on('videoId', data => {
    console.log('got id', data);
    roomStates[data.room].video['id'] = data.id;
    console.log(roomStates[data.room].video.id, 'state id');
    // console.log(roomStates[data.room].users, 'current users');

    // io.sockets.in(data.room).emit('roomCount', 'just testing')
    io.sockets.in(data.room).emit('setVideo', roomStates[data.room].video.id)
  })

  // handle isReady
  socket.on('isReady', data => {
    console.log(roomStates);
    console.log(socket.id, 'isReady ', data, 'room ready ', roomStates[data.room].room.ready);
    roomStates[data.room].users[socket.id].isReady = data.isReady;
    roomReady(roomStates[data.room]);
  });

  // handle ownerReady
  socket.on('ownerReady', data => {
    console.log('ownerReady is', data.ownerReady);
    roomStates[data.room].room.ownerReady = data.ownerReady
    io.sockets.in(data.room).emit('roomOwnerStatus', roomStates[data.room].room.ownerReady)
  });

  // handle position setting
  socket.on('setPosition', data => {
    console.log(data, 'videodod');
    roomStates[data.room].video.position = data.position;
    io.sockets.in(data.room).emit('broadcastPosition', roomStates[data.room].video.position);
    console.log(roomStates[data.room].video);
  });

  // handle leaving room/room change
  socket.on('leaveRoom', roomId => {
    console.log(socket.rooms, 'socket before leave');
    socket.leave(roomId)
    leaveRoom(socket)
    console.log(socket.rooms, 'socket after leave');
  })

  // handle disconnects
  socket.on('disconnecting', ()=> {
    leaveRoom(socket)
  })


  socket.on('disconnect', data => {
    console.log('A disconnect happened');
    console.log(roomStates);
    console.log('....');
    console.log('....');
    console.log('bye bye.');
  });
});

server.listen(process.env.PORT || 8080);
