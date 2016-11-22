/*eslint no-console: */
// eslint-disable-next-line
'use strict'
// .includes polyfill
if (!Array.prototype.includes) {
  // eslint-disable-next-line
  Array.prototype.includes = function(searchElement /*, fromIndex*/) {
    if (this == null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }

    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         // eslint-disable-next-line
         (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}

var http = require('http');
var path = require('path')
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
  this.chat = {
    messages: []
  }
};

var message = function(user, message) {
  this.user = user;
  this.message = message;
}

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

function leaveRoom(socket, customRoom) {
  if (!customRoom) {
    let rooms = socket.rooms
    console.log(rooms, 'SOCKET IS LEAVING FROM THESE ROOMS');
    for (let room in rooms) {
      if (room.substring(0,4) === 'room') {
        // owner flag for the leaving socket
        let isOwner = false
        if (roomStates[room].users[socket.id].isOwner) {
          isOwner = true
        }
        // delete user from room
        roomStates[room].room.count -= 1;
        delete roomStates[room].users[socket.id];
        console.log('user disconnected. roomCount:', roomStates[room].room.count);
        if (Object.keys(roomStates[room].users).length < 1) {
          delete roomStates[room]
        } else if (Object.keys(roomStates[room].users).length === 1) {
          let newOwner = Object.keys(roomStates[room].users)[0]
          roomStates[room].users[newOwner].isOwner = true
          io.sockets.in(room).emit('isOwner', true);
          updateClientUsersList(roomStates[room])
          roomReady(roomStates[room])
        } else {
          if (isOwner) {
            let newOwner = Object.keys(roomStates[room].users)[0]
            roomStates[room].users[newOwner].isOwner = true
            io.to(newOwner).emit('isOwner', true);
          }
          updateClientUsersList(roomStates[room])
          roomReady(roomStates[room])
        }
      }
    }
  } else {
    let room = customRoom
    // owner flag for the leaving socket
    let isOwner = false
    if (roomStates[room].users[socket.id].isOwner) {
      isOwner = true
    }
    // delete user from room
    roomStates[room].room.count -= 1;
    delete roomStates[room].users[socket.id];
    console.log('user disconnected. roomCount:', roomStates[room].room.count);
    if (Object.keys(roomStates[room].users).length < 1) {
      delete roomStates[room]
    } else if (Object.keys(roomStates[room].users).length === 1) {
      let newOwner = Object.keys(roomStates[room].users)[0]
      roomStates[room].users[newOwner].isOwner = true
      io.sockets.in(room).emit('isOwner', true);
      updateClientUsersList(roomStates[room])
      roomReady(roomStates[room])
    } else {
      if (isOwner) {
        let newOwner = Object.keys(roomStates[room].users)[0]
        roomStates[room].users[newOwner].isOwner = true
        io.to(newOwner).emit('isOwner', true);
      }
      updateClientUsersList(roomStates[room])
      roomReady(roomStates[room])
    }
  }

}

function roomReady(roomState) {
  console.log('check room ready', roomState.room);
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

function updateClientUsersList(room) {
  let usersList = room.users
  console.log(usersList, 'server side userss');
  io.sockets.in(room.room.id).emit('users', usersList)
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
      id: socket.id
    };
    console.log(`user joined ${room}. roomCount: ${roomStates[room].room.count}, room ready ${roomStates[room].room.ready}`);
  });

  socket.on('joinRoom', roomId => {
    // create room if it does not exist and add socket to users
    if (!roomStates[roomId]) {
      roomStates[roomId] = new state()
      roomStates[roomId].room.id = roomId
      console.log(roomStates[roomId]);
      roomStates[roomId].users[socket.id] = {
        id: socket.id
      };
    }
    // check sockets rooms for roomId if not there join room
    if (!Object.keys(socket.rooms).includes(roomId)) socket.join(roomId);
    // add new user to state on channel join
    console.log(roomId, 'is roomId');
    if (!roomStates[roomId].users[socket.id]) {
      roomStates[roomId].users[socket.id] = {
        id: socket.id,
        isReady: false
      }
    }
    roomStates[roomId].room.count += 1;
    // handle owner re assignment
    if (roomStates[roomId].room.count === 1) {
      socket.emit('isOwner', true);
      roomStates[roomId].users[socket.id].isOwner = true;
    }
    // set alias
    if (!roomStates[roomId].users[socket.id].alias) {
      let newAlias = `user${roomStates[roomId].room.count}`
      roomStates[roomId].users[socket.id].alias = newAlias
      socket.emit('requestAlias', newAlias)
    }
    // pass video
    if (roomStates[roomId].video.id) socket.emit('setVideo', roomStates[roomId].video.id)
    // room ready check
    console.log(roomStates[roomId], 'THIS WHOLE ROOMS STATE');
    updateClientUsersList(roomStates[roomId])
    roomReady(roomStates[roomId])
  });

  socket.on('setAlias', aliasData => {
    let roomId = aliasData.roomId
    roomStates[roomId].users[socket.id].alias = aliasData.name
    updateClientUsersList(roomStates[roomId])
  })

  // assign videoId by passing id(video) and room(id)
  socket.on('videoId', data => {
    console.log('got id', data);
    roomStates[data.room].video['id'] = data.id;
    console.log(roomStates[data.room].video.id, 'state id');
    io.sockets.in(data.room).emit('setVideo', roomStates[data.room].video.id)
  })

  // handle isReady
  socket.on('isReady', data => {
    console.log(roomStates);
    console.log(socket.id, 'isReady ', data, 'room ready ', roomStates[data.room].room.ready);
    roomStates[data.room].users[socket.id].isReady = data.isReady;
    roomReady(roomStates[data.room]);
    updateClientUsersList(roomStates[data.room])
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
    socket.leave(roomId)
    if (roomId.substring(0,4) === 'room') {
      leaveRoom(socket)
    } else {
      leaveRoom(socket, roomId)
    }
  })

  // handle disconnects
  socket.on('disconnecting', data => {
    let rooms = socket.rooms
    let customRoom
    for (let room in rooms) {
      if (rooms.hasOwnProperty(room)) {
        if (room !== socket.id && room.substring(0,4) !== 'room') {
          customRoom = room
        }
      }
    }
    console.log(rooms, '**************************');
    if (customRoom) {
      leaveRoom(socket, customRoom)
    } else {
      leaveRoom(socket)
    }
  })

  socket.on('kickUser', user => {
    io.sockets.connected[user.id].leave(user.room)
    if (user.room.substring(0,4) === 'room') {
      leaveRoom(io.sockets.connected[user.id])
    } else {
      leaveRoom(io.sockets.connected[user.id], user.room)
    }
    io.to(user.id).emit('sendHome')
    roomReady(roomStates[user.room])
  })

  // chatttt
  socket.on('newMessage', data => {
    let room = data.room
    let user = roomStates[room].users[socket.id].alias
    let chatMessage = new message(user, data.message)
    let roomChat = roomStates[room].chat.messages
    console.log(chatMessage);
    roomStates[room].chat.messages.push(chatMessage)
    console.log(roomChat, 'is room chat');
    io.sockets.in(room).emit('chatMessage', roomChat[roomChat.length - 1])
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
