global.criarErro = function criarErro(err) {
    let obj = {
        erro: err.message
    }

    return obj;
}

import { horaAtual } from "./dateTimeUtils.js";

global.logError = function logError(err) {
    console.log(horaAtual() + ' ERROR ------> ' + err.message);
}