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
    resp.send({
        mensagem: 'Hello world!!! =)'
    });
})

//Usando direcionamento de rotas
servidor.get('/mensagem/boasvindas', (req, resp) => {
    let obj = {

    }
    resp.send({
        mensagem: 'Olá, sejam bem-vindos e bem-vindas!'
    });
})

servidor.get('/v2/mensagem/boasvindas', (req, resp) => {
    resp.send({
        mensagem: 'Que bom que você está aqui! s2'
    });
})

servidor.get('/mensagem/ocupado', (req, resp) => {
    resp.send({
        mensagem: 'Estou ocupado no momento.'
    });
})

servidor.get('/mensagem/ocupado/recado', (req, resp) => {
    resp.send({
        mensagem: 'Estou ocupado, deixa uma mensagem no email xxxxxxx.'
    });
})

//Usando parâmetro

//Usando parâmetro de soma
servidor.get('/calculadora/somar/:n1/:n2', (req, resp) => {
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    let soma = n1 + n2;

    resp.send({
        entradas: {
            numero1: n1,
            numero2: n2,
        },
        soma: soma
    });
})

//Usando parâmetro de subtrair
servidor.get('/calculadora/subtrair/:n1/:n2', (req, resp) => {
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    let subtrair = n1 - n2;

    resp.send({
        entradas: {
            numero1: n1,
            numero2: n2
        },
        subtração: subtrair
    });
})

//Usando parâmetro de divisão
servidor.get('/calculadora/divisao/:n1/:n2', (req, resp) => {
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    let divir = n1 / n2;

    resp.send({
        entradas: {
            numero1: n1,
            numero2: n2
        },
        divisão: divir
    });
})

//Usando parâmetro de Multiplicação
servidor.get('/calculadora/multiplocacao/:n1/:n2', (req, resp) => {
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    let multiplicacao = n1 * n2;

    resp.send({
        entradas: {
            numero1: n1,
            numero2: n2
        },
        multiplicação: multiplicacao
    });
})

//Usando parâmetro para saber se é par ou impar
servidor.get('/calculadora/par-ou-impar/:n1/:n2', (req, resp) => {
    let n1 = Number(req.params.n1);
    let n2 = Number(req.params.n2);
    let soma = n1 / n2;

    if (soma % 2 == 0) {
        resp.send({
            entradas: {
                numero1: n1,
                numero2: n2
            },
            'Par': soma
        })
    } else {
        resp.send({
            entradas: {
                numero1: n1,
                numero2: n2
            },
            'Ímpar': soma
        })
    }
})

//Usando parâmetro de query

//Usando parâmetro de somar pelo query
//No query criar a rota e coloca o parâmetro na hora de usar o get usando ?n1=0&n2=0 n1 e n2 são os nomes da variaveis
servidor.get('/calculadora/somar2', (req, resp) => {
    let n1 = Number(req.query.n1);
    let n2 = Number(req.query.n2);
    let soma = n1 + n2;

    resp.send({
        soma: soma
    });
})


servidor.get('/mensagem/ola', (req, resp) => {
    let pessoa = req.query.nome ?? 'você';

    resp.send({
        mensagem: 'Olá' + pessoa
    });
})

//Usando parâmetro de corpo

servidor.post('/media', (req, resp) => {
    let n1 = req.body.nota1;
    let n2 = req.body.nota2;
    let n3 = req.body.nota3;

    let media = (n1 + n2 + n3) / 3;

    resp.send({
        media: media
    });
})

//Usando parâmetro de corpo com vetor

servidor.post('/dobros', (req, resp) => {
    let nums = req.body.numeros;

    let nums2 = [];
    for (let i = 0; i < nums.length; i++) {
        nums2[i] = nums[i] * 2;
    }

    resp.send({
        numeros: nums,
        dobros: nums2
    });
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

    let valorParcela = total / parcelas;

    resp.send({
        total: total,
        valorParcela: valorParcela
    });
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

    let valorParcela = total / parcelas;

    if (cupom == 'QUERO100') {
        total -= 100;
    }

    resp.status(404).send({
        total: total,
        QuanridadeParcelas: parcelas,
        valorParcela: valorParcela,
        cupom: cupom
    });
})
