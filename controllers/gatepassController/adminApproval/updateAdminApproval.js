import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Update gatepass by admin
// @route PUT api/gatepass/updateAdminApproval
// @access public
export const updateAdminApproval = asyncHandler(async (req, res) => {
  try {
    const { gatepass_number, admin_approval_status, remarks } = req.body;

    // Dynamically build the query based on provided fields
    let query = 'UPDATE "approvalGatepass" SET ';
    const params = [];
    let paramIndex = 1;

    if (admin_approval_status) {
      query += `admin_approval_status = $${paramIndex}, `;
      params.push(admin_approval_status);
      paramIndex++;
    }
    if (remarks) {
      query += `remarks = $${paramIndex}, `;
      params.push(remarks);
      paramIndex++;
    }

    // Remove the last comma and space from query
    query = query.slice(0, -2);
    query += ` WHERE gatepass_number = $${paramIndex}`;
    params.push(gatepass_number);

    if (params.length > 1) {
      await db.query(query, params);
    }
    res.status(200).json({
      message: 'Admin Updated Gatepass status successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error Updating Gatepass');
  }
});
