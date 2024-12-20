import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch total students
// @route GET /api/dashboard/getTotalStudents
// @access public
export const getTotalStudents = asyncHandler(async (req, res) => {
  try {
    const countQuery = `SELECT COUNT(*) AS student_count FROM "studentData" WHERE is_alumni = false`;
    const countResult = await db.query(countQuery);
    const totalStudents = parseInt(countResult.rows[0].student_count);

    res.status(200).json({
      totalStudents: totalStudents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error counting student count');
  }
});
