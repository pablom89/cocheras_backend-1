const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { esElMismo } = require('../helpers/chequeoUsuario');
const User = require('../models/user');


const obtenerUsuarios = async( req, res ) => {

    const { limite = 5, desde = 0 } = req.query;

    try {
        const [ total, usuarios ] = await Promise.all([
            User.countDocuments(),
            User.find()
                .limit( Number( limite ))
                .skip( Number( desde ))
        ])

        res.status(200).json({
            total,
            usuarios
        })
        
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: 'comunicarse con el adm'
        })
    }

}

const obtenerUsuario = async( req, res ) => {

    const { id } = req.params;

    const usuario = await User.findById( id )

    res.status(200).json({
        usuario
    })

}


const crearUsuario = async( req, res ) =>{

    const { password } = req.body;
 
    const usuario = await new User( req.body )
        
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt )

    await usuario.save()

    const token = await generarJWT( usuario._id )

    res.status(201).json({
        msg: 'Usuario registrado exitosamente',
        usuario,
        token
    })

}


const editarUsuario = async( req, res )=>{

    const { id } = req.params;
    let passwordmodif;
    const{ password, correo, nombre } = req.body;

    // si manda la pass la encripto, si es la misma queda igual y si la modifica se cambia
    if( password ) {
        const salt = bcryptjs.genSaltSync();
        passwordmodif = bcryptjs.hashSync( password, salt )
    }

    const regex1 = new RegExp( nombre, 'i')

    const usuarioXnombre = await User.find().where('_id').ne( id ).where({ nombre: regex1 })
    if( usuarioXnombre.length > 0){
        return res.status(400).json({
            msg: `El nombre ${ nombre } ya se encuentra en uso`
        })
    }

    const regex2 = new RegExp( correo, 'i')
    const usuarioXcorreo = await User.find().where('_id').ne( id ).where( { correo: regex2 })
    if( usuarioXcorreo.length > 0){
        return res.status(400).json({
            msg: `El correo: ${ correo } ya se encuentra en uso`
        })
    }
    
    const usuario = await User.findByIdAndUpdate( id, { nombre: nombre, correo: correo, password: passwordmodif } , { new: true } )
    
    res.status(200).json({
        msg: 'Los datos han sido actualizados',
        usuario,
    })

}

const borrarUsuario = async( req, res ) =>{

    const { id } = req.params;
    
    try {
        const usuario = await User.findByIdAndUpdate( id, { estado: false }, { new: true } )
    
        res.status(200).json({
            usuario,
        })
        
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: 'Se produjo un error comunicarse con el administrador'
        })
    }

}

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    borrarUsuario,
    obtenerUsuario,
    editarUsuario
}