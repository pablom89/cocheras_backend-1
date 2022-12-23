const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { subirArchivos } = require('../helpers');
const Cochera = require('../models/Cochera');


// Permite cargar archivos en el servidor
const cargarImg = async ( req, res ) => {
  
    try {
        const nombre = await subirArchivos( req.files, undefined, imgs )
     
        res.status(200).json({
            nombre
        })
        
    } catch (msg) {
        return res.status(400).json({
            msg
        })
    }
}

// Establece la imagen de una cochera / usuario y la guarda en el servidor
const actualizarImg = async ( req, res ) => {


    const { coleccion, id } = req.params;
    console.log( coleccion )

    let modelo;

    switch (coleccion) {
        case 'cocheras':
            modelo = await Cochera.findById( id );
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe una cochera con el id ${ id }`
                })
            }
        default:
            break;
    }

    if ( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );
        }
    }

    modelo.img = await subirArchivos( req.files, undefined, coleccion )
    await modelo.save()

    res.status(200).json({
        msg: 'La imagen se cargó/actualizó satisfactoriamente'
    })

}

// Establece la imagen de una cochera / usuario y la guarda en cloudinary
const actualizarImgEnCloudinary = async ( req, res ) => {


    const { coleccion, id } = req.params;
    console.log( coleccion )

    let modelo;

    switch (coleccion) {
        case 'cocheras':
            modelo = await Cochera.findById( id );
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe una cochera con el id ${ id }`
                })
            }
        default:
            break;
    }

    if ( modelo.img ) {
        const nombreArr = modelo.img.split('/');
        const nombre    = nombreArr[ nombreArr.length - 1 ];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    }


    const { tempFilePath } = req.files.img
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath )    
    modelo.img = secure_url;

    await modelo.save()

    res.status(200).json({
        modelo
    })
}

module.exports = {
    cargarImg,
    actualizarImg,
    actualizarImgEnCloudinary
}