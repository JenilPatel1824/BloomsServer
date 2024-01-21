const mongoose=require('mongoose');
const schema=mongoose.Schema;

const semrollschema=new schema({
    Roll_no : String,
    Sem : Number,
    Id: String,

});

module.exports =semrollschema;