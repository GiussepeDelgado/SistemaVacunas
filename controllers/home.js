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
    res.render('areas',{areas:areas});
    console.log(areas);
    // res.json(areas);
  } catch (error) {
    console.log(error);
  }
};

const deleteArea=async(req,res)=>{
  try {
    const id = req.params.id;
    const dic=await Area.findByIdAndDelete(id);
    console.log(dic);
    console.log(req.params);
    res.redirect('/areas');
  } catch (error) {
    console.log(error);
  }
};

const updateArea=async(req,res)=>{
  try {
    const id = req.params.id;
    const area=await Area.findById(id).lean();
    let flag=false;
    if (area.length!=0) {
      flag=true
    } 
    res.render('index',{flag,area});
  } catch (error) {
    console.log(error);
  }
};
const editArea=async(req,res)=>{
  try {
    const id = req.params.id;
    const {name,status,siglas}=req.fields;
    const del=await Area.findOneAndUpdate(id,{name:name,siglas:siglas,status:status});
    console.log(del);
    console.log(id);
    console.log(req.fields);
    res.redirect('/areas');
  } catch (error) {
    console.log(error);
  }
};
module.exports ={
  addArea:addArea,
  readArea:readArea,
  deleteArea:deleteArea,
  updateArea:updateArea,
  editArea:editArea
};