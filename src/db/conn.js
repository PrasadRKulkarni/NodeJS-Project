const mongoose = require('mongoose');

//Create connection to DB
mongoose.connect("mongodb://localhost:27017/Students-API", {
    useNewUrlParser : true, useUnifiedTopology : true, 
    useFindAndModify : true, useCreateIndex : true, useFindAndModify : false
}).then (function () {
    console.log("Connection successful.");
}).catch (function (err) {
    console.log(err);
});


