import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Update gatepass by parent
// @route PUT api/gatepass/updateParentApproval
// @access public
export const updateStatusToParentApprove = asyncHandler(async (req, res) => {
  try {
    const { pin_number, remarks } = req.body;

    if (!pin_number) {
      return res.status(400).json({ error: 'Gatepass number is required' });
    }

    // Build the query
    let query = 'UPDATE "parentApprovalProcessGatepass" SET status = $1';
    const params = ['approved']; // Set status to 'approved'

    // Add remarks if provided
    if (remarks) {
      query += ', remarks = $2';
      params.push(remarks);
    }

    query += ' WHERE pin_number = $' + (params.length + 1);
    params.push(pin_number);

    await db.query(query, params);

    res.status(200).json({
      message: 'Gatepass updated successfully with approval',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating gatepass');
  }
});
