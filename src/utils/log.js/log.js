import { horaAtual } from "./dateTimeUtils.js";

export function logError(err) {
    console.log(horaAtual() + ' ERROR ------> ' + err.message);
}