const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true, 
    match: /^\S+@\S+\.\S+$/ // Regular expression for basic email format
  },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;


