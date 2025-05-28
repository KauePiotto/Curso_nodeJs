import { Router } from "express";

import { calcularMedia } from "../service/exercicios/mediaService.js";

const endepoints = Router();

//Usando parâmetro de corpo
endepoints.post('/media', (req, resp) => {
    let n1 = req.body.nota1;
    let n2 = req.body.nota2;
    let n3 = req.body.nota3;

    let media = calcularMedia(n1, n2, n3);

    resp.send({
        media: media
    });
})

//Usando parâmetro de corpo com vetor
endepoints.post('/dobros', (req, resp) => {
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

export default endepoints;