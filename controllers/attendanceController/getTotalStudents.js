import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch total students
// @route GET /api/attendance/getTotalStudents
// @access public
export const getTotalStudents = asyncHandler(async (req, res) => {
  const { category, pin_number, student_full_name } = req.query;
  try {
    let countQuery = `SELECT COUNT(*) AS student_count 
        FROM "studentData" sd 
        LEFT JOIN "roomAllotment" ra ON sd.pin_number = ra.pin_number
        WHERE is_alumni = false`;
    const params = [];
    let paramIndex = 1;
    if (pin_number) {
      countQuery += ` AND sd.pin_number = $${paramIndex}`;
      params.push(pin_number);
      paramIndex++;
    } else if (student_full_name) {
      countQuery += ` AND sd.student_full_name ILIKE $${paramIndex}`;
      params.push(`%${student_full_name}%`);
      paramIndex++;
    } else if (category) {
      countQuery += ` AND ra.category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }
    const countResult = await db.query(countQuery, params);
    const totalStudents = parseInt(countResult.rows[0].student_count);

    res.status(200).json({
      totalStudents: totalStudents,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error counting student count');
  }
});
