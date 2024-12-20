import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch total students
// @route GET /api/dashboard/getPendingAdmission
// @access public
export const getPendingAdmission = asyncHandler(async (req, res) => {
  try {
    const countQuery = `SELECT COUNT(*) AS pending_admission FROM "tempStudentDetails" WHERE admission_status = 'pending'`;
    const countResult = await db.query(countQuery);
    const pending_admission = parseInt(countResult.rows[0].pending_admission);

    res.status(200).json({
      total_pending_admission_request: pending_admission,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error counting pending admissions');
  }
});
