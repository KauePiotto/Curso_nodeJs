import express from "express";

const servidor = express();

//Permite usar parâmetros de corpo na minha aplição
servidor.use(express.json());

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

//Usando parâmetro de corpo

servidor.post('/media', (req, resp) => {
    let n1 = req.body.nota1;
    let n2 = req.body.nota2;
    let n3 = req.body.nota3;

    let media = (n1 + n2 + n3) / 3;

    resp.send('A média é ' + media);
})

//Usando parâmetro de corpo com vetor

servidor.post('/dobros', (req, resp) => {
    let nums = req.body.numeros;

    let nums2 = [];
    for (let i = 0; i < nums.length; i++) {
        nums2[i] = nums[i] * 2;
    }

    resp.send('Os dobros dos números são ' + nums2);
})

//Usando parâmetro combinado 
servidor.post('/loja/pedido', (req, resp) => {
    let total = req.body.total;
    let parcelas = req.body.parcelas;
    let cupom = req.query.cupom;

    if (parcelas > 1) {
        let juros = total * 0.05;
        total += juros;
    }

    if (cupom == 'QUERO100') {
        total -= 100;
    }

    resp.send('O total do pedido ficou em R$ ' + total);
})

//Usando parâmetro combinado com vetor de objeto

servidor.post('/loja/pedido/completo', (req, resp) => {
    let parcelas = req.body.parcelas;
    let itens = req.body.itens;
    let cupom = req.query.cupom;
    let total = 0;

    for (let produto of itens) {
        total += produto.preco
    }

    if (parcelas > 1) {
        let juros = total * 0.05;
        total += juros;
    }

    if (cupom == 'QUERO100') {
        total -= 100;
    }

    resp.send('O total a pagar é R$ '+ total);
})