import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Add new GatePass for parent approval
// @route POST /api/gatepass/addGatepassForParentApproval
// @access public

export const addGatepassForParentApproval = asyncHandler(async (req, res) => {
  try {
    const {
      pin_number,
      outgoing_timestamp,
      permission_upto_timestamp,
      reason,
    } = req.body;

    if (
      !pin_number ||
      !outgoing_timestamp ||
      !permission_upto_timestamp ||
      !reason
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `
            INSERT INTO parentApprovalProcessGatepass 
            (pin_number, outgoing_timestamp, permission_upto_timestamp, reason) 
            VALUES (?, ?, ?, ?)
        `;

    await db.query(query, [
      pin_number,
      outgoing_timestamp,
      permission_upto_timestamp,
      reason,
    ]);

    res.status(201).json({
      message: 'Gatepass created successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error adding gatepass data');
  }
});
