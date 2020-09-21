var app = require ('express')();
var server = require('http').Server(app);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Serveur sur port : ', PORT)
    })
    //server.listen(3000);

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');

});

//après l'initialisation des serveur
var io = require('socket.io')(server);

//après la route
io.on('connection', function(socket){
    socket.on('message_send', function(message) {
        io.emit('message_broadcast', message);
    });
    socket.on('disconnect', function() {
        io.emit('message_broadcast', 'déconnexion d\'un navigateur');
    });
});

