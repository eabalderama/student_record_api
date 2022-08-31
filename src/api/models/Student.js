const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  course: { type: String, required: true },
  campus: { type: String, required: true },
  address: { type: String, required: true },
  contact_number: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);
