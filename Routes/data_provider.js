// Assuming you have the necessary imports and setup for Express and Mongoose
const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();
const markS1Schema = require('../models/markS1Schema');
const markS2Schema = require('../models/markS2Schema');
const markS3Schema = require('../models/markS3Schema');
const flagForSessional = require('../models/flagForSessional');
const semrollschema=require('../models/semrollschema')
const Student = require('../models/Student'); // Import your Student schema
const Mark = require('../models/mark'); // Import your Mark schema
const studentSchema = require('../models/studentSchema');
const Studentmain=mongoose.model('student',studentSchema);


let StudentModel;

//const StudentModel = mongoose.model("it2021dbms1", markS1Schema);


router.post("/fetchmark", async (req, res) => {
  const { luname } = req.body;

  try {
    // Look for the student with the provided luname in the MongoDB database
    luname.toString();
    // let lluname=luname.slice();
    // let uyear = lluname[0]+lluname[1];
    // uyear="20"+uyear;
    // let udep = lluname[2]+lluname[3];
    // udep.toLowerCase();
    // let usessional;

    // let databasename=udep+uyear+"dbms";
    // const flagModel=mongoose.model("flag"+udep+uyear+"dbms",flagForSessional);
    
    
    // const sess1= await flagModel.findOne({sessional : 1});
    // if(sess1.flag)
    // {
    //   usessional=1;
    // }

    // const sess2= await flagModel.findOne({sessional : 2});
    // if(sess2.flag)
    // {
    //   usessional=2;
    // }

    // const sess3= await flagModel.findOne({sessional : 3});
    // const sess2= await flagModel.findOne({sessional : 2});
    // const sess1= await flagModel.findOne({sessional : 1});

    // if(sess3.flag)
    // {
    //   usessional=3;
    // }
    // else if(sess2.flag)
    // {

    //   usessional=2;
    // }
    // else if(sess1.flag)
    // {
    //   usessional=1;
    // }
    
    
    
    
    //databasename+=usessional;


    // if(usessional==1)
    // {
    //    StudentModel = mongoose.model(databasename, markS1Schema);
    // }
    // if(usessional==2)
    // {
    //   StudentModel = mongoose.model(databasename, markS2Schema);
    // }
    // if(usessional==3)
    // {
    //    StudentModel = mongoose.model(databasename, markS3Schema);
    // }

    let usessional=4;

    //StudentModel = mongoose.model("semroll", semrollschema);
    const studentl = await Student.findOne({ id: luname });
    let sem=studentl.sem;
    let roll=studentl.roll;

    // const stdidinmain=await Studentmain.findOne({username: luname});
    let ids=studentl._id;

    console.log(roll);
    //console.log(studentl);
    const m1=await Mark.find({studentId:ids});
    console.log(m1);



    //const student = await StudentModel.findOne({ Id: luname });
    //Const  = mongoose.model(databasename, markS1Schema);

    //const student1=await 
    console.log(luname);
    //console.log(usessional);

  //  if(usessional==1){
  //   const CO1_1 = parseInt(student.CO1_1);
  //   const CO2_1 = parseInt(student.CO2_1);
  //   const CO3_1 = parseInt(student.CO3_1);
  //   const CO4_1 = parseInt(student.CO4_1);
  //   const CO5_1 = parseInt(student.CO5_1);
  //   const CO6_1 = parseInt(student.CO6_1);


  //   // If student found, calculate the total of CO1 to CO6
  //   const total = CO1_1 + CO2_1 + CO3_1 + CO4_1 + CO5_1 + CO6_1;
  //   // Return the student data along with the total
  //   res.status(200).json({


  //     CO1_1: CO1_1,
  //     CO2_1: CO2_1,
  //     CO3_1: CO3_1,
  //     CO4_1: CO4_1,
  //     CO5_1: CO5_1,
  //     CO6_1: CO6_1,
  //     Total1: total
  //   });
  // }

  // if(usessional==2){
  //   const CO1_1 = parseInt(student.CO1_1);
  //   const CO2_1 = parseInt(student.CO2_1);
  //   const CO3_1 = parseInt(student.CO3_1);
  //   const CO4_1 = parseInt(student.CO4_1);
  //   const CO5_1 = parseInt(student.CO5_1);
  //   const CO6_1 = parseInt(student.CO6_1);
  //   const CO1_2 = parseInt(student.CO1_2);
  //   const CO2_2 = parseInt(student.CO2_2);
  //   const CO3_2 = parseInt(student.CO3_2);
  //   const CO4_2 = parseInt(student.CO4_2);
  //   const CO5_2 = parseInt(student.CO5_2);
  //   const CO6_2 = parseInt(student.CO6_2);



  //   // If student found, calculate the total of CO1 to CO6
  //   const total1 = CO1_1 + CO2_1 + CO3_1 + CO4_1 + CO5_1 + CO6_1;
  //   const total2 = CO1_2 + CO2_2 + CO3_2 + CO4_2 + CO5_2 + CO6_2;
  //   // Return the student data along with the total
  //   res.status(200).json({


  //     CO1_1: CO1_1,
  //     CO2_1: CO2_1,
  //     CO3_1: CO3_1,
  //     CO4_1: CO4_1,
  //     CO5_1: CO5_1,
  //     CO6_1: CO6_1,
  //     Total1: total1,
  //     CO1_2: CO1_2,
  //     CO2_2: CO2_2,
  //     CO3_2: CO3_2,
  //     CO4_2: CO4_2,
  //     CO5_2: CO5_2,
  //     CO6_2: CO6_2,
  //     Total2: total2
  //   });
  // }

  // if(usessional==3){

  //   const CO1_1 = parseInt(student.CO1_1);
  //   const CO2_1 = parseInt(student.CO2_1);
  //   const CO3_1 = parseInt(student.CO3_1);
  //   const CO4_1 = parseInt(student.CO4_1);
  //   const CO5_1 = parseInt(student.CO5_1);
  //   const CO6_1 = parseInt(student.CO6_1);
  //   const CO1_2 = parseInt(student.CO1_2);
  //   const CO2_2 = parseInt(student.CO2_2);
  //   const CO3_2 = parseInt(student.CO3_2);
  //   const CO4_2 = parseInt(student.CO4_2);
  //   const CO5_2 = parseInt(student.CO5_2);
  //   const CO6_2 = parseInt(student.CO6_2);
  //   const CO1_3 = parseInt(student.CO1_3);
  //   const CO2_3 = parseInt(student.CO2_3);
  //   const CO3_3 = parseInt(student.CO3_3);
  //   const CO4_3 = parseInt(student.CO4_3);
  //   const CO5_3 = parseInt(student.CO5_3);
  //   const CO6_3 = parseInt(student.CO6_3);
  


  //   // If student found, calculate the total of CO1 to CO6
  //   const total1 = CO1_1 + CO2_1 + CO3_1 + CO4_1 + CO5_1 + CO6_1;
  //   const total2 = CO1_2 + CO2_2 + CO3_2 + CO4_2 + CO5_2 + CO6_2;
  //   const total3 = CO1_3 + CO2_3 + CO3_3 + CO4_3 + CO5_3 + CO6_3;
  //   // Return the student data along with the total
  //   res.status(200).json({


  //     CO1_1: CO1_1,
  //     CO2_1: CO2_1,
  //     CO3_1: CO3_1,
  //     CO4_1: CO4_1,
  //     CO5_1: CO5_1,
  //     CO6_1: CO6_1,
  //     Total1: total1,
  //     CO1_2: CO1_2,
  //     CO2_2: CO2_2,
  //     CO3_2: CO3_2,
  //     CO4_2: CO4_2,
  //     CO5_2: CO5_2,
  //     CO6_2: CO6_2,
  //     Total2: total2,
  //     CO1_3: CO1_3,
  //     CO2_3: CO2_3,
  //     CO3_3: CO3_3,
  //     CO4_3: CO4_3,
  //     CO5_3: CO5_3,
  //     CO6_3: CO6_3,
  //     Total3: total3
  //   });
  // }
  res.status(200).json({
    m1: m1,
  });



  } catch (error) {
    console.error('Error retrieving student data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});


module.exports = router;
