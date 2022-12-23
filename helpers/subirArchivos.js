const { v4: uuidv4 } = require('uuid');
const path = require('path')
const subirArchivos = ( files, extensionesValidas = ['jpg', 'png', 'jpeg'], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {

     
        const { img } = files;
        const nombreCortado = img.name.split('.');
        const ext = nombreCortado[ nombreCortado.length - 1];

        if( !extensionesValidas.includes( ext )){
            reject(`Las extensiones permitidas son ${ extensionesValidas }`)
        }

        const nombreTemp = uuidv4() + '.' + ext;
    
        const uploadPath = path.join(__dirname , '../uploads/', carpeta , nombreTemp)
        
        // Usamos la función que nos provee express-fileupload para mover la imagen o el archivo en cuestion
        img.mv(uploadPath, (err) => {
            if (err){
                reject( err )
        }
  
        resolve( nombreTemp )
    });


    })

}

module.exports = {
    subirArchivos
}