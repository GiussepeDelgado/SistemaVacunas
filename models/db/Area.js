const mongoose = require('mongoose');
const {Schema} = mongoose;

const area= new Schema({
  name:String,
  siglas:String,
  status:String
});

const Area=mongoose.model('Area',area);

module.exports=Area;