const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");
const professorSchema = require("../models/professorSchema");
const studentSchema = require("../models/studentSchema");
const Professor = mongoose.model("Professor", professorSchema);
const Student = mongoose.model("Student", studentSchema);
const secretKey='abcd';
const Admin=require('../models/adminSchema');

/*router.post("/register", async (req, res) => {
    const { username, password, name, city, email, mobile_no } = req.body;
  
    try {
      const existingUser = await Customer.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with the same email or username already exists" });
      }
  
      const existingCollage = await Customer.findOne({ username: username });
      if (existingCollage) {
        return res
          .status(402)
          .json({ error: "This College is already registered" });
      }
  
      const saltRounds = 10;
      //const hashedPassword = await bcrypt.hash(password, saltRounds);
      const hashedPassword=password;
      const new_customer = new Customer({
        username,
        password: hashedPassword,
        name: name,
        city,
        email,
        mobile_no: mobile_no,
      });
  
      await new_customer.save();
      const payload = {
        user: {
          id: new_customer._id,
          username: new_customer.username,
        },
      };
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  
      res.cookie("token", token, { httpOnly: true });
      return res.status(200).json({ msg: "Registration Successful", authToken: token });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });*/
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://main.dfo2h8ed1l3ni.amplifyapp.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const professor = await Professor.findOne({ username: username });
    const student = await Student.findOne({ username: username });
    const admin = await Admin.findOne({username:username});

    console.log(student);
    console.log(professor);
    console.log(admin);

    if (!professor && !student &&!admin) {
      
      return res.status(401).json({ error: "Incorrect Username or Password" });
    } 
   /* else if (!student) {
      console.log("Hello from std");
      return res.status(401).json({ error: "Incorrect Username or Password" });
    } 
    */
    else if (professor) {
      //const passwordMatch = await bcrypt.compare(password, customer.password);
      //console.log(password);
      //console.log(customer.password);
      
      if (password == professor.password) {
        passwordMatch = true;
      }

      if (!passwordMatch) {
        return res
          .status(401)
          .json({ error: "Incorrect Username or Password" });
      }
      passwordMatch = false;
      const payload = {
        user: {
          id: professor._id,
          username: professor.username,
        },
      };
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      res.cookie("token", token, { httpOnly: true });

      return res
        .status(200)
        .json({ msg: "Login Successful", authToken: token,username:username });
    } 
    
    else if (student) {

      if (password == student.password) {
        passwordMatch = true;
      }

      if (!passwordMatch) {
        return res
          .status(401)
          .json({ error: "Incorrect Username or Password" });
      }
      passwordMatch = false;
      const payload = {
        user: {
          id: student._id,
          username: student.username,
        },
      };
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      res.cookie("token", token, { httpOnly: true });
      return res
        .status(201)
        .json({ msg: "Login Successful", studentToken: token ,username:username});
    }

    else if (admin) {
      console.log("in admin: "+admin.password);
      //const passwordMatch = await bcrypt.compare(password, customer.password);
      //console.log(password);
      //console.log(customer.password);
      
      if (password == admin.password) {
        passwordMatch = true;
      }

      if (!passwordMatch) {
        return res
          .status(401)
          .json({ error: "Incorrect Username or Password" });
      }
      passwordMatch = false;
      const payload = {
        user: {
          id: admin._id,
          username: admin.username,
        },
      };
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      res.cookie("token", token, { httpOnly: true });

      return res
 
        .status(202)

        
        .json({ msg: "Login Successful", adminToken: token,username:username });
    } 




  } catch (error) {
    return res.status(401).json({ error: "Login Failed" });
  }
});

module.exports = router;
