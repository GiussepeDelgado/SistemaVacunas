const image = document.getElementById('imageUpload');
const name = document.getElementById('name');
const email = document.getElementById('email');
const pass = document.getElementById('pass');
const passConf = document.getElementById('passconf');
const access = document.getElementById('access');
const inputs = document.querySelectorAll('#form input')
const form = document.getElementById('form');
var fileTypesPerfil = ['jpg', 'jpeg', 'png', 'jfif'];
window.addEventListener('pageshow', () => {


    form.reset();

    document.querySelector(`#g__imgPerf .form__input-error`).classList.remove('low');
    document.querySelector(`#alert__name`).classList.remove('active');
    document.querySelector(`#alert__email`).classList.remove('active');
    document.querySelector(`#alert__pass`).classList.remove('active');
    document.querySelector(`#alert__passconf`).classList.remove('active');
    document.querySelector(`#alert__access`).classList.remove('active');

});

const campos = {
    name: false,
    email: false,
    pass: false,
    passconf: false,
    access: false,
    img: false
}

function readURL(input) {
    if (input.files && input.files[0]) {

        var extension = input.files[0].name.split('.').pop().toLowerCase(), //file extension from input file
            isSuccess = fileTypesPerfil.indexOf(extension) > -1;

        if (isSuccess) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);

            campos['img'] = true;
            document.querySelector(`#g__imgPerf .form__input-error`).classList.add('low');
        } else {
            document.querySelector(`#g__imgPerf .form__input-error`).classList.remove('low');
        }

    } else {

    }

}

function changeNameFile(email) {
    let extension = image.files[0].name.split('.').pop().toLowerCase()
    let newNameFile = email + extension;
    image.file[0].name = newNameFile;
}
image.addEventListener('change', function() {

    readURL(this);

});

const expresiones = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    pass: /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/,
    passconf: /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/,
}



function validateInput(e) {
    if (expresiones[e.target.name].test(e.target.value)) {
        campos[e.target.name] = true;
        e.target.classList.remove('is-invalid');
        console.log(`#alert__${e.target.name}`)
        document.querySelector(`#alert__${e.target.name}`).classList.remove('active');
        if (e.target.name === 'passconf') {
            if (e.target.value !== pass.value) {
                campos[e.target.name] = false;
                e.target.classList.add('is-invalid');
                document.querySelector(`#alert__${e.target.name}`).classList.add('active');
            }
        }

    } else {

        campos[e.target.name] = false;
        e.target.classList.add('is-invalid');
        console.log(`.alert__${e.target.name}`)
        document.querySelector(`#alert__${e.target.name}`).classList.add('active');
    }

};

inputs.forEach((input) => {

    input.addEventListener('keyup', validateInput);
    input.addEventListener('blur', validateInput);
});

access.addEventListener('blur', (e) => {
    console.log(e.target.value)
    if (e.target.value === 'Selecciona tipo de usuario...') {
        document.querySelector(`#alert__${e.target.name}`).classList.add('active');
        campos[e.target.name] = false;
    } else {
        campos[e.target.name] = true;
        document.querySelector(`#alert__${e.target.name}`).classList.remove('active');
    }
});


form.addEventListener('submit', (e) => {
    const { name, email, pass, passconf, access, img } = campos;
    if (name && email && pass && passconf && access && img) {
        //changeNameFile(email.name);
    } else {
        e.preventDefault();
        Swal.fire({
            title: 'Formulario Incompleto!',
            text: 'Completa de forma correcta el formulario',
            icon: 'warning',
            timer: 5000,
            returnFocus: false
        })
    }
});