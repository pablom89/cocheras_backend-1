
const Cochera = require('../models/Cochera');
const { esElMismo } = require('../helpers/chequeoUsuario');

const obtenerCocheras = async ( req, res ) => {

    const { limite = 5, desde = 0 } = req.query;

    let query = { 
            estado: true 
    };
    
    
    if( req.query.techada !== undefined && req.query.techada.length > 0){
        if( req.query.techada === 'true'){
            query['techada'] = true
        }else if ( req.query.techada === 'false'){
            query['techada'] = false
        }else{
            return res.status(400).json({
                msg: 'Parametro invalido'
            })
        }
    }

    if( req.query.seguro !== undefined && req.query.seguro.length > 0){
        if( req.query.seguro === 'true'){
            query['seguro'] = true
        }else if( req.query.seguro === 'false'){
            query['seguro'] = false
        }else{
            return res.status(400).json({
                msg: 'Parametro invalido'
            })
        }
    }

    if( req.query.mensual !== undefined && req.query.mensual.length > 0){
        if( req.query.mensual === 'true'){
            query['mensual'] = true
        }else if( req.query.mensual === 'false'){
            query['mensual'] = false
        }else{
            return res.status(400).json({
                msg: 'Parametro invalido'
            })
        }
    }

    if( req.query.xdia !== undefined && req.query.xdia.length > 0){
        if( req.query.xdia === 'true'){
            query['xDia'] = true
        }else if( req.query.xdia === 'false'){
            query['xDia'] = false
        }else{
            return res.status(400).json({
                msg: 'Parametro invalido'
            })
        }
    }

    if( req.query.xhora !== undefined && req.query.xhora.length > 0){
        if( req.query.xhora === 'true'){
            query['xHora'] = true
        }else if( req.query.xhora === 'false'){
            query['xHora'] = false
        }else{
            return res.status(400).json({
                msg: 'Parametro invalido'
            })
        }
    }

    if( req.query.horarios !== undefined && req.query.horarios.length > 0){
        if( req.query.horarios === 'true'){
            query['horarios'] = true
        }else if( req.query.horarios === 'false'){
            query['horarios'] = false
        }else{
            return res.status(400).json({
                msg: 'Parametro invalido'
            })
        }
    }

    try {
        const [ total, cocheras] = await Promise.all([
            Cochera.countDocuments( query ),
            Cochera.find( query ,{ 'location': 0 })
                .limit(Number(limite))
                .skip(Number(desde))
        ])
        
        res.status(201).json({
            total,
            cocheras
        })

    } catch (error) {
        console.log( error )
        res.status(500).json({
            msg: 'comunicarse con el adm de bd'
        })
    }

}

const obtenerCocherasFiltradas = async ( req, res ) =>{

    const { 
            lng,
            lat, 
            mts = 2000
           } = req.query;

           if( req.query.lng === undefined || req.query.lat === undefined ){
               return res.status(400).json({
                   msg:'Parámetros inválidos'
               })
           }

           try {
               const cocheras = await Cochera.aggregate().near({
               near:{type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
               spherical: true,
               distanceField: "dist.calculated",
               distanceMultiplier: 0.001,
               maxDistance: parseFloat(mts),
               query: { estado: true },
               }).project( { '_id': 0, '__v': 0, 'createdAt': 0, 'updatedAt': 0})
               .addFields({'dist_kms': '$dist.calculated'})

               res.status(200).json({
                   
                   resultados: (cocheras) ? cocheras : []
               })
               
           } catch (error) {
               console.log( error )
               return res.status(500).json({
                   msg: 'Se produjo un error comunicarse con el adm'
               })
           }
            
            

          /****** I was trying to do something like this, but it didn't work, I left it here as a reminder, to solve it someday with more time 

            // Moongose docs i.e :
            query.where('loc').near({ center: [10, 10], maxDistance: 5, spherical: true });

            It appears that radius value is in radiands :/, need to check that

            const area = { center: [ parseFloat(lng), parseFloat(lat)] , radius: 0.5, unique: true, spherical: true };

            const cocheras = await Cochera.find().where('location').within().circle(area) */

        /******************************************************************************************************** */
        

          
       /*  This works fine.. */

            /* const cocheras = await Cochera.find()
            .where({ estado: true })
            .where('location').near({
            center: { type: 'Point', coordinates: [ parseFloat(lng), parseFloat(lat) ]},
            maxDistance: parseFloat(mts),
            spherical: true
            }) */
        

        /* This also works fine..

           const cocheras = await Cochera.find().where( {location: {
           $nearSphere:{
           $geometry:{ type: 'Point', coordinates: [ parseFloat(lng), parseFloat(lat) ]},
           $maxDistance: parseFloat(mts)
           }
        } }) */ 


}

// Obtiene las cocheras de un cierto usuario
const obtenerCocherasUser = async ( req, res ) =>{

    const { _id : idUser } = req.usuario;
    const query = { usuario: idUser, estado: true }

    try {
        const [ total, cocheras ] = await Promise.all([
            Cochera.find(query).countDocuments(),
            Cochera.find(query, { 'direccion': 1, 'nombre': 1}).populate('usuario','nombre')
        ])

        res.status(200).json({
            total,
            cocheras
        })
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: 'Comunicarse con el adm'
        })
    }
    
}

