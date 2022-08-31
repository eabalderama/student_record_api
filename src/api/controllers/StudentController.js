const mongoose = require('mongoose');
const Student = require('../models/Student');

module.exports = {
  getAllStudent: async (req, res) => {
    try {
      const students = await Student.find();
      if (students.length > 0) {
        res.json({
          status: true,
          message: 'Successfully fetched students',
          data: students
        });
      } else {
        res.json({
          status: false,
          message: 'No student found'
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error
      });
    }
  },
  getStudentById: async (req, res) => {
    const { id } = req.params;
    try {
      const student = await Student.findById(id);
      if (student) {
        res.json({
          status: true,
          message: 'Successfully fetched student',
          data: student
        });
      } else {
        res.json({
          status: false,
          message: 'Failed to retrieve student'
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error
      });
    }
  },
  updateStudent: async (req, res) => {
    const {
      email, firstname, lastname, course, campus, address, contact_number
    } = req.body;
    const { id } = req.params;
    try {
      const checkEmail = await Student.findOne({ email, _id: { $ne: id } });
      if (checkEmail) {
        res.json({
          status: false,
          message: 'Email already exists',
        });
        return;
      }
      const update = {
        email, firstname, lastname, course, campus, address, contact_number
      };
      const result = await Student.findOneAndUpdate({ _id: id }, update);
      if (result) {
        const updated = await Student.findById(id);
        res.json({
          status: true,
          message: 'Student successfully updated',
          data: updated
        });
      } else {
        res.json({
          status: false,
          message: 'Failed to update student',
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error
      });
    }
  },
  createStudent: async (req, res) => {
    const {
      email, firstname, lastname, course, campus, address, contact_number
    } = req.body;
    const checkEmail = await Student.findOne({ email });
    if (checkEmail) {
      res.json({
        status: false,
        message: 'Email already exists'
      });
    } else {
      const student = new Student({
        _id: new mongoose.Types.ObjectId(),
        email,
        firstname,
        lastname,
        course,
        campus,
        address,
        contact_number
      });

      try {
        const result = await student.save();
        if (result) {
          res.json({
            status: true,
            message: 'Student created',
            data: result
          });
        }
      } catch (error) {
        res.status(500).json({
          status: false,
          error
        });
      }
    }
  },
  deleteStudent: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await Student.deleteOne({ _id: id });
      res.json({
        status: true,
        message: 'Student deleted',
        data: result
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error
      });
    }
  }
};
