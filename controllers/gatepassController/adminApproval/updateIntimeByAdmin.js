import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Update gatepass by admin
// @route PUT api/gatepass/updateIntimeByAdmin
// @access public
export const updateIntimeByAdmin = asyncHandler(async (req, res) => {
  try {
    const { gatepass_number, in_timestamp } = req.body;

    // Dynamically build the query based on provided fields
    let query = 'UPDATE "approvalGatepass" SET ';
    const params = [];
    let paramIndex = 1;

    if (in_timestamp) {
      query += `in_timestamp = $${paramIndex}, `;
      params.push(in_timestamp);
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
