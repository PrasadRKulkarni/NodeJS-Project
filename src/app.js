require('dotenv').config()
var express = require('express');
var hbs = require('hbs');
var app = express();
var path = require('path');
var PORT = process.env.port || 8085;

console.log(PORT);

require('./db/conn.js');
var Register = require('./models/register.js');

//const static_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.listen(PORT, function () {
    console.log('Server is listening at port : ' + PORT);
});

app.get('/index', function (req, res) {
    res.render('index.hbs');
});

app.get('/register', function (req, res) {
    res.render('register.hbs');
});

app.post('/register', async function (req, res) {
    try {

        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const registerEmployee = new Register({

                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: req.body.password,
                confirmpassword: req.body.cpassword

            });

            var registerd = await registerEmployee.save();
            res.status(201).render('index');
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

//---------------------------------------LOGIN---------------------------------------------
app.get('/login', function (req, res) {
    res.render('login.hbs');
});

app.post('/login', async function (req, res) {
    try {

        const inputEmail = req.body.email;
        const inputPassword = req.body.password;
        //Check if user exists
        var userDetails = await Register.findOne({ email: inputEmail });

        if (userDetails.password === inputPassword) {
            res.status(201).render('index');
        }
        else {
            res.send('Invalid login details');
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});


