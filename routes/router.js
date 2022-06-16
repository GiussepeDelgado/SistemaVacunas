const express=require('express');
const { readArea,addArea, deleteArea, updateArea, editArea } = require('../controllers/home');
const { readUsersData, register, login, isAuthenticated, logout } = require('../controllers/users');
const uploadFile = require('../middleware/multer');
//const addArea = require('../controllers/home');
//const addEmployee = require('../controllers/home');

const router=express.Router();

router.get('/',isAuthenticated,(req,res)=>{
  res.render('index',{user: req.user});
});
router.get('/registro-empleado',isAuthenticated,(req,res)=>{
  res.render('formEmpleado',{user: req.user});
});
router.get('/lista-empleados',isAuthenticated,(req,res)=>{
  res.render('listEmpleados',{user: req.user});
});
router.get('/lista-usuarios',isAuthenticated, (req, res) => {
  res.render('listUser',{user: req.user} )
})
router.get('/login', (req, res) => {
  res.render('login', { user: req.user,alert: false })
})

router.get('/crear-usuario',isAuthenticated, (req, res) => {
  res.render('userForm', { user: req.user,alert: false })
});
router.get('/usuarios/data',isAuthenticated, readUsersData);



router.get('/areas',readArea);
router.post('/agregar',addArea);
router.get('/areas/delete/:id',deleteArea);
router.get('/areas/update/:id',updateArea);
router.post('/areas/edit/:id',editArea);


router.post('/register-user', uploadFile().single('imageUpload'), register);
router.post('/login', login);
router.get('/logout', logout);
module.exports=router;