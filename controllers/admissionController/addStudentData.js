import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Add new Student
// @route POST /api/admission/addStudentData
// @access public

export const addStudentData = asyncHandler(async (req, res) => {
  try {
    const {
      pin_number,
      student_full_name,
      dob,
      nationality,
      religion,
      caste,
      address,
      city,
      postal_pin_number,
      student_contact_number,
      student_email,
      student_qualification,
      student_photo_url,
    } = req.body;

    const query = `
            INSERT INTO "studentData" (
                pin_number, student_full_name, dob, nationality, religion, caste, address, city, postal_pin_number, 
                student_contact_number, student_email, student_qualification, student_photo_url
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        `;

    await db.query(query, [
      pin_number,
      student_full_name,
      dob,
      nationality,
      religion,
      caste,
      address,
      city,
      postal_pin_number,
      student_contact_number,
      student_email,
      student_qualification,
      student_photo_url,
    ]);

    res.status(201).json({
      message: 'Student data added successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error adding student data:- ${error.sqlMessage}`);
  }
});
