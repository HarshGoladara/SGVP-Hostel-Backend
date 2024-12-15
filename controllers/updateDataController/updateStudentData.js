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
      caste,
      address,
      city,
      postal_pin_number,
      student_contact_number,
      student_email,
      student_qualification,
      student_photo_url,
    } = req.body;

    // Dynamically build the query based on provided fields
    let query = 'UPDATE "studentData" SET ';
    const params = [];
    let paramIndex = 1;

    if (student_full_name) {
      query += `student_full_name = $${paramIndex}, `;
      params.push(student_full_name);
      paramIndex++;
    }
    if (dob) {
      query += `dob = $${paramIndex}, `;
      params.push(new Date(dob));
      paramIndex++;
    }
    if (nationality) {
      query += `nationality = $${paramIndex}, `;
      params.push(nationality);
      paramIndex++;
    }
    if (religion) {
      query += `religion = $${paramIndex}, `;
      params.push(religion);
      paramIndex++;
    }
    if (caste) {
      query += `caste = $${paramIndex}, `;
      params.push(caste);
      paramIndex++;
    }
    if (address) {
      query += `address = $${paramIndex}, `;
      params.push(address);
      paramIndex++;
    }
    if (city) {
      query += `city = $${paramIndex}, `;
      params.push(city);
      paramIndex++;
    }
    if (postal_pin_number) {
      query += `postal_pin_number = $${paramIndex}, `;
      params.push(postal_pin_number);
      paramIndex++;
    }
    if (student_contact_number) {
      query += `student_contact_number = $${paramIndex}, `;
      params.push(student_contact_number);
      paramIndex++;
    }
    if (student_email) {
      query += `student_email = $${paramIndex}, `;
      params.push(student_email);
      paramIndex++;
    }
    if (student_qualification) {
      query += `student_qualification = $${paramIndex}, `;
      params.push(student_qualification);
      paramIndex++;
    }
    if (student_photo_url) {
      query += `student_photo_url = $${paramIndex}, `;
      params.push(student_photo_url);
      paramIndex++;
    }

    // Remove the last comma and space from query
    query = query.slice(0, -2);
    query += ` WHERE pin_number = $${paramIndex}`;
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
