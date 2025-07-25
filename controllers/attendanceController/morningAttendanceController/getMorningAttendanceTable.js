import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Get Morning Attendance table
// @route GET /api/attendance/getMorningAttendanceTable
// @access public

export const getMorningAttendanceTable = asyncHandler(async (req, res) => {
  try {
    const date = new Date().toLocaleDateString().split('/').reverse().join('-');

    // Build the base query
    let query = `
      SELECT
        ra.category,
        COUNT(*) AS total,
        COUNT(CASE WHEN ma.status = 'present' THEN 1 END) AS present,
        COUNT(CASE WHEN ma.status = 'absent' THEN 1 END) AS absent,
        COUNT(CASE WHEN ma.status = 'leave' THEN 1 END) AS leave,
        COUNT(CASE WHEN ma.status = 'sick' THEN 1 END) AS sick,
        COUNT(CASE WHEN ma.status = 'exam' THEN 1 END) AS exam,
        COUNT(CASE WHEN ma.status = 'college' THEN 1 END) AS college,
        COUNT(CASE WHEN ma.status = 'job' THEN 1 END) AS job
      FROM
        "roomAllotment" ra
        LEFT JOIN "morningAttendance" ma ON ra.pin_number = ma.pin_number
    `;
    let paramIndex = 1;
    const params = [];

    query += ` WHERE ma.date = $${paramIndex}`;
    params.push(date);
    paramIndex++;

    query += ` GROUP BY ra.category`;

    const response = await db.query(query, params);

    res.status(200).json({
      message: 'Morning attendance table fetched successfully',
      data: response.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Morning attendance table');
  }
});
