const mongoose=require('mongoose');
const schema=mongoose.Schema;

const flagForSessional=new schema({
    sessional : Number,
    flag : Boolean
});

module.exports =flagForSessional;