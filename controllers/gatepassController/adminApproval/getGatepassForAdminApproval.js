import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description get GatePass for admin approval
// @route get /api/gatepass/getGatepassForAdminApproval
// @access public

export const getGatepassForAdminApproval = asyncHandler(async (req, res) => {
  try {
    const { gatepass_number, pin_number } = req.query;

    let query = 'SELECT * FROM "approvalGatepass"';
    const params = [];

    if (gatepass_number) {
      query += ' WHERE gatepass_number = $1';
      params.push(gatepass_number);
    } else if (pin_number) {
      query += ' WHERE pin_number = $1';
      params.push(pin_number);
    }

    const result = await db.query(query, params);

    res.status(201).json({
      message: 'Gatepass fetched from Admin successfully',
      data: result.rows, // Return the fetched data
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching gatepass data');
  }
});
