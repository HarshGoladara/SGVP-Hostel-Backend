import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch total students
// @route GET /api/dashboard/getPendingEntries
// @access public
export const getPendingEntries = asyncHandler(async (req, res) => {
  try {
    const countQuery = `
        SELECT COUNT(*) AS pending_entries FROM "approvalGatepass"
        WHERE permission_upto_timestamp::date < CURRENT_DATE
        AND in_timestamp IS null
        AND parent_approval_status = 'approved'
        AND admin_approval_status = 'approved'
        `;
    const countResult = await db.query(countQuery);
    const pending_entries = parseInt(countResult.rows[0].pending_entries);

    res.status(200).json({
      total_pending_entries: pending_entries,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error counting pending entries');
  }
});
