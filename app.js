import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import multer from 'multer';

const servidor = express();

//Permitindo o uso do CORS
servidor.use(cors());

//Permite usar parâmetros de corpo na minha aplição
servidor.use(express.json());

//Variavel que  aponta para onde os arquivos que foram recebidos vão ser armazenados
let uploadPerfil = multer({ dest: './storage/perfil' })

//Usado para liberar a pasta storage/perfil para carregar a foto na Web
servidor.use('/storage/perfil', express.static('./storage/perfil'))
servidor.use('/storage/album', express.static('./storage/album'))

//Porta da API
const PORTA = process.env.PORTA;

servidor.listen(
    PORTA, () => console.log(`----> API subiu com sucesso na porta ${PORTA}!`));

//Código do endpoint   
servidor.get('/helloworld', (req, resp) => {
    resp.send({
        mensagem: 'Hello world!!! =)'
    });
})

//Usando direcionamento de rotas
servidor.get('/mensagem/boasvindas', (req, resp) => {
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
//Usando o CORS para consumir a API em um outro HTML
servidor.get('/calculadora/somar/:n1/:n2', (req, resp) => {
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
servidor.get('/calculadora/subtrair/:n1/:n2', (req, resp) => {
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
servidor.get('/calculadora/divisao/:n1/:n2', (req, resp) => {
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
servidor.get('/calculadora/multiplocacao/:n1/:n2', (req, resp) => {
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
servidor.get('/calculadora/par-ou-impar/:n1/:n2', (req, resp) => {
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
servidor.get('/calculadora/somar2', (req, resp) => {
    let n1 = Number(req.query.n1);
    let n2 = Number(req.query.n2);
    let soma = n1 + n2;

    resp.send({
        soma: soma
    });
})


servidor.get('/mensagem/ola', (req, resp) => {
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

servidor.post('/loja/pedido/completo', (req, resp) => {
    try {
        if (!req.body.parcelas || isNaN(req.body.parcelas)) throw new Error('O parâmetro parcela está inválido');
        if (!req.body.itens) throw new Error('O parâmetro itens está invállido');

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

        resp.send({
            total: total,
            QuanridadeParcelas: parcelas,
            valorParcela: valorParcela,
            cupom: cupom
        });
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

//Configuração do multer para receber um arquivo ou uma foto
servidor.post('/perfil/capa', uploadPerfil.single('imagem'), (req, resp) => {
    let caminho = req.file.path;
    let extensao = req.file.mimetype;
    let nome = req.file.originalname;

    resp.send({
        caminho: caminho,
        extensao: extensao,
        nome: nome
    })
})

