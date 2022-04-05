const { Schema, model } = require('mongoose');

const rodadoSchema = Schema({
  
    nombre:{
        type: String,
        uppercase: true,
        trim: true,
        required: true
    }
});

rodadoSchema.methods.toJSON = function(){
  const { __v, _id, ...rodado } = this.toObject();
  rodado.uid = _id
  return rodado;
}

module.exports = model( 'Rodado', rodadoSchema )