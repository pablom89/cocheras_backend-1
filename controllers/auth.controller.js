const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { generarJWT } = require('../helpers/generar-jwt')

const login = async( req, res ) => {

    const { correo , password } = req.body;

    try{
        const usuario = await User.findOne({ correo })

        if( !usuario ){
            return res.status(400).json({
                msg: 'No existe una cuenta con ese correo'
            })
        }

        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'El usuario ha sido eliminado, - estado : false '
            })
        }

        const validPassword = bcryptjs.compareSync( password, usuario.password )

        if( !validPassword ){
            return res.status(400).json({
                msg:'Contraseña incorrecta'
            })
        }

        // GENERAR JWT

        const token = await generarJWT( usuario._id )

        res.status(200).json({
            usuario,
            token
        })

    }catch( error ){
        console.log( error )
        res.status(500).json({
            msg: 'Hable con el adm de bd'
        })
    }

    
}


module.exports = {
    login
    
}