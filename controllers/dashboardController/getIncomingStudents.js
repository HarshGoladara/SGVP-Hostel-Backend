import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch total students
// @route GET /api/dashboard/getIncomingStudents
// @access public
export const getIncomingStudents = asyncHandler(async (req, res) => {
  try {
    const countQuery = `
        SELECT COUNT(*) AS incoming_students FROM "approvalGatepass" 
        WHERE permission_upto_timestamp::date = CURRENT_DATE
        AND in_timestamp IS null
        AND parent_approval_status = 'approved'
        AND admin_approval_status = 'approved'
        `;
    const countResult = await db.query(countQuery);
    const incoming_students = parseInt(countResult.rows[0].incoming_students);

    res.status(200).json({
      total_incoming_students: incoming_students,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error counting incoming students');
  }
});
