const Cochera = require('../models/Cochera');
const Vehiculo = require('../models/Vehiculo');
const User = require('../models/user');
const Role = require('../models/Role');
const Rodado = require('../models/Rodado');

// *********** USUARIO ****************//

const existeUserConNombre = async( nombre ) =>{

    const existeElNombre = await User.findOne({ nombre, estado: true })
    if( existeElNombre ) {
        throw new Error( `El nombre ${ nombre } ya se encuentra registrado`)
    }
}

const existeUserConCorreo = async( correo ) =>{

    const existeElCorreo = await User.findOne({ correo, estado: true })
    if( existeElCorreo ) {
        throw new Error( `El correo ${ correo } ya se encuentra registrado`)
    }
}

const existeUserConId = async( id ) => {

    const existeElUser = await User.findById( id)
    if( !existeElUser ){
        throw new Error( `No existe un usuario con el id : ${ id }`)
    }
}

/************* ROLES ****************** */

const esRolPermitido = async( rol ) => {
    
    const existeRol = await Role.findOne({ nombre: rol })
    if( !existeRol ){
        throw new Error(`El rol: ${rol} no es un rol permitido`)
    }
    
}



/************* VEHICULOS****************** */

const existeVehiculoConPatente =async ( patente ) => {

    const existePatente = await Vehiculo.findOne( { patente })
    if( existePatente ) {
       throw new Error(`La patente ${ patente } ya se encuentra registrada`)
    }

}

const existeVehiculoConId = async ( id ) => {

    const existeVehiculo = await Vehiculo.findOne({_id: id, estado: true } );
    if( !existeVehiculo ){
        throw new Error(`El vehiculo con el id ${ id } no existe o ha sido eliminado`)
    }

}

const esClasePermitida = async( clase ) => {

    let clasesPermitidas = ['AUTOMOVIL', 'MOTOCICLETA','COLECTIVO','CUATRICICLO','BICICLETA','CAMION','CAMIONETA']

    const regex =  new RegExp( clase, 'i')
    const existeClase = await Rodado.findOne({ nombre: regex})
    if( !existeClase ){
        throw new Error(`La clase ${ clase } no está permitida, clases: ${clasesPermitidas}`)
    }
}

/// ****** COCHERAS *********

const existeNombre = async ( nombre ) =>{

    const regex = new RegExp( nombre, 'i')
    const existeElNombre = await Cochera.findOne({ nombre: regex })
        if( existeElNombre ){
            throw new Error( `El nombre ${ nombre } ya está en uso`)
        }
}

const existeCocheraConDir = async ( direccion ) => {

    const regex = new RegExp( direccion, 'i')
    const existeDir = await Cochera.findOne({ direccion: regex }) 
    if( existeDir ){
        throw new Error(`La direccion: ${ direccion } ya se encuentra en uso`)
    }
}

const existeCocheraConId = async ( id ) =>{
    const existeLaCocheraXId = await Cochera.findOne( { _id: id , estado: true } )
        if( !existeLaCocheraXId){
            throw new Error( `No existe una cochera con el id ${ id }`)
        }
}






module.exports = {
    existeUserConCorreo,
    existeUserConNombre,
    existeUserConId,
    existeVehiculoConPatente,
    existeVehiculoConId,
    existeNombre,
    existeCocheraConId,
    existeCocheraConDir,
    esRolPermitido,
    esClasePermitida
    
}