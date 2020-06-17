const express = require('express');
const mongoose = require('mongoose');
const Car = require('../models/Car');
const router = express.Router();



// Adicionar carro - João
router.post('/addcar', async function(req, res, next){
    
    carReturn = req.body;

     var car = new Car({
        imagemUrl: carReturn.imagemUrl,
        nome: carReturn.nome,
        marca: carReturn.marca,
        placa: carReturn.placa,
        cor: carReturn.cor,
        numeroPortas: carReturn.numeroPortas,
        tipoCombustivel: carReturn.tipoCombustivel,
        quilometragem: carReturn.quilometragem,
        renavam: carReturn.renavam,
        chassi: carReturn.chassi,
        valorLocacao: carReturn.valorLocacao,
        statusLocacao: false
    });
        
    car.save(function(err, result){
        if(err){
            return res.status(500).json({
                myErroTitle: 'Um erro aconteceu na hora de salvar.',
                myError: err
            });
        }
        res.status(201).json({
            myMsgSucess: "Carro Salvo com sucesso!",
            objCarSave : result
        });
    });
});




// Get Automoveis
router.get('/', function(req, res, next){

    console.log('Funfou!');

    Car.find().exec(function(err, result){
        if(err){
            return res.status(500).json({
                myErroTitle: "Erro ao buscar os veículos."
            });
        }
        

        return res.status(200).json({
            myMsgSucess: "Todos carros coletados com sucesso!",
            objResul: result
        });
    });
});










// Deletar Carro - Pedro
router.delete('/:id', function(req, res, next){

    Car.findById(req.params.id, function(err, carroRecuperado){ //Procura o veículo pelo ID
        if(err){ //Se da erro na busca
            return res.status(500).json({
                myErroTitle: "Erro ao buscar veículo.",
                myErro: err
            });
        }

        carroRecuperado.remove(function(err, carroDeletado){ //Remove o veiculo
            if(err){ //Se der erro na remoção
                return res.status(500).json({
                    myErroTitle: "Erro ao deletar veículo.",
                    myErro: err
                });
            }

            return res.status(200).json({ //Se der tudo certo
                myMsgSucess: "Carro deletado com sucesso!",
                carroDeletado: carroDeletado
            })
        });
    });
});







// Muda Status do veículo:

router.post('/concluir', function(req, res, next){

    var objConclusao = req.body;

    Car.findById(objConclusao.idCar, function(err, carroResultRecuperado){
        if(err){
            return res.status(500).json({
                myErroTitle: "Erro ao buscar carro pelo id",
                myError: err
            })
        }
        
        if(!carroResultRecuperado){
            res.status(500).json({
                myErroTitle: "Nenhum carro encontrado!",
                myError: {info: "Não encontrado o carro com o ID: " + objConclusao.idCar}
            });
        }


        carroResultRecuperado.statusLocacao = false;


        carroResultRecuperado.save(function(err, carroAtualizado){
            if(err){
                return res.status(500).json({
                    myErroTitle: "Erro ao salvar a alteração do carro.",
                    myError: err
                });
            }

            return res.status(200).json({
                mySucessTitle: "Status Carro Alterado com sucesso!",
                objAtualizado: carroAtualizado
            });
        });
    });
});





module.exports = router;