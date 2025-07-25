import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Get Morning Attendance
// @route GET /api/attendance/getSundayAttendance
// @access public

export const getSundayAttendance = asyncHandler(async (req, res) => {
  try {
    const {
      pin_number,
      student_full_name,
      startDate,
      endDate,
      status,
      date,
      category,
    } = req.query;
    const queryDate = date
      ? date
      : new Date().toLocaleDateString().split('/').reverse().join('-');

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
          sa.status as status
        FROM 
            "sundayAttendance" sa
        LEFT JOIN 
            "studentData" sd ON sa.pin_number = sd.pin_number
        LEFT JOIN 
            "studentEducation" se ON sa.pin_number = se.pin_number
        LEFT JOIN 
            "parentDetail" pd ON sa.pin_number = pd.pin_number
        LEFT JOIN 
          "roomAllotment" ra ON sa.pin_number = ra.pin_number
        WHERE 1 = 1`;
    let paramIndex = 1;
    const params = [];

    // Add conditions dynamically based on query parameters
    if (pin_number) {
      query += ` AND sa.pin_number = $${paramIndex}`;
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
      query += ` AND sa.date >= $${paramIndex}`;
      params.push(startDate);
      paramIndex++;
      query += ` AND sa.date <= $${paramIndex}`;
      params.push(endDate);
      paramIndex++;
    } else {
      query += ` AND sa.date = $${paramIndex}`;
      params.push(queryDate);
      paramIndex++;
    }

    if (status) {
      query += ` AND sa.status = $${paramIndex}`;
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
      message: 'Sunday attendance fetched successfully',
      data: response.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Sunday attendance');
  }
});
