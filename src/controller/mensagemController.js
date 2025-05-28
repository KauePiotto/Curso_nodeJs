import { Router } from "express";

const endepoints = Router();

//Código do endpoint   
endepoints.get('/helloworld', (req, resp) => {
    resp.send({
        mensagem: 'Hello world!!! =)'
    });
})

//Usando direcionamento de rotas
endepoints.get('/mensagem/boasvindas', (req, resp) => {
    resp.send({
        mensagem: 'Olá, sejam bem-vindos e bem-vindas!'
    });
})

endepoints.get('/v2/mensagem/boasvindas', (req, resp) => {
    resp.send({
        mensagem: 'Que bom que você está aqui! s2'
    });
})

endepoints.get('/mensagem/ocupado', (req, resp) => {
    resp.send({
        mensagem: 'Estou ocupado no momento.'
    });
})

endepoints.get('/mensagem/ocupado/recado', (req, resp) => {
    resp.send({
        mensagem: 'Estou ocupado, deixa uma mensagem no email xxxxxxx.'
    });
})

endepoints.get('/mensagem/ola', (req, resp) => {
    if (!req.query.nome) {
        resp.status(400).send({
            erro: 'Os parâmetros query (nome) é obrigatorio'
        })
        return;
    }

    let pessoa = req.query.nome ?? 'você';

    resp.send({
        mensagem: 'Olá' + pessoa
    });
})

export default endepoints;