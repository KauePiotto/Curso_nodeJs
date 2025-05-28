import { Router } from 'express';
import multer from 'multer';

const endepoints = Router();

//Variavel que  aponta para onde os arquivos que foram recebidos vão ser armazenados
let uploadPerfil = multer({ dest: './storage/perfil' })



//Configuração do multer para receber um arquivo ou uma foto
endepoints.post('/perfil/capa', uploadPerfil.single('imagem'), (req, resp) => {
    let caminho = req.file.path;
    let extensao = req.file.mimetype;
    let nome = req.file.originalname;

    resp.send({
        caminho: caminho,
        extensao: extensao,
        nome: nome
    })
})

export default endepoints;