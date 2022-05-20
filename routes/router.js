const express=require('express');
const { readArea,addArea } = require('../controllers/home');
//const addArea = require('../controllers/home');
//const addEmployee = require('../controllers/home');

const router=express.Router();

router.get('/',(req,res)=>{

  res.render('index');
});

router.get('/areas',readArea);
router.post('/agregar',addArea);

module.exports=router;