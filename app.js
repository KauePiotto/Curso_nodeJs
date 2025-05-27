import express, { request, response } from "express";

const servidor = express();

servidor.get('/helloworld', (req, resp) =>{
    //Código do endpoint

    resp.send('Hello world!!!!');
})

servidor.get('/mensagem/boasvindas', (req, resp) =>{
    resp.send('Olá, sejam bem-vindos e bem-vindas! ');
})

servidor.get('/v2/mensagem/boasvindas', (req, resp) =>{
    resp.send('Que bom que você está aqui! s2');
})

servidor.get('/mensagem/ocupado', (req, resp) =>{
    resp.send('Estou ocupado no momento.');
})

servidor.get('/mensagem/ocupado/recado', (req, resp) =>{
    resp.send('Estou ocupado, deixa uma mensagem no email xxxxxxx.');
})

servidor.listen(
    5001, 
    () => console.log('----> API subiu com sucesso na porta 5001!'));