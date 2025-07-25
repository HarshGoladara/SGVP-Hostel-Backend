import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Get Evening Attendance table
// @route GET /api/attendance/getEveningAttendanceTable
// @access public

export const getEveningAttendanceTable = asyncHandler(async (req, res) => {
  try {
    const date = new Date().toLocaleDateString().split('/').reverse().join('-');

    // Build the base query
    let query = `
      SELECT
        ra.category,
        COUNT(*) AS total,
        COUNT(CASE WHEN ea.status = 'present' THEN 1 END) AS present,
        COUNT(CASE WHEN ea.status = 'absent' THEN 1 END) AS absent,
        COUNT(CASE WHEN ea.status = 'leave' THEN 1 END) AS leave,
        COUNT(CASE WHEN ea.status = 'sick' THEN 1 END) AS sick,
        COUNT(CASE WHEN ea.status = 'exam' THEN 1 END) AS exam,
        COUNT(CASE WHEN ea.status = 'college' THEN 1 END) AS college,
        COUNT(CASE WHEN ea.status = 'job' THEN 1 END) AS job
      FROM
        "roomAllotment" ra
        LEFT JOIN "eveningAttendance" ea ON ra.pin_number = ea.pin_number
    `;
    let paramIndex = 1;
    const params = [];

    query += ` WHERE ea.date = $${paramIndex}`;
    params.push(date);
    paramIndex++;

    query += ` GROUP BY ra.category`;

    const response = await db.query(query, params);

    res.status(200).json({
      message: 'Evening attendance table fetched successfully',
      data: response.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Evening attendance table');
  }
});
