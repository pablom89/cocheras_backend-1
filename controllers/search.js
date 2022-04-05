const User = require('../models/user');
const Cochera = require('../models/Cochera');
const { response } = require('express'); 

const { ObjectId } = require('mongoose').Types

const coleccionesPermitidas = [ 'users','cocheras', 'vehiculos']



const searchUser = async( termino, res) =>{

    const isMongoId = ObjectId.isValid( termino );

    if( isMongoId ){

        const usuarioXid = await User.findById( termino )
        return res.status(200).json({
            resultados : ( usuarioXid ) ? [ usuarioXid ] : []
        })
    }


    const regEx = new RegExp( termino, 'i')

    const usuarios = await User.find({ 
        $or: [{ nombre: regEx }, { correo: regEx }],
        $and: [{ estado: true }]
    })

    res.status(200).json({
        resutls:  usuarios 
    })

}



const searchCochera = async( termino = '', res) =>{


    const isMongoId = ObjectId.isValid( termino );

    if( isMongoId ){

        const cocheraXid = await Cochera.findById( termino )
        return res.status(200).json({
            resultados : ( cocheraXid ) ? [ cocheraXid ] : []
        })
    }


    const regEx = new RegExp( termino, 'i')

    const cochera = await Cochera.find({ 
        $or: [
                { nombre: regEx }, 

            ],
        $and: [{ estado: true }, { techada: true }]
    })

    res.status(200).json({
        resutls: cochera
    })



}


const search = async ( req, res = response ) => {

    const { coleccion, termino } = req.params;


    if( !coleccionesPermitidas.includes( coleccion ))
    return res.status(400).json({
        msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
    })
    

    switch ( coleccion ) {
        case 'users':
                searchUser( termino, res )

            break;
        case 'cocheras':
                searchCochera( termino, res )

            break;

        case 'vehiculos':
        
            break;
        default:
            res.status(500).json({
                msg: 'Esta coleccion todavia no existe'
            })
            
    }

}

module.exports = {
    search
}