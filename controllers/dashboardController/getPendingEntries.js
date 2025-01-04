import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch total students
// @route GET /api/dashboard/getPendingEntries
// @access public
export const getPendingEntries = asyncHandler(async (req, res) => {
  try {
    const Query = `
        SELECT 
        ag.gatepass_number,
        ag.pin_number,
        sd.student_full_name,
        ag.gatepass_created,
        ag.outgoing_timestamp,
        ag.permission_upto_timestamp,
        ag.reason,
        ag.remarks
          FROM "approvalGatepass" ag
        LEFT JOIN
          "studentData" sd ON ag.pin_number = sd.pin_number
        WHERE ag.permission_upto_timestamp::date < CURRENT_DATE
        AND ag.in_timestamp IS null
        AND ag.parent_approval_status = 'approved'
        AND ag.admin_approval_status = 'approved'
        `;
    const Result = await db.query(Query);
    // console.log(Result);
    // const pending_entries = parseInt(Result.rows[0].pending_entries);

    res.status(200).json({
      pending_entries: Result.rows,
      total_pending_entries: Result.rowCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error counting pending entries');
  }
});