const obtenerCocheraxId = async( req, res ) => {

    const { id } = req.params;

    try {
        
        const cocheraID = await Cochera.findOne({_id: id , estado: true }, { 'location': 0 })

        return res.status(201).json({
            cocheraID
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Comunicarse con el adm'
        })
    }


}

const eliminarCochera = async( req, res ) => {

    const { id } = req.params;
    
    const verificar = await esElMismo( req )

    if( !verificar ){
        return res.status(401).json({
            msg: 'No puedes realizar esta accion'
        })
    }
    
    try {
        const cochera = await Cochera.findByIdAndUpdate( id , { estado : false }, { new: true })
        res.status(200).json({
            msg: 'La cochera ha sido eliminada',
            cochera
        })
        
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: 'Se produjo un error comunicarse con el adm'
        })
    }
}

const crearCochera = async ( req, res ) => {

    const body = req.body;
    const { _id : idUSer } = req.usuario;
    body.usuario = idUSer;


    try {
        const cochera = await new Cochera( body )
        
        await cochera.save()
        return res.status(201).json({
            msg: 'Cochera creada exitosamente',
            cochera
        })
  
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Se produjo un error, verificar que la dirección tenga el formateo adecuado o comunicarse con el adm'
        })
    }
    
}

const editarCochera = async ( req, res ) => {

    // Ver como modificar la dirección, xq debe concordar con las coords
    const { id } = req.params;

    const verificar = await esElMismo( req )

    if( !verificar ){
        return res.status(401).json({
            msg: 'No puedes realizar esta accion'
        })
    }

    const { nombre, 
            techada, 
            location,
            direccion,
            mensual,
            xDia,
            xHora,
            vm,
            vd,
            vh,
            seguro,
            horarios,
            abre,
            cierra,
            img,
            qtyLugares,
            disponible 
    } = req.body;

    const regex = new RegExp( nombre, 'i');
   
    const cocheradb = await Cochera.find().where('_id').ne( id ).where({ nombre: regex })
                                      
    if( cocheradb.length > 0 ){
        return res.status(400).json({
            msg: `El nombre -${nombre}- no está disponible`
        })
    }
    

    let actualizaciones = {};
    
    if( nombre !== undefined && nombre.length > 1){

    }
    
    

   const cochera = await Cochera.findByIdAndUpdate( id, { nombre: nombre , techada: techada, location: location }, { new: true })
    
    res.status(200).json({
        msg: 'Los datos han sido modificados',
        cochera
    })
 
}

module.exports = {

    crearCochera,
    editarCochera,
    obtenerCocheras,
    obtenerCocheraxId,
    eliminarCochera,
    obtenerCocherasUser,
    obtenerCocherasFiltradas

}