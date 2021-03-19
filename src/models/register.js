var mongoose = require('mongoose');

//Define the schema
var employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },  
    lastname: {
        type: String,
        required: true
    },   
    email: {
        type: String,
        required: true,
        unique: true        
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmpassword: {
        type: String
        //required: true,
    },
      
});

// Create a model - create a new collection
// 'Register' is the collection name in DB 
var Register = new mongoose.model('Register', employeeSchema)

//Export this module to app.js
module.exports = Register;