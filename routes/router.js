const express=require('express');
const { readArea,addArea, deleteArea, updateArea, editArea } = require('../controllers/home');
const { readUsersData, register } = require('../controllers/users');
const uploadFile = require('../middleware/multer');
//const addArea = require('../controllers/home');
//const addEmployee = require('../controllers/home');

const router=express.Router();

router.get('/',(req,res)=>{
  res.render('index');
});
router.get('/registro-empleado',(req,res)=>{
  res.render('formEmpleado');
});
router.get('/lista-empleados',(req,res)=>{
  res.render('listEmpleados');
});
router.get('/lista-usuarios', (req, res) => {
  res.render('listUser', )
})
router.get('/login', (req, res) => {
  res.render('login', { alert: false })
})

router.get('/crear-usuario', (req, res) => {
  res.render('userForm', { alert: false })
});
router.get('/usuarios/data', readUsersData);

router.get('/areas',readArea);
router.post('/agregar',addArea);
router.get('/areas/delete/:id',deleteArea);
router.get('/areas/update/:id',updateArea);
router.post('/areas/edit/:id',editArea);


router.post('/register-user', uploadFile().single('imageUpload'), register)
module.exports=router;