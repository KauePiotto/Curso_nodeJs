import express from 'express';

import calculadoraController from './controller/calculadoraController.js';
import exerciciosController from './controller/exerciciosController.js';
import lojaController from './controller/lojaController.js';
import mensagemController from './controller/mensagemController.js';
import usuarioController from './controller/usuarioController.js';

export default function adicionarRotas(servidor) {

    //Usado para liberar a pasta storage/perfil para carregar a foto na Web
    servidor.use('/storage/perfil', express.static('./storage/perfil'))
    servidor.use('/storage/album', express.static('./storage/album'))

    //Criando vinculo entre o servidor principal e o arquivo controller
    servidor.use(calculadoraController);
    servidor.use(exerciciosController);
    servidor.use(lojaController);
    servidor.use(mensagemController);
    servidor.use(usuarioController);
}