const mongoose=require('mongoose');
const schema=mongoose.Schema;

const markS3Schema=new schema({
    Id: {
        type: String, // Adjust the type accordingly
        required: true,
    },
    CO1_1 : Number,
    CO2_1 : Number,
    CO3_1 : Number,
    CO4_1 : Number,
    CO5_1 : Number,
    CO6_1 : Number,

    CO1_2: Number,
    CO2_2 : Number,
    CO3_2 : Number,
    CO4_2 : Number,
    CO5_2 : Number,
    CO6_2 : Number,

    CO1_3: Number,
    CO2_3 : Number,
    CO3_3 : Number,
    CO4_3 : Number,
    CO5_3 : Number,
    CO6_3 : Number
});

module.exports =markS3Schema;