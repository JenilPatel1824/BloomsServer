const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");
const professorSchema = require("../models/professorSchema");
const studentSchema = require("../models/studentSchema");
const Professor = mongoose.model("Professor", professorSchema);
const Student = mongoose.model("Student", studentSchema);
const secretKey = "abcd";
const Admin = require("../models/adminSchema");
const {
  verifyToken,
  verifyAdminToken,
  verifyStudentToken,
} = require("./middleware/auth"); // Assuming you have this middleware

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const invalidatedTokens = [];
const invalidatedAdminTokens = [];
const invalidatedStudentTokens = [];

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
  res.header("Access-Control-Allow-Origin", "*" || process.env.ALLOWED_ORIGIN);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  try {
    const professor = await Professor.findOne({ username: username });
    const student = await Student.findOne({ username: username });
    const admin = await Admin.findOne({ username: username });

    console.log(student);
    console.log(professor);
    console.log(admin);

    if (!professor && !student && !admin) {
      return res.status(401).json({ error: "Incorrect Username or Password" });
    } else if (professor) {
    /* else if (!student) {
      console.log("Hello from std");
      return res.status(401).json({ error: "Incorrect Username or Password" });
    } 
    */
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
        .json({
          msg: "Login Successful",
          authToken: token,
          username: username,
        });
    } else if (student) {
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
        .json({
          msg: "Login Successful",
          studentToken: token,
          username: username,
        });
    } else if (admin) {
      console.log("in admin: " + admin.password);
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

        .json({
          msg: "Login Successful",
          adminToken: token,
          username: username,
        });
    }
  } catch (error) {
    return res.status(401).json({ error: "Login Failed" });
  }
});

router.post("/logout", verifyToken, (req, res) => {
  // Assuming you have a middleware that sets req.user with the decoded user data
  const { userId } = req.user;

  // Check if the token is in the invalidatedTokens list
  if (invalidatedTokens.includes(req.cookies.token)) {
    return res.status(401).json({ error: "Token already invalidated" });
  }

  // Logic to invalidate the token
  invalidatedTokens.push(req.cookies.token);

  // Clear the token from the client side
  res.clearCookie("token");

  res.json({ message: "Logout successful" });
});

router.post("/alogout", verifyAdminToken, (req, res) => {
  // Assuming you have a middleware that sets req.user with the decoded user data
  const { userId } = req.user;

  // Check if the token is in the invalidatedTokens list
  if (invalidatedAdminTokens.includes(req.cookies.token)) {
    return res.status(401).json({ error: "Token already invalidated" });
  }

  // Logic to invalidate the token
  invalidatedAdminTokens.push(req.cookies.token);

  // Clear the token from the client side
  res.clearCookie("token");

  res.json({ message: "Logout successful" });
});

router.post("/slogout", verifyStudentToken, (req, res) => {
  // Assuming you have a middleware that sets req.user with the decoded user data
  const { userId } = req.user;

  // Check if the token is in the invalidatedTokens list
  if (invalidatedStudentTokens.includes(req.cookies.token)) {
    return res.status(401).json({ error: "Token already invalidated" });
  }

  // Logic to invalidate the token
  invalidatedStudentTokens.push(req.cookies.token);

  // Clear the token from the client side
  res.clearCookie("token");

  res.json({ message: "Logout successful" });
});

module.exports = router;
