const express=require('express');
const { readArea,addArea, deleteArea, updateArea, editArea } = require('../controllers/home');
//const addArea = require('../controllers/home');
//const addEmployee = require('../controllers/home');

const router=express.Router();

router.get('/',(req,res)=>{

  res.render('index',{flag:false});
});

router.get('/areas',readArea);
router.post('/agregar',addArea);
router.get('/areas/delete/:id',deleteArea);
router.get('/areas/update/:id',updateArea);
router.post('/areas/edit/:id',editArea);
module.exports=router;