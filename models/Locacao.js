var mongoose = require('mongoose'); // João
var Schema = mongoose.Schema;

var locacao = new Schema({

    //Meus Atributos
    statusLocacao: {type: Boolean, required: true},
    dataLocacao: {type: String, required: true},
    horaLocacao: {type: String, required: true},
    quilometragem: {type: Number, required: true},
    tipoCombustivel: {type: String, required: true},
    valorLocacao: {type: Number, required: true},
    dataDevolucao: {type: String, required: true},
    horaDevolucao: {type: String, required: true},
    idCar: {type: String, required: true},
    idUser: {type: String, required: true},
    
    
});

module.exports = Locacao = mongoose.model('locacao', locacao);