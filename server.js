const express = require('express');
const connectDB = require('./data/Connection');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


connectDB()
const Port = process.env.Port || 8877;

//Chamando as rotas
app.use('/user', require('./routers/user'));
app.use('/car', require('./routers/car'));
app.use('/locacao', require('./routers/locacao'));


app.listen(Port, () => console.log('Servidor Iniciado!'));

module.exports = app;