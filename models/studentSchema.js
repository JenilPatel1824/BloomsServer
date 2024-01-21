const mongoose=require('mongoose');
const schema=mongoose.Schema;

const studentSchema=new schema({

    name : String,
    password: String,
    username : String,
    department: String,
    email : String,
    mobile_no : Number,
    Admission_Year: Number
});

module.exports =studentSchema;
