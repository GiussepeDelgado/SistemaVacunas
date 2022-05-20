const mongoose = require('mongoose');
const {Schema} = mongoose;

const employee= new Schema({
  dni:String,
  name:String,
  lastname:String,
  phone:String
});

const Employee=mongoose.model('Employee',employee);

module.exports=Employee;