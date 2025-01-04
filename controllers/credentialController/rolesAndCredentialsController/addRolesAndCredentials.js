import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Add a new role
// @route POST /api/credential/addRolesAndCredentials
// @access public
export const addRolesAndCredentials = asyncHandler(async (req, res) => {
  try {
    const {
      gatepass_approval_credential,
      gatepass_creation_credential,
      attendace_marking_credential,
      room_allotment_credential,
      admission_credential,
      role_name,
    } = req.body;

    const query = `
        INSERT INTO "rolesAndCredentials"
        (gatepass_approval_credential, gatepass_creation_credential, attendace_marking_credential, room_allotment_credential, admission_credential, role_name)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;

    const params = [
      gatepass_approval_credential,
      gatepass_creation_credential,
      attendace_marking_credential,
      room_allotment_credential,
      admission_credential,
      role_name,
    ];

    await db.query(query, params);
    res.status(201).json({
      message: 'Roles and Credentials added successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding new role');
  }
});
