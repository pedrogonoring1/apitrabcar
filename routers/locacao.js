const express = require('express');
const mongoose = require('mongoose');
const LocacaoCar = require('../models/Locacao');
const router = express.Router();



var authMiddleware = require('../config/middleware/auth');

router.use(authMiddleware);


// Realiza Locacao
router.post('/locar', async function(req, res, next){

    recebido = req.body;

    var locacao = new LocacaoCar({
        statusLocacao: true,
        dataLocacao: recebido.dataLocacao,
        horaLocacao: recebido.horaLocacao,
        quilometragem: recebido.quilometragem,
        tipoCombustivel: recebido.tipoCombustivel,
        valorLocacao: recebido.valorLocacao,
        dataDevolucao: recebido.dataDevolucao,
        horaDevolucao: recebido.horaDevolucao,
        idCar: recebido.idCar,
        idUser: recebido.idUser
    });

    locacao.save(function(err, result){
        if(err){
            return res.status(500).json({
                myErroTitle: "Houve um erro ao salver no banco.",
                myError: err
            });
        }

        return res.status(200).json({
            mySucessTitle: "Salvo no DB com sucesso!",
            objResult: result
        });
    });
});





// Concluir Locacao:
router.patch('/:id', function(req, res, next){

    var locacaoRecebida = req.body;

    LocacaoCar.findById(req.params.id, function(err, locacaoResultRecuperada){
        if(err){
            return res.status(500).json({
                myErroTitle: "Erro ao busco locacao pelo id",
                myError: err
            })
        }
        
        if(!locacaoResultRecuperada){
            res.status(500).json({
                myErroTitle: "Nenhuma locacao encontrada!",
                myError: {info: "Não encontrado a locacao com o ID: " + req.params.id}
            });
        }


        locacaoResultRecuperada.statusLocacao = locacaoRecebida.statusLocacao;


        locacaoResultRecuperada.save(function(err, locacaoConcluida){
            if(err){
                return res.status(500).json({
                    myErroTitle: "Erro ao salvar a alteração da Locacao.",
                    myError: err
                });
            }

            return res.status(200).json({
                mySucessTitle: "Locacao Alterada com sucesso!",
                objAtualizado: locacaoConcluida
            });
        });
    });

});






module.exports = router;