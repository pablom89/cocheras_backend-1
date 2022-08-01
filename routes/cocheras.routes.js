const { Router } = require('express');
const { check } = require( 'express-validator');
const Cochera = require('../models/Cochera');
const {
    existeNombre,
    existeCocheraConId,
    existeCocheraConDir
} = require('../helpers')
const {
    validarCampos,
    validarJWT,
    multerForCocheras
} = require('../middlewares')
const { 
    crearCochera, 
    editarCochera, 
    obtenerCocheras,
    obtenerCocheraxId, 
    eliminarCochera, 
    obtenerCocherasUser,
    obtenerCocherasFiltradas,
    cargarImgsCocheras
} = require('../controllers/cocheras.controller');
const router = Router();

// CARGAR IMAGENES DE COCHERA

router.post('/imagenes', multerForCocheras(), cargarImgsCocheras)

// OBTENER COCHERAS

router.get('/', obtenerCocheras)

// OBTENER COCHERAS POR GEOLOCALIZACION

router.get('/cercanas', obtenerCocherasFiltradas)

// OBTENER COCHERAS POR USUARIO
router.get('/user', validarJWT, obtenerCocherasUser )

// OBTENER COCHERAS POR ID
router.get('/:id',
[
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeCocheraConId ),
    validarCampos
]
,obtenerCocheraxId)


//A los siguientes endpoints se les requiere el token


// CREAR COCHERAS 
router.post('/',
    [   
        validarJWT,
        check('nombre' , 'El campo nombre no puede estar vacio').isLength({ min: 3}),
        check('nombre').trim().custom( existeNombre ),
        check('direccion','El campo direccion es obligatorio').not().isEmpty(),
        check('direccion').trim().custom( existeCocheraConDir ),
        validarCampos
    ]
,crearCochera )

//ELIMINAR COCHERA
router.delete('/:id',
    [   
        validarJWT,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom( existeCocheraConId ),
        validarCampos
    ]
, eliminarCochera)


// EDITAR COCHERA

router.put('/:id',
[   
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeCocheraConId ),
    check('nombre','El campo nombre no puede estar vacío').not().isEmpty(),
    check('direccion','La dirección es obligatoria').not().isEmpty(),
    validarCampos
] 
,editarCochera)
 

module.exports = router;