const { type } = require('express/lib/response');
const mongoose= require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login");



// database connected or not 
connect.then (()=>{
    console.log("Database connected ")
})
.catch(()=>{
    console.log("Database not connnected ")
})


// create  a schema 
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
          },
    
          password: {
            type:String,
            required:true, 
          }

});


// create a model  (collection part)
 const collection = new mongoose.model( "users", LoginSchema);

 module.exports= collection;