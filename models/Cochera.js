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
    vmA: { 
        type: Number, 
        default: 0.00 
    },
    vdA: { 
        type: Number, 
        default: 0.00
    },
    vhA: { 
        type: Number, 
        default: 0.00
    },

    vmM:{
        type: Number,
        default: 0.00
    },

    vdM:{
        type: Number,
        default: 0.00
    },

    vhM:{
        type: Number,
        default: 0.00
    },

    vmP:{
        type: Number,
        default: 0.00
    },

    vdP:{
        type: Number,
        default: 0.00
    },

    vhP:{
        type: Number,
        default: 0.00
    },

    vmB:{
        type: Number,
        default: 0.00
    },

    vdB:{
        type: Number,
        default: 0.00
    },

    vhB:{
        type: Number,
        default: 0.00
    },
    
    a24h:{
        type: Boolean,
        default: false
    },

    tel:{
        type: String,
        validate:{
            validator: function(v){
                return /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(v);
            },
            message: props => `${props.value} no es un número de telefono valido`
        }
        /*match:[/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/, 'El teléfono debe tener un formato válido']*/
    },

    gra:{
        type: Boolean,
        default: false
    },

    auto:{
        type: Boolean,
        default: false
    },

    bici:{
        type: Boolean,
        default: false
    },

    moto:{
        type: Boolean,
        default: false
    },

    pickUp:{
        type: Boolean,
        default: false
    },

    hayLugar:{
        type: Boolean,
        default: true
    },

    opiniones:{
        type: Array
    },

    stars:{
        type: Number,
        min: 1,
        max: 5,
        default: 5
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
        type: String, 
        default: '10:00',
        match:[/((?:(?:0|1)\d|2[0-3])):([0-5]\d)/g, 'La hora debe tener un formato válido']
    },
    cierra:{ 
        type: String, 
        default: '22:00',
        match:[/((?:(?:0|1)\d|2[0-3])):([0-5]\d)/g, 'La hora debe tener un formato valido']
    }, 
    imgs:[{ url: String }],
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
cocheraSchema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true;
    next();
});
 

cocheraSchema.methods.toJSON = function(){
  const { __v, password, _id, ...cochera } = this.toObject();
  cochera.id = _id
  return cochera;
}

module.exports = model( 'Cochera', cocheraSchema )
