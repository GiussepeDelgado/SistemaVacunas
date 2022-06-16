const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const { promisify } = require('util')
const fs = require('fs');
const User = require('../models/db/User');

exports.readUsersData = async (req, res) => {


  results = [{
    idUser: '1',
    name: 'Julian Alvarez',
    email: 'julian.alvarez@intercorp.com',
    access: 'Admnistrador'
  }];
  //pass:Codigomorse01
  data = JSON.stringify(results);
  res.send(data);

}

exports.register = async (req, res) => {
  try {
    //const { email, user } = req.body;
    //trae data de la base de datos a result
    //results.length == 0 || !(email === results[0].email && '1' === active
    if (true) {
      saveUser(req, res);
      res.render('userForm', {
        alert: true,
        alertTitle: "Registro exitoso ",
        alertMessage: "¡Felicidades!",
        alertIcon: 'success',
        showConfirmButton: false,
        timer: 2000,
        ruta: 'lista-usuarios',
        //user: user
      });
    }else{
      res.render('userForm', {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Correo electronico  ya registrado",
        alertIcon: 'info',
        showConfirmButton: true,
        timer: 2000,
        ruta: 'userform',
        //user: user
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

    console.log(error);

    // conexion.query('INSERT INTO users SET ?', { name, email, pass: passHash, access, photo: NewPath, active }, (error, results) => {

    //     if (error) { console.log(error) }
    //     //     res.redirect('/')
    //     // })
    //     //const { imageUpload } = req.files;
    //     // // const name = req.body.name
    //     // // const user = req.body.user
    //     // // const pass = req.body.pass
    //     // let passHash = await bcryptjs.hash(pass, 8)
    //     //     //console.log(passHash)   
    //     // conexion.query('INSERT INTO user SET ?', { username: user, name: name, pass: passHash }, (error, results) => {
    //     //     if (error) { console.log(error) }
    //     //     res.redirect('/')
    //     // })
    // });
    res.redirect('/lista-usuarios')
  } catch (error) {
    console.log(error)
  }
}