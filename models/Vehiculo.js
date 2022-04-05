const { Schema, model } = require('mongoose');

// como debe lucir un vehiculo en mi DB:

/* 

    {
        "clase": "automovil/camioneta/camion/colectivo/motocicleta",
        "patente":"ab123cd o aaa123 o a123bcd o 111aaa"
        "seguro": true/false
        "marca": "Ford",
        "modelo":"fiesta"
    }

*/

const vehiculoSchema = Schema({

    clase: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    
    
    patente: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true   
    },

    seguro:{
        type: Boolean,
        required: true
    },

    marca: {
        type: String,
        default: 'Otro',
        trim: true
    },

    modelo:{
        type: String,
        default: 'generico',
        trim: true
    },

    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    estado:{
        type: Boolean,
        default: true
    }

});

vehiculoSchema.methods.toJSON = function(){
  const { __v, password, _id, ...vehiculo } = this.toObject();
  vehiculo.id = _id
  return vehiculo;
}

module.exports = model( 'Vehiculo', vehiculoSchema )
