// const mongoose=require('mongoose');
// const schema=mongoose.Schema;

// const markS1Schema = new mongoose.Schema({
//     Id: { type: String },
//     CO1_1: { type: String },
//     CO2_1: { type: String },
//     CO3_1: { type: String },
//     CO4_1: { type: String },
//     CO5_1: { type: String },
//     CO6_1: { type: String },
// });
// module.exports =markS1Schema;

const mongoose=require('mongoose');
const schema=mongoose.Schema;

const markS1Schema=new schema({
    Roll_no: {
        type: String, // Adjust the type accordingly
        required: true,
    },
    dbms : [Number],
    sub2 : [Number],
    sub3 : [Number],
    sub4 : [Number],
});

module.exports =markS1Schema;