const  validar_campos  = require('./validar-campos');
const  validar_jwt  = require('./validar-jwt');
const validar_rol = require('./validar-rol');
const validar_archivos = require('./validar-archivo');
const upload = require('./multer');
const verify_file = require('./verifyFile')

module.exports = {
    ...validar_campos,
    ...validar_jwt,
    ...validar_rol,
    ...validar_archivos,
    ...upload,
    ...verify_file
}