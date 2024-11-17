import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Add new GatePass for admin approval
// @route POST /api/gatepass/addGatepassForaAdminApproval
// @access public

export const addGatepassForAdminApproval = asyncHandler(async (req, res) => {
  try {
    const {
      gatepass_number,
      pin_number,
      outgoing_timestamp,
      permission_upto_timestamp,
      reason,
      status,
      in_timestamp,
      remarks,
    } = req.body;

    const query = `
            INSERT INTO "adminApprovalProcessGatepass"
            (gatepass_number, pin_number, outgoing_timestamp, permission_upto_timestamp, reason, status, in_timestamp, remarks)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

    db.query(query, [
      gatepass_number,
      pin_number,
      outgoing_timestamp,
      permission_upto_timestamp,
      reason,
      status || 'pending',
      in_timestamp || null,
      remarks || ' ',
    ]);

    res.status(201).json({
      message: 'Gatepass added for Admmin approval successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error adding gatepass data in admin approval');
  }
});
