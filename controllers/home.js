const Area = require("../models/db/Area");
const Employee = require("../models/db/employee");

const addArea=async(req,res)=>{
  try {
    console.log('add');
    const {name,siglas,status}=req.fields;
    console.log(req.fields);
    console.log(req.fields.name);
    const area=new Area(
            {name:name,
             siglas:siglas,
             status:status
            });
    await area.save();
    res.send('Se agrego el area');
  } catch (error) {
    console.log(error);
  }
};
const readArea=async(req,res)=>{
  try {
    const areas= await Area.find().lean();
    console.log(areas);
    res.json(areas);
  } catch (error) {
    console.log(error);
  }
};
module.exports ={addArea:addArea,readArea:readArea};