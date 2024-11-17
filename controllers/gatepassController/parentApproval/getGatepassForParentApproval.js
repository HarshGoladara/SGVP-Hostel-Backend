import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description get GatePass for parent approval
// @route GET /api/gatepass/getGatepassForParentApproval
// @access public

export const getGatepassForParentApproval = asyncHandler(async (req, res) => {
  try {
    const { gatepass_number, pin_number } = req.query;
    console.log(req.query);

    let query = 'SELECT * FROM "parentApprovalProcessGatepass"';
    const params = [];

    if (gatepass_number) {
      query += ' WHERE gatepass_number = $1';
      params.push(gatepass_number);
    } else if (pin_number) {
      query += ' WHERE pin_number = $1';
      params.push(pin_number);
    }

    console.log(query);

    const result = await db.query(query, params);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching gatepass data');
  }
});
