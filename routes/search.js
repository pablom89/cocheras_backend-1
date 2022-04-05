const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { search } = require('../controllers/search');
const router = Router();


router.get('/:coleccion/:termino',search)



module.exports = router;