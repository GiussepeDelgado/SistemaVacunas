const mongoose = require('mongoose');
const {Schema} = mongoose;

const user= new Schema({
  name:String,
  email:String,
  pass:String,
  access:String,
  photo:String
});

const User=mongoose.model('User',user);

module.exports=User;