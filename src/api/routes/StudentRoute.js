const express = require('express');

const router = express.Router();
const StudentAction = require('../controllers/StudentController');

// List All Student
router.get('/', StudentAction.getAllStudent);
// Create Student
router.post('/', StudentAction.createStudent);
// Get student by ID
router.get('/:id', StudentAction.getStudentById);
// Update Student
router.post('/:id', StudentAction.updateStudent);
// Delete Student
router.delete('/:id', StudentAction.deleteStudent);

module.exports = router;
