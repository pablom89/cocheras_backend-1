const  validar_campos  = require('./validar-campos');
const  validar_jwt  = require('./validar-jwt');
const validar_rol = require('./validar-rol')

module.exports = {
    ...validar_campos,
    ...validar_jwt,
    ...validar_rol
}