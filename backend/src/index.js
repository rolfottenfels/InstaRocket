const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// Permite o suporte aos protocolos http e websocket (comunicação em tempo real) no servidor
const server = require('http').Server(app);
const io =  require('socket.io')(server);

// Conecção à Base de Dados
mongoose.connect('mongodb+srv://usuario:senha@cluster0.fhilo.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

// Repassa o suporte Socket.IO para todas as rotas
app.use((req, res, next) => {
  req.io = io;

  next();
})

// Permite o acesso a aplicação de todos os servidores e IPs
app.use(cors());

// Rotas para arquivos remotos
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))); //Rota para acesso direto dos arquivos via rota /files

app.use(require('./routes'));

server.listen(3333);
