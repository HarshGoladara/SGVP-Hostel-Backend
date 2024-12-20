import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch total students
// @route GET /api/dashboard/getActiveGatepasses
// @access public
export const getActiveGatepasses = asyncHandler(async (req, res) => {
  try {
    const countQuery = `
        SELECT COUNT(*) AS active_gatepasses FROM "approvalGatepass"
        WHERE outgoing_timestamp::date <= CURRENT_DATE
        AND permission_upto_timestamp::date >= CURRENT_DATE
        AND in_timestamp IS null
        AND parent_approval_status = 'approved'
        AND admin_approval_status = 'approved'
        `;
    const countResult = await db.query(countQuery);
    const active_gatepasses = parseInt(countResult.rows[0].active_gatepasses);

    res.status(200).json({
      total_active_gatepasses: active_gatepasses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error counting active gatepasses');
  }
});
