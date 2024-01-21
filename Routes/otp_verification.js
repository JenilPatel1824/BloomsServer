// const express = require('express');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
// const router = express.Router();
// const mongoose = require('mongoose');
// const Admin = require('../models/adminSchema');

// const secretKey = 'abcd';

// // Configure Nodemailer for sending emails
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',
//     pass: 'your-email-password',
//   },
// });

// // Generate a random 6-digit OTP
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // Route for admin login
// router.post('/otpverification', async (req, res) => {
//   const {  otp } = req.body;
//   console.log(otp);

//   try {
//     const admin = await Admin.findOne({ username });

//     if (!admin) {
//       return res.status(401).json({ error: 'Incorrect Username or Password' });
//     }

//     if (!admin.isVerified) {
//       // If not verified, send verification email
//       const verificationToken = crypto.randomBytes(20).toString('hex');
//       admin.verificationToken = verificationToken;
//       await admin.save();

//       const verificationLink = `http://your-app-url/verify/${verificationToken}`;
//       const mailOptions = {
//         from: 'your-email@gmail.com',
//         to: admin.email,
//         subject: 'Email Verification for Admin Login',
//         text: `Click the following link to verify your email and proceed with login: ${verificationLink}`,
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           return res.status(500).json({ error: 'Error sending verification email' });
//         }
//         res.status(200).json({ msg: 'Verification email sent. Check your inbox.' });
//       });

//       return;
//     }

//     // Check password
//     if (password !== admin.password) {
//       return res.status(401).json({ error: 'Incorrect Username or Password' });
//     }

//     if (otp) {
//       // Check OTP
//       if (otp !== admin.otp) {
//         return res.status(401).json({ error: 'Incorrect OTP' });
//       }
//     } else {
//       // Generate OTP and send it via email
//       const generatedOTP = generateOTP();
//       admin.otp = generatedOTP;
//       await admin.save();

//       const mailOptions = {
//         from: 'your-email@gmail.com',
//         to: admin.email,
//         subject: 'OTP for Admin Login',
//         text: `Your OTP is: ${generatedOTP}`,
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           return res.status(500).json({ error: 'Error sending OTP' });
//         }
//         res.status(200).json({ msg: 'OTP sent. Check your email.' });
//       });

//       return;
//     }

//     // If everything is successful, generate a token
//     const payload = {
//       user: {
//         id: admin._id,
//         username: admin.username,
//       },
//     };
//     const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

//     res.cookie('token', token, { httpOnly: true });
//     return res.status(200).json({ msg: 'Login Successful', authToken: token, username });
//   } catch (error) {
//     console.error('Login error:', error);
//     return res.status(401).json({ error: 'Login Failed' });
//   }
// });

// module.exports = router;
