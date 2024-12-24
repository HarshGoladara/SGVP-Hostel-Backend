import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Get Morning Attendance
// @route GET /api/attendance/getMorningAttendance
// @access public

export const getMorningAttendance = asyncHandler(async (req, res) => {
  try {
    const {
      pin_number,
      student_full_name,
      startDate,
      endDate,
      status,
      category,
    } = req.query;
    const date = new Date().toLocaleDateString().split('/').reverse().join('-');

    // Build the base query
    let query = `SELECT 
        sd.pin_number,
          sd.student_full_name,
          sd.student_contact_number,
          sd.student_email,
          se.name_of_university,
          se.current_year,
          se.current_sem,
          pd.father_name,
          pd.father_contact_number,
          ra.room_number as room_number,
          ra.bed_number as bed_number,
          ma.date as date
        FROM 
            "morningAttendance" ma
        LEFT JOIN 
            "studentData" sd ON ma.pin_number = sd.pin_number
        LEFT JOIN 
            "studentEducation" se ON ma.pin_number = se.pin_number
        LEFT JOIN 
            "parentDetail" pd ON ma.pin_number = pd.pin_number
        LEFT JOIN 
          "roomAllotment" ra ON ma.pin_number = ra.pin_number
        WHERE 1 = 1`;
    let paramIndex = 1;
    const params = [];

    // Add conditions dynamically based on query parameters
    if (pin_number) {
      query += ` AND ma.pin_number = $${paramIndex}`;
      params.push(pin_number);
      paramIndex++;
    }

    if (student_full_name) {
      query += ` AND sd.student_full_name ILIKE $${paramIndex}`;
      params.push(`%${student_full_name}%`);
      paramIndex++;
    }

    if (
      startDate &&
      endDate &&
      startDate <= endDate &&
      (pin_number || student_full_name)
    ) {
      query += ` AND ma.date >= $${paramIndex}`;
      params.push(startDate);
      paramIndex++;
      query += ` AND ma.date <= $${paramIndex}`;
      params.push(endDate);
      paramIndex++;
    } else {
      query += ` AND ma.date = $${paramIndex}`;
      params.push(date);
      paramIndex++;
    }

    if (status) {
      query += ` AND ma.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    if (category) {
      query += ` AND ra.category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    const response = await db.query(query, params);

    res.status(200).json({
      message: 'Morning attendance fetched successfully',
      data: response.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Morning attendance');
  }
});
