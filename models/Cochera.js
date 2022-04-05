const { Schema, model } = require('mongoose');
const geocoder = require('../helpers/geoCoder');



const cocheraSchema = Schema({

    nombre: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },

    direccion:{
        type: String,
        required: true, 
        trim: true 
    },
    
    mensual: { 
        type: Boolean,
        default: true 
    },

    xDia: { 
        type: Boolean, 
        default: false 
    },
    xHora: { 
        type: Boolean, 
        default: false 
    },
    vm: { 
        type: Number , 
        default: 0 
    },
    vd: { 
        type: Number , 
        default: 0 
    },
    vh: { 
        type: Number, 
        default: 0 
    },
    techada: { 
        type: Boolean, 
        default: true 
    },
    seguro: { 
        type: Boolean, 
        default: false 
    },
    horarios: { 
        type: Boolean, 
        default: false 
    },
    abre:{ 
        type: Number, 
        default: 0 
    },
    cierra:{ 
        type: Number, 
        default: 0 
    }, 
    img: { 
        type: String , 
        default: 'url'
    },
    qtyLugares: { 
        type: Number, 
        default: 1 
    },
    disponible: { 
        type: Number, 
        default: 1 
    },
    
    estado:{
        type: Boolean,
        default: true
    },

    location:{
        type: {
            type: String, 
            enum: ['Point'], 
            
        },
        coordinates: {
            type: [Number],
            required: true
        }
        
    },

    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
}, { timestamps: true });


cocheraSchema.pre('save', async function(next){
    const loc = await geocoder.geocode( this.direccion )
    this.location = {
        type: 'Point',
        coordinates: [ loc[0].longitude , loc[0].latitude ]
    }

    next()
})

// UPDATE ONE

/*  cocheraSchema.pre('updateOne', async function(next){
    const loc = await geocoder.geocode( this.direccion )
    this.location = {
        type: 'Point',
        coordinates: [ loc[0].longitude , loc[0].latitude ]
    }

    next()
})
 */

cocheraSchema.methods.toJSON = function(){
  const { __v, password, _id, ...cochera } = this.toObject();
  cochera.id = _id
  return cochera;
}

module.exports = model( 'Cochera', cocheraSchema )
