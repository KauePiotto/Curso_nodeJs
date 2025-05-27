import express, { request, response } from "express";

const servidor = express();

//Porta da API
servidor.listen(
    5001,
    () => console.log('----> API subiu com sucesso na porta 5001!'));

//Código do endpoint   
servidor.get('/helloworld', (req, resp) => {
    resp.send('Hello world!!!!');
})

//Usando direcionamento de rotas
servidor.get('/mensagem/boasvindas', (req, resp) => {
    resp.send('Olá, sejam bem-vindos e bem-vindas! ');
})

servidor.get('/v2/mensagem/boasvindas', (req, resp) => {
    resp.send('Que bom que você está aqui! s2');
})

servidor.get('/mensagem/ocupado', (req, resp) => {
    resp.send('Estou ocupado no momento.');
})

servidor.get('/mensagem/ocupado/recado', (req, resp) => {
    resp.send('Estou ocupado, deixa uma mensagem no email xxxxxxx.');
})

//Usando parâmetro

//Usando parâmetro de soma
servidor.get('/calculadora/somar/:n1/:n2', (req, resp) => {
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    let soma = n1 + n2;

    resp.send('A some é ' + soma);
})

//Usando parâmetro de subtrair
servidor.get('/calculadora/subtrair/:n1/:n2', (req, resp) => {
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    let soma = n1 - n2;

    resp.send('A subtração é ' + soma);
})

//Usando parâmetro de divisão
servidor.get('/calculadora/divisao/:n1/:n2', (req, resp) => {
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    let soma = n1 / n2;

    resp.send('A divisão é ' + soma);
})

//Usando parâmetro de Multiplicação
servidor.get('/calculadora/multiplocacao/:n1/:n2', (req, resp) => {
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    let soma = n1 * n2;

    resp.send('A multiplicação é ' + soma);
})

//Usando parâmetro para saber se é par ou impar
servidor.get('/calculadora/par-ou-impar/:n1/:n2', (req, resp) => {
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    let soma = n1 / n2;

    if (soma % 2 == 0) {
        resp.send(n1 + ' + ' + n2 + ' = ' + soma + ' (É par)')
    } else {
        resp.send(n1 + ' + ' + n2 + ' = ' + soma + ' (É impar)')
    }
})

//Usando parâmetro de query

//Usando parâmetro de somar pelo query
//No query criar a rota e coloca o parâmetro na hora de usar o get usando ?n1=0&n2=0 n1 e n2 são os nomes da variaveis
servidor.get('/calculadora/somar2', (req, resp) => {
    let n1 = Number(req.query.n1);
    let n2 = Number(req.query.n2);
    let soma = n1 + n2;

    resp.send('A some é ' + soma);
})


servidor.get('/mensagem/ola', (req, resp) => {
    let pessoa = req.query.nome ?? 'você';

    resp.send('Olá ' + pessoa);
})

