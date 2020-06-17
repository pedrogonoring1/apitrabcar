// Mateus
var mongoose = require('mongoose'); // João
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var car = new Schema({

    //Meus Atributos
    imagemUrl: {type: String, required: true},
    nome: {type: String, required: true},
    marca: {type: String, required: true},
    placa: {type: String, required: true, unique: true},
    cor: {type: String, required: true},
    numeroPortas: {type: Number, required: true},
    tipoCombustivel: {type: String, required: true},
    quilometragem: {type: Number, required: true},
    renavam: {type: String, required: true},
    chassi: {type: String, required: true, unique: true},
    valorLocacao: {type: Number, required: true},
    statusLocacao: {type: Boolean, required: true},
    
});

car.plugin(mongooseUniqueValidator);

module.exports = Car = mongoose.model('car', car);