

const esAdminRol = async( req, res, next ) => {

    if( !req.usuario ){
        res.json({ msg: 'Se quiere validar el rol sin haber validado token primero'})
    }

    const { rol, nombre  } = req.usuario;

    if( rol !== 'ADMIN'){
        return res.status(401).json({
            msg: `${nombre} no tiene los privilegios para realizar esta acción`
        })
    }

    next()

}

module.exports = { 
    esAdminRol
}