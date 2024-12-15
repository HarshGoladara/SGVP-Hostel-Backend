import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Add student education details
// @route POST /api/admission/addStudentEducation
// @access public

export const addStudentEducation = asyncHandler(async (req, res) => {
  try {
    const {
      pin_number,
      name_of_university,
      name_of_collage,
      course,
      branch,
      course_duration_years,
      current_year,
      current_sem,
    } = req.body;

    const query = `
            INSERT INTO "studentEducation" (
                pin_number, name_of_university, name_of_collage, course, branch, course_duration_years, current_year, current_sem
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

    await db.query(query, [
      pin_number,
      name_of_university,
      name_of_collage,
      course,
      branch,
      course_duration_years,
      current_year,
      current_sem,
    ]);

    res.status(201).json({
      message: 'Student education data added successfully',
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(`Error adding student education data:- ${error.sqlMessage}`);
  }
});
