const mongoose=require('mongoose');
const schema=mongoose.Schema;

const professorSchema=new schema({

    name : String,
    password: String,
    username : String,
    department: String,
    email : String,
    mobile_no : Number
});

module.exports =professorSchema;
