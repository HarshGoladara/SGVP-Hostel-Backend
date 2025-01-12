import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Get Night Attendance table
// @route GET /api/attendance/getNightAttendanceTable
// @access public

export const getNightAttendanceTable = asyncHandler(async (req, res) => {
  try {
    const date = new Date().toLocaleDateString().split('/').reverse().join('-');

    // Build the base query
    let query = `
      SELECT
        ra.category,
        COUNT(*) AS total,
        COUNT(CASE WHEN na.status = 'present' THEN 1 END) AS present,
        COUNT(CASE WHEN na.status = 'absent' THEN 1 END) AS absent,
        COUNT(CASE WHEN na.status = 'leave' THEN 1 END) AS leave,
        COUNT(CASE WHEN na.status = 'sick' THEN 1 END) AS sick,
        COUNT(CASE WHEN na.status = 'exam' THEN 1 END) AS exam,
        COUNT(CASE WHEN na.status = 'college' THEN 1 END) AS college,
        COUNT(CASE WHEN na.status = 'job' THEN 1 END) AS job
      FROM
        "roomAllotment" ra
        LEFT JOIN "nightAttendance" na ON ra.pin_number = na.pin_number
    `;
    let paramIndex = 1;
    const params = [];

    query += ` WHERE na.date = $${paramIndex}`;
    params.push(date);
    paramIndex++;

    query += ` GROUP BY ra.category`;

    const response = await db.query(query, params);

    res.status(200).json({
      message: 'Night attendance table fetched successfully',
      data: response.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Night attendance table');
  }
});
