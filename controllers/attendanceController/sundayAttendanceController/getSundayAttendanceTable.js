import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Get Sunday Attendance table
// @route GET /api/attendance/getSundayAttendanceTable
// @access public

export const getSundayAttendanceTable = asyncHandler(async (req, res) => {
  try {
    const date = new Date().toLocaleDateString().split('/').reverse().join('-');

    // Build the base query
    let query = `
      SELECT
        ra.category,
        COUNT(*) AS total,
        COUNT(CASE WHEN sa.status = 'present' THEN 1 END) AS present,
        COUNT(CASE WHEN sa.status = 'absent' THEN 1 END) AS absent,
        COUNT(CASE WHEN sa.status = 'leave' THEN 1 END) AS leave,
        COUNT(CASE WHEN sa.status = 'sick' THEN 1 END) AS sick,
        COUNT(CASE WHEN sa.status = 'exam' THEN 1 END) AS exam,
        COUNT(CASE WHEN sa.status = 'college' THEN 1 END) AS college,
        COUNT(CASE WHEN sa.status = 'job' THEN 1 END) AS job
      FROM
        "roomAllotment" ra
        LEFT JOIN "sundayAttendance" sa ON ra.pin_number = sa.pin_number
    `;
    let paramIndex = 1;
    const params = [];

    query += ` WHERE sa.date = $${paramIndex}`;
    params.push(date);
    paramIndex++;

    query += ` GROUP BY ra.category`;

    const response = await db.query(query, params);

    res.status(200).json({
      message: 'Sunday attendance table fetched successfully',
      data: response.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Sunday attendance table');
  }
});
