
const { Router } = require('express');
const { check, body } = require('express-validator');
const {
    existeVehiculoConPatente,
    existeVehiculoConId,
    esClasePermitida
} = require('../helpers')
const {
    validarCampos,
    validarJWT,
    esAdminRol,
} = require('../middlewares')
const { crearVehiculo, 
        borrarVehiculo, 
        obtenerVehiculos, 
        obtenerVehiculo, 
        obtenerVehiculosUser,
        editarVehiculo
} = require('../controllers/vehiculos')

const router = Router();


// OBTIENE TODOS LOS VEHICULOS -- 
router.get('/',
[
    validarJWT,
    esAdminRol
],obtenerVehiculos)

// OBTENER VEHICULOS X USUARIO
router.get('/user', validarJWT, obtenerVehiculosUser)

// OBTENER VEHICULOS POR ID
router.get('/:id',
    [   
        validarJWT,
        esAdminRol,
        check('id', 'No corresponde a un id valido').isMongoId(),
        check('id').custom( existeVehiculoConId ),
        validarCampos
    ]
,obtenerVehiculo)

// CREAR VEHICULOS
router.post('/',
[
    validarJWT,
    check('clase','El vehículo es obligatorio').not().isEmpty(),
    body('clase').trim(),
    check('clase').custom( esClasePermitida ),
    check('patente','Debe ser un formato valido: LLLNNN o LLNNNLL - auto | LNNNLLL o NNNLLL - moto').matches(/^[ña-z]{2}\d{3}[ña-z]{2}$|^[ña-z]{3}\d{3}$|^[ña-z]{1}\d{3}[ña-z]{3}$|^\d{3}[ña-z]{3}$/gi),
    check('patente').custom( existeVehiculoConPatente ),
    check('seguro', 'El seguro es mandatorio').not().isEmpty(),
    validarCampos
]
,crearVehiculo )

//EDITAR VEHICULO

router.put('/:id',
[
    validarJWT,
    check('id','No es un id valido de mongo').isMongoId(),
    check('id').custom( existeVehiculoConId ),
    check('clase').custom( esClasePermitida ),
    check('patente','Debe ser un formato valido: LLLNNN o LLNNNLL - auto | LNNNLLL o NNNLLL - moto').matches(/^[ña-z]{2}\d{3}[ña-z]{2}$|^[ña-z]{3}\d{3}$|^[ña-z]{1}\d{3}[ña-z]{3}$|^\d{3}[ña-z]{3}$/gi),
    check('seguro','El campo seguro es obligatorio').not().isEmpty(),
    body('marca').trim(),
    body('modelo').trim(),
    validarCampos
]
,editarVehiculo )

// BORRAR VEHICULOS
router.delete('/:id',
    [   
        validarJWT,
        check('id', 'No corresponde a un id valido').isMongoId(),
        check('id').custom( existeVehiculoConId ),
        validarCampos
    ]
,borrarVehiculo )


module.exports = router;