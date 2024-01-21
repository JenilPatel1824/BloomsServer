const mongoose=require('mongoose');
const schema=mongoose.Schema;

const markS3Schema=new schema({
    Roll_no: {
        type: String, // Adjust the type accordingly
        required: true,
    },
    dbms : [Number],
    sub2 : [Number],
    sub3 : [Number],
    sub4 : [Number],
});

module.exports =markS3Schema;