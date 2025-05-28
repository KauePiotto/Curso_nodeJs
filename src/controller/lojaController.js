import { calcularTotal } from "../service/loja/PedidoCompletoService.js";
import { calcularValorParcelas } from "../service/loja/PedidoCompletoService.js";

import { ValidarPedidoCompleto } from "../validation/loja/pedidoCompletoValidation.js";

import { logError } from "../utils/log.js/log.js";
import { criarErro } from "../utils/log.js/erroUtils.js";

import { Router } from "express";


const endepoints = Router();

//Usando parâmetro combinado 
endepoints.post('/loja/pedido', (req, resp) => {
    try {
        if (!req.body.parcelas || isNaN(req.body.parcelas)) throw new Error('O parâmetro parcela está inválido.');

        let total = req.body.total;
        let parcelas = req.body.parcelas;
        let cupom = req.query.cupom;

        if (parcelas > 1) {
            let juros = total * 0.05;
            total += juros;
        }

        if (cupom == 'QUERO100') {
            total -= 100;
        } else {
            if (!req.query.cupom) throw new Error('O cupom está inválido.')
        }


        let valorParcela = total / parcelas;

        resp.send({
            total: total,
            valorParcela: valorParcela
        });
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }

})

//Usando parâmetro combinado com vetor de objeto

endepoints.post('/loja/pedido/completo', (req, resp) => {
    try {
        ValidarPedidoCompleto(req);

        let parcelas = req.body.parcelas;
        let itens = req.body.itens;
        let cupom = req.query.cupom;

        let total = calcularTotal(parcelas, itens, cupom);
        let valorParcela = calcularValorParcelas(total, parcelas);

        resp.send({
            total: total,
            QuanridadeParcelas: parcelas,
            valorParcela: valorParcela,
            cupom: cupom
        });

    } catch (err) {
        logError(err);
        resp.status(400).send(criarErro)
    }
})

export default endepoints;