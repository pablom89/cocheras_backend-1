const { Schema, model } = require('mongoose');



const roleSchema = Schema({
  
    nombre:{
        type: String,
        uppercase: true,
        trim: true,
        required: true
    },

    estado:{
        type: Boolean,
        default: true
    }

});

roleSchema.methods.toJSON = function(){
  const { __v, password, _id, ...role } = this.toObject();
  role.uid = _id
  return role;
}

module.exports = model( 'Role', roleSchema )