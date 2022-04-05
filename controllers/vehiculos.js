const Vehiculo = require('../models/Vehiculo');



const obtenerVehiculos = async ( req, res ) =>{

    const { limite = 10, desde = 0 } = req.query;
    let query = {};

    if( req.query.estado !== undefined && req.query.estado.length > 0){
        if( req.query.estado === 'true'){
            query['estado'] = true
        }else if( req.query.estado === 'false'){
            query['estado'] = false
        }else{
            return res.status(400).json({
                msg: 'Parametros inválidos'
            })
        }
    }

    if( req.query.clase !== undefined && req.query.clase.length > 0){
        query['clase'] = req.query.clase.toUpperCase()
    }

    if( req.query.seguro !== undefined && req.query.seguro.length > 0){
        if( req.query.seguro === 'true'){
            query['seguro'] = true
        }else if( req.query.seguro === 'false'){
            query['seguro'] = false
        }else{
            return res.status(400).json({
                msg: 'Parametros inválidos'
            })
        }
    }

    try {
        const [ total, vehiculos ] = await Promise.all([
            Vehiculo.countDocuments(query),
            Vehiculo.find(query)
                .limit( Number( limite ))
                .skip( Number( desde ))
        ])

        res.status(200).json({
            total,
            vehiculos
        })
        
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: 'comunicarse con el adm'
        })
    }
}


const obtenerVehiculosUser = async ( req, res ) =>{

    const { _id : idUser } = req.usuario;
    const query = { usuario: idUser, estado: true }

    try {
        const [ total, vehiculos ] = await Promise.all([
            Vehiculo.find(query).countDocuments(),
            Vehiculo.find(query)
        ])
        
        res.status(200).json({
            total,
            vehiculos
        })
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: 'Comunicarse con el adm'
        })
    }
    
}


const obtenerVehiculo = async ( req ,res )=>{

    const { id } = req.params;

    const vehiculoDb = await Vehiculo.findById( id )
    if( !vehiculoDb.estado ){
        return res.status(400).json({
            msg: `El vehículo con el id ${ id } ha sido removido`
        })
    }

    res.status(200).json({
        vehiculoDb
    })
   


}

const crearVehiculo = async ( req, res ) => {

    const body = req.body;
    const { _id: uid } = req.usuario;
    body.usuario = uid;

    const newVehiculo = await new Vehiculo( body );
    
    await newVehiculo.save()

    res.status(201).json({
        msg: 'Vehiculo creado exitosamente',
        newVehiculo
    })

}


const borrarVehiculo = async ( req, res ) =>{

    const { id } = req.params;
    const { _id } = req.usuario;

    const idUser = _id.toString()

    const vehiculoDb = await Vehiculo.findById( id )
    const id_de_vehiculoBD = vehiculoDb.usuario._id.toString()

    if(  idUser !== id_de_vehiculoBD ){
        return res.status(401).json({
            msg: 'No puedes realizar esta acción'
        })
    }else{
        const vehiculo = await Vehiculo.findByIdAndUpdate( id , { estado: false }, { new: true })
        res.status(200).json({
            msg: 'El vehiculo ha sido elimando',
            vehiculo
        })
    }

}

const editarVehiculo = async( req, res ) => {

    const { id } = req.params;
    const { _id } = req.usuario;
    const { patente, seguro, clase, marca, modelo } = req.body;

    const uid = _id.toString();

    const vehiculodb = await Vehiculo.findById(id)

    const id_de_vehiculoBD = vehiculodb.usuario._id.toString()
    
    if( uid !== id_de_vehiculoBD ){
        return res.status(401).json({
            msg:'No puedes realizar esta acción'
        })
    }

    const regex = new RegExp(patente, 'i')

    const vehiculoXpat = await Vehiculo.find().where('_id').ne( id ).where({ patente: regex })
    if( vehiculoXpat.length > 0 ){
        return res.status(400).json({
            msg: `La patente: ${ patente } ya se encuentra en uso`
        })
    }

    const vehiculo = await Vehiculo.findByIdAndUpdate( id, { clase: clase, seguro: seguro, patente: patente, marca: marca, modelo: modelo  }, { new: true })

    res.status(200).json({
        msg: 'Los datos han sido actualizados',
        vehiculo
    })
}

module.exports = {
    crearVehiculo,
    borrarVehiculo,
    obtenerVehiculos,
    obtenerVehiculo,
    obtenerVehiculosUser,
    editarVehiculo
}