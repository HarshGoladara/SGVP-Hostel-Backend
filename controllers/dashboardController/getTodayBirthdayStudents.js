import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch Student Info (Paginated or by Name or Pin Number)
// @route GET /api/dashboard/getTodayBirthdayStudents
// @access public
export const getTodayBirthdayStudents = asyncHandler(async (req, res) => {
  try {
    // Base query for fetching student data
    let query = `
      SELECT 
          sd.pin_number,
          sd.student_full_name
      FROM 
          "studentData" sd
      WHERE sd.is_alumni = false
      AND to_char(sd.dob, 'MM-DD') = to_char(CURRENT_DATE, 'MM-DD')
    `;

    query += ` ORDER BY sd.pin_number`;

    // Execute the query
    const results = await db.query(query);

    res.status(200).json({
      data: results.rows,
      total_birthday_students: results.rowCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving birthday students');
  }
});
