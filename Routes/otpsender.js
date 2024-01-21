const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const Admin=require('../models/adminSchema');

const app = express();
const port = 3000;
let toEmail;
// router.use(bodyParser.json());

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://main.dfo2h8ed1l3ni.amplifyapp.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// Replace these with your email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jenil.kajavadara1@gmail.com',
    pass: 'ffqv fonr ojes tcom',
  },
});
let otp;
let otpMap;
let email;


router.post('/send-otp', async (req, res) => {

   
        const admin=await Admin.findOne({username:"admin"});
       toEmail=admin.email;
       console.log(toEmail);
    
    

  // Generate a random 6-digit OTP
   otp = Math.floor(100000 + Math.random() * 900000).toString();
   otpMap = new Map();
  otpMap.set(toEmail, otp);
  const mailOptions = {
    from: 'jenil.kajavadara1@gmail.com',
    to: toEmail,
    subject: 'OTP for Email Verification',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP email:', error);
      return res.status(500).json({ error: 'Error sending OTP email' });
    }

    console.log('OTP email sent:', info.response);
    res.status(200).json({ msg: 'OTP email sent successfully' });
  });
});




router.post('/verify-otp', async(req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://main.dfo2h8ed1l3ni.amplifyapp.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
    const {  otp } = req.body;
    const admin=await Admin.findOne({username:"admin"});
    email= admin.email;

  
    // Retrieve the expected OTP from the map based on the email
    const expectedOtp = otpMap.get(email);
  
    if (!expectedOtp || otp !== expectedOtp) {
      return res.status(401).json({ msg: 'Incorrect OTP' });
    }
  
    // OTP is correct, you can clear it from the map or mark it as used
    otpMap.delete(email);
  
    res.status(601).json({ msg: 'OTP verified successfully' });
  });
  module.exports = router;
