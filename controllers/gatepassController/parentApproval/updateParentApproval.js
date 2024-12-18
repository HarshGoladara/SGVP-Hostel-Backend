import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Update gatepass by parent
// @route PUT api/gatepass/updateParentApproval
// @access public
export const updateParentApproval = asyncHandler(async (req, res) => {
  try {
    const { gatepass_number, parent_approval_status, remarks } = req.body;

    // Check if required fields are provided
    if (!gatepass_number) {
      return res.status(400).json({ message: 'Gatepass number is required' });
    }

    // Dynamically build the query based on provided fields
    let query = 'UPDATE "approvalGatepass" SET ';
    const params = [];
    let paramIndex = 1;

    if (parent_approval_status) {
      query += `parent_approval_status = $${paramIndex}, `;
      params.push(parent_approval_status);
      paramIndex++;
    }
    if (remarks !== null) {
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
      message: 'Parent Updated Gatepass status successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error Updating Gatepass');
  }
});
