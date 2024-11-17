import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Update gatepass by admin
// @route PUT api/gatepass/updateAdminApproval
// @access public
export const updateAdminApproval = asyncHandler(async (req, res) => {
  try {
    const { gatepass_number, status, remarks } = req.body;

    // Dynamically build the query based on provided fields
    let query = 'UPDATE "adminApprovalProcessGatepass" SET ';
    const params = [];

    if (status) {
      query += 'status = ?, ';
      params.push(status);
    }
    if (remarks) {
      query += 'remarks = ?, ';
      params.push(remarks);
    }

    // Remove the last comma and space from query
    query = query.slice(0, -2);
    query += ' WHERE gatepass_number = ?';
    params.push(gatepass_number);

    if (params.length > 1) {
      await db.query(query, params);
    }
    res.status(200).json({
      message: 'admin Updated Gatepass successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error Updating Gatepass');
  }
});
