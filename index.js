var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.broadcast.emit('new connection',
  {text: 'A user has connected'});

  socket.on('user typing', (username) => {
    io.emit('user typing', username);
  });

  socket.on('chat message', function(msg, username){
    // const messageToSend = username + ': ' + msg;
    io.emit('chat message', msg);
  });

  socket.on('not typing', () => {
    io.emit('not typing');
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('lost connection',
    { text: 'A user has disconnected.' });
  });

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
