const { Router } = require('express');
const { validarCampos, validarArchivo } = require('../middlewares')
const { check } = require('express-validator')
const { cargarImg, actualizarImgEnCloudinary } = require('../controllers/uploads')

const router = Router();

// Este endpoint permite cargar archivos a nuestro servidor, en la carpeta que le pasemos al helper
router.post('/', validarArchivo ,cargarImg )


// pseudo put, este sería el endpoint para cargar la imagen de un usuario y/o cochera..
router.put('/:coleccion/:id',
[
    validarArchivo,
    check('id', 'No es un id válido').isMongoId(),
    check('coleccion','No es una colección valida').isIn(['cocheras', 'users']),
    validarCampos
]
,actualizarImgEnCloudinary )

module.exports = router;