const path = require('path');
const multer = require('multer');
const {v4: uuidv4 } = require('uuid');


const uploadImageToServer = () => {
    
    const storage = multer.diskStorage({
        destination: path.join(__dirname , '../uploads/user'),
        filename:( req, file, cb, filename ) => {
            cb(null, uuidv4() + path.extname(file.originalname) )
        }
    })

    const upload = multer({storage}).single('perfil')
    return upload
}

const multerForCocheras = () => {

   
    const storage = multer.diskStorage({
        destination: path.join(__dirname , '../uploads/cocheras'),
        filename:( req, file, cb, filename ) => {
            console.log( req.baseUrl )
            cb(null, uuidv4() + path.extname(file.originalname) )
        }
    })

    const upload = multer({storage}).array('cochera', 5)
    return upload 
}
    
  



module.exports = { 
    uploadImageToServer,
    multerForCocheras
}

