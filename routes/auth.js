const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { login} = require('../controllers/auth')

const router = Router();


router.post('/login',
  [
    
    check('correo', 'Correo no válido').isEmail(),
    check('password', 'La contraseña debe ser de entre 4 a 12 caracteres').trim().isLength({ min: 4, max: 12}),
    validarCampos
  ]
,login )





module.exports = router;