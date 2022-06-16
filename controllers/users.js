const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const { promisify } = require('util')
const fs = require('fs');
const User = require('../models/db/User');

exports.readUsersData = async (req, res) => {


  // results = [{
  //   idUser: '1',
  //   name: 'Julian Alvarez',
  //   email: 'julian.alvarez@intercorp.com',
  //   access: 'Admnistrador'
  // }];
  const results = await User.find().lean();
  //pass:Codigomorse01
  for (let i = 0; i < results.length; i++) {
    results[i].order=i+1;
    
  }
  data = JSON.stringify(results);
  res.send(data);

}

exports.register = async (req, res) => {
  try {
    const { email, user } = req.body;
    //trae data de la base de datos a result
    //results.length == 0 || !(email === results[0].email && '1' === active
    const results = await User.find({ email: email }).lean();
    if (results.length == 0||!(email === results[0].email)) {
      saveUser(req, res);
      res.render('userForm', {
        alert: true,
        alertTitle: "Registro exitoso ",
        alertMessage: "¡Felicidades!",
        alertIcon: 'success',
        showConfirmButton: false,
        timer: 2000,
        ruta: 'lista-usuarios',
        user: user
      });
    } else {
      res.render('userForm', {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Correo electronico  ya registrado",
        alertIcon: 'info',
        showConfirmButton: true,
        timer: 2000,
        ruta: 'crear-usuario',
        user: user
      });
    }

    //res.redirect('/usuarios')
  } catch (error) {
    console.log(error)
  }
}

const saveUser = async (req, res) => {
  try {
    const { name, email, pass, access } = req.body;
    const pathFile = req.file.path.slice(0, 8);
    const { filename, originalname } = req.file;
    let extension = originalname.slice(originalname.lastIndexOf('.'));
    let Newfilename = name + Date.now() + extension;
    Newfilename = Newfilename.replace(/ /g, "");
    const NewPath = "storage/" + Newfilename;
    const active = '1';
    fs.rename('./public/storage/' + filename, './public/' + NewPath, function (err) {
      if (err) console.log('ERROR: ' + err);
    });
    let passHash = await bcryptjs.hash(pass, 8);

    console.log('add');
    const user = new User(
      {
        name: name,
        email: email,
        pass: passHash,
        access: access,
        photo: NewPath
      });
    await user.save();
    res.send('Se agrego el usuario');

    res.redirect('/lista-usuarios')
  } catch (error) {
    console.log(error)
  }
}

exports.login = async (req, res) => {
  try {
    const { pass, email } = req.body;
    // console.log(email);
    // console.log(pass);

    if (!email || !pass) {

      res.render('login', {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un correo y/o contraseña",
        alertIcon: 'info',
        showConfirmButton: true,
        timer: false,
        ruta: 'login'
      })
    } else {



      const results = await User.find({ email: email }).lean();

      if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))) {
        res.render('login', {
          alert: true,
          alertTitle: "Error",
          alertMessage: "Usuario y/o Password incorrectas",
          alertIcon: 'error',
          showConfirmButton: true,
          timer: false,
          ruta: 'login'
        })
      } else {
        //inicio de sesión OK

        const id = results[0]._id;

        const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
          expiresIn: process.env.JWT_TIEMPO_EXPIRA
        })
        //generamos el token SIN fecha de expiracion
        //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
        console.log("TOKEN: " + token + " para el USUARIO : " + email);

        const cookiesOptions = {
          expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
          httpOnly: true
        }
        res.cookie('jwt', token, cookiesOptions)
        res.render('login', {
          alert: true,
          alertTitle: "Conexión exitosa",
          alertMessage: "¡LOGIN CORRECTO!",
          alertIcon: 'success',
          showConfirmButton: false,
          timer: 2000,
          ruta: ''
        })
      }



    }
  } catch (error) {
    console.log(error)
  }
}

exports.isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)

      const results = await User.find({ _id: decodificada.id }).lean();
      // conexion.query('SELECT idUser,name,email,photo,access FROM users WHERE idUser = ?', [decodificada.id], (error, results) => {
      //     let test = [];
      if (results.length == 0) {
        res.redirect('/login');
      } else {
        
        req.user = results[0];
        //console.log(!results)
        return next();
      }

      // })

    } catch (error) {
      console.log(error)
      res.redirect('/login')
    }
  } else {
    res.redirect('/login')

  }
}

exports.logout = (req, res) => {
  res.clearCookie('jwt')
  return res.redirect('/')
}