import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';

//Importa as rotas
import adicionarRotas from './rotas.js';

//Importa as funções globais
import './utils/log.js/global.js'

const servidor = express();

//Permitindo o uso do CORS
servidor.use(cors());

//Permite usar parâmetros de corpo na minha aplição
servidor.use(express.json());

//Adicionando as Rotas
adicionarRotas(servidor);

//Porta da API
const PORTA = process.env.PORTA;

servidor.listen(
    PORTA, () => console.log(`----> API subiu com sucesso na porta ${PORTA}!`));