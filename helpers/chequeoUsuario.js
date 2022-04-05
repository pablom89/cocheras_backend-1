const Cochera = require('../models/Cochera');

const esElMismo = async ( req ) =>{

    const { id } = req.params;
    const { _id } = req.usuario;

    // se convierten a strings xq dos objetos por mas que tengan los mismos valores no son iguales
    const idUser = _id.toString();

    const cocheraDB = await Cochera.findById( id );

    const id_del_owner_de_cochera = cocheraDB.usuario._id.toString();

    if( idUser === id_del_owner_de_cochera ){
        return true
    }else{
        return false
    }

}

module.exports = {
    esElMismo
}