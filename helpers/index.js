const  db_validators  = require('./db-validators');
const chequeoUsuario = require('./chequeoUsuario')
const generarJWT = require('./generar-jwt')
const geoCoder = require('./geoCoder')
const subirarchivos = require('./subirArchivos')

module.exports = {
    ...db_validators,
    ...chequeoUsuario,
    ...generarJWT,
    ...geoCoder,
    ...subirarchivos
}