import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Update Student Data
// @route PUT api/updateData/updateStudentData
// @access public
export const updateStudentData = asyncHandler(async (req, res) => {
  try {
    const { pin_number } = req.body;
    const {
      student_full_name,
      dob,
      nationality,
      religion,
      address,
      city,
      postal_pin_number,
      student_contact_number,
      student_email,
      student_qualification,
      student_photo_url,
    } = req.body;

    // Dynamically build the query based on provided fields
    let query = 'UPDATE studentData SET ';
    const params = [];

    if (student_full_name) {
      query += 'student_full_name = ?, ';
      params.push(student_full_name);
    }
    if (dob) {
      query += 'dob = ?, ';
      params.push(new Date(dob));
    }
    if (nationality) {
      query += 'nationality = ?, ';
      params.push(nationality);
    }
    if (religion) {
      query += 'religion = ?, ';
      params.push(religion);
    }
    if (address) {
      query += 'address = ?, ';
      params.push(address);
    }
    if (city) {
      query += 'city = ?, ';
      params.push(city);
    }
    if (postal_pin_number) {
      query += 'postal_pin_number = ?, ';
      params.push(postal_pin_number);
    }
    if (student_contact_number) {
      query += 'student_contact_number = ?, ';
      params.push(student_contact_number);
    }
    if (student_email) {
      query += 'student_email = ?, ';
      params.push(student_email);
    }
    if (student_qualification) {
      query += 'student_qualification = ?, ';
      params.push(student_qualification);
    }
    if (student_photo_url) {
      query += 'student_photo_url = ?, ';
      params.push(student_photo_url);
    }

    // Remove the last comma and space from query
    query = query.slice(0, -2);
    query += ' WHERE pin_number = ?';
    params.push(pin_number);

    if (params.length > 1) {
      await db.query(query, params);
    }
    res.status(200).json({
      message: 'Student data updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating student data');
  }
});
