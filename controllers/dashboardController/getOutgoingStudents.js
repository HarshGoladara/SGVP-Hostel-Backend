import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch total students
// @route GET /api/dashboard/getOutgoingStudents
// @access public
export const getOutgoingStudents = asyncHandler(async (req, res) => {
  try {
    const countQuery = `
        SELECT COUNT(*) AS outgoing_students FROM "approvalGatepass"
        WHERE outgoing_timestamp::date = CURRENT_DATE
        AND in_timestamp IS null
        AND parent_approval_status = 'approved'
        AND admin_approval_status = 'approved'
        `;
    const countResult = await db.query(countQuery);
    const outgoing_students = parseInt(countResult.rows[0].outgoing_students);

    res.status(200).json({
      total_outgoing_students: outgoing_students,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error counting outgoing students');
  }
});
