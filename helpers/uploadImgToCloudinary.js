const fs = require('fs');
const User = require('../models/user');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const uploadImg = async (id, path) => {

    // Verificar si el usuario ya tiene una imagen
    const { img } = await User.findOne({ _id: id , estado: true });
    const arrLink = img.split('/')
    const lastIndex = arrLink[ arrLink.length - 1]
    const arrLastIndex = lastIndex.split('.')
    const public_id = arrLastIndex[0]
    // Si ya tiene una, reemplazarla por la nueva
    if( img ){
        cloudinary.uploader.destroy( public_id );
    }

    // Subir imagen a cloudinary
    const result = await cloudinary.uploader.upload( path )
    // Borrar imagen del servidor
    fs.unlinkSync(path)
    // Extraer url de img
    const { secure_url } = result;
    return secure_url
    
    
}

module.exports = {
    uploadImg
}