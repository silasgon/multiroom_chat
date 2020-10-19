/*importar as configs do servidor*/
var app = require('./config/server');


/*Parametrizar a porta de escuta */
var server = app.listen(80, function(){
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);

app.set('io', io);

/* Criar a conexão por websocket */
io.on('connection', function (socket) {
    console.log('o usuario conectou');

    socket.on('disconnect', function () {
        console.log('Usuario desconectou');
    })

    socket.on('msgParaServidor', function(data){
        socket.emit('msgParaCliente',
        {apelido: data.apelido, mensagem: data.mensagem })
    });

    socket.broadcast.emit(
        'msgParaCliente',
        {apelido: data.apelido, mensagem: data.mensagem }
    );

});