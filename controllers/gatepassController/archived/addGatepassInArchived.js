import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Add new GatePass in Archived
// @route POST /api/gatepass/addGatepassInArchived
// @access public

export const addGatepassInArchived = asyncHandler(async (req, res) => {
  try {
    const {
      gatepass_number,
      pin_number,
      gatepass_created,
      outgoing_timestamp,
      permission_upto_timestamp,
      reason,
      parent_approval_status,
      admin_approval_status,
      in_timestamp,
      remarks,
    } = req.body;

    const query = `
      INSERT INTO "archivedGatepass"
      (gatepass_number, pin_number, gatepass_created, outgoing_timestamp, permission_upto_timestamp, reason, parent_approval_status, admin_approval_status, in_timestamp, remarks)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;

    await db.query(query, [
      gatepass_number,
      pin_number,
      gatepass_created,
      outgoing_timestamp,
      permission_upto_timestamp,
      reason,
      parent_approval_status,
      admin_approval_status,
      in_timestamp || null,
      remarks || ' ',
    ]);

    res.status(201).json({
      message: 'Gatepass Added in Archived successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error adding gatepass in Archived');
  }
});
