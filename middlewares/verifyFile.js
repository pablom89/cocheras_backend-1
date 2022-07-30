
const verifyFile = (req, res, next)=>{

    if(!req.file || Object.keys(req.file).length === 0){
        return res.status(400).send({msg: 'no files were uploaded'})    
    }
    next()
    
}

const verifyFileFormat = ( req, res, next ) => {

    let validExt = ['jpg', 'jpeg', 'png']
    const imgName = req.file.originalname;
    const arrImgName = imgName.split('.');
    const fileExt = arrImgName[ arrImgName.length - 1 ]

    if(!validExt.includes(fileExt)){
        return res.status(403).send({
            msg: `${fileExt} is not supported, valid file extensions are ${validExt}`
        })
    }

    next()
}

module.exports= { 
    verifyFile,
    verifyFileFormat
}