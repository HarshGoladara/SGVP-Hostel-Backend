import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Update Student Education Details
// @route PUT /api/updateData/updateStudentEducation
// @access public

export const updateStudentEducation = asyncHandler(async (req, res) => {
  try {
    const { pin_number } = req.body;
    const {
      name_of_university,
      name_of_collage,
      course,
      branch,
      course_duration_years,
      current_year,
      current_sem,
    } = req.body;

    let query = 'UPDATE "studentEducation" SET ';
    const params = [];

    if (name_of_university) {
      query += 'name_of_university = ?, ';
      params.push(name_of_university);
    }
    if (name_of_collage) {
      query += 'name_of_collage = ?, ';
      params.push(name_of_collage);
    }
    if (course) {
      query += 'course = ?, ';
      params.push(course);
    }
    if (branch) {
      query += 'branch = ?, ';
      params.push(branch);
    }
    if (course_duration_years) {
      query += 'course_duration_years = ?, ';
      params.push(course_duration_years);
    }
    if (current_year) {
      query += 'current_year = ?, ';
      params.push(current_year);
    }
    if (current_sem) {
      query += 'current_sem = ?, ';
      params.push(current_sem);
    }

    query = query.slice(0, -2);
    query += ' WHERE pin_number = ?';
    params.push(pin_number);

    if (params.length > 1) {
      await db.query(query, params);
    }

    res.status(200).json({
      message: 'Student education data updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating student education data');
  }
});
