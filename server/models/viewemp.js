const mongoose = require('mongoose');

const viewempSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  designation: String,
  gender: String,
  courses: [String],
  image: String // Path to the uploaded image
});

module.exports = mongoose.model('viewemp', viewempSchema);