//Joao
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

var Schema = new Schema({
    imagemUrl: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    cpf: {type: String, required: true},
    bairro: {type: String, required: true},
    estado: {type: String, required: true},
    cidade: {type: String, required: true},
    quilometragemRodada: {type: Number, required: false},
});

Schema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

module.exports = mongoose.model('User', Schema);