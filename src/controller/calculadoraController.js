import { Router } from "express";

const endepoints = Router();

//Usando parâmetro de soma
//Usando o CORS para consumir a API em um outro HTML
endepoints.get('/calculadora/somar/:n1/:n2', (req, resp) => {
    if (isNaN(req.params.n1) || isNaN(req.params.n2)) {
        resp.status(400).send({
            erro: 'Os parâmetros devem ser números'
        })
        return;
    }

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
endepoints.get('/calculadora/subtrair/:n1/:n2', (req, resp) => {
    if (isNaN(req.params.n1) || isNaN(req.params.n2)) {
        resp.status(400).send({
            erro: 'Os parâmetros devem ser números'
        })
        return;
    }

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
endepoints.get('/calculadora/divisao/:n1/:n2', (req, resp) => {
    if (isNaN(req.params.n1) || isNaN(req.params.n2)) {
        resp.status(400).send({
            erro: 'Os parâmetros devem ser números'
        })
        return;
    }

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
endepoints.get('/calculadora/multiplocacao/:n1/:n2', (req, resp) => {
    if (isNaN(req.params.n1) || isNaN(req.params.n2)) {
        resp.status(400).send({
            erro: 'Os parâmetros devem ser números'
        })
        return;
    }

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
endepoints.get('/calculadora/par-ou-impar/:n1/:n2', (req, resp) => {
    if (isNaN(req.params.n1) || isNaN(req.params.n2)) {
        resp.status(400).send({
            erro: 'Os parâmetros devem ser números'
        })
        return;
    }

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
endepoints.get('/calculadora/somar2', (req, resp) => {
    let n1 = Number(req.query.n1);
    let n2 = Number(req.query.n2);
    let soma = n1 + n2;

    resp.send({
        soma: soma
    });
})

export default endepoints;