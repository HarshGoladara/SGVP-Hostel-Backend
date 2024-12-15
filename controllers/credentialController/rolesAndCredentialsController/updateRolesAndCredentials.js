import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Update an existing role
// @route PUT /api/credential/updateRolesAndCredentials
// @access public
export const updateRolesAndCredentials = asyncHandler(async (req, res) => {
  try {
    const {
      role_id,
      gatepass_approval_credential,
      gatepass_creation_credential,
      attendace_marking_credential,
      room_allotment_credential,
      admission_credential,
      role_name,
    } = req.body;

    if (!role_id) {
      return res.status(400).json({ message: 'role_id is required' });
    }

    let query = 'UPDATE "rolesAndCredentials" SET ';
    const params = [];
    let paramIndex = 1;

    // Dynamically add fields to update if they are provided in the request body
    if (gatepass_approval_credential) {
      query += `gatepass_approval_credential = $${paramIndex}, `;
      params.push(gatepass_approval_credential);
      paramIndex++;
    }
    if (gatepass_creation_credential) {
      query += `gatepass_creation_credential = $${paramIndex}, `;
      params.push(gatepass_creation_credential);
      paramIndex++;
    }
    if (attendace_marking_credential) {
      query += `attendace_marking_credential = $${paramIndex}, `;
      params.push(attendace_marking_credential);
      paramIndex++;
    }
    if (room_allotment_credential) {
      query += `room_allotment_credential = $${paramIndex}, `;
      params.push(room_allotment_credential);
      paramIndex++;
    }
    if (admission_credential) {
      query += `admission_credential = $${paramIndex}, `;
      params.push(admission_credential);
      paramIndex++;
    }
    if (role_name) {
      query += `role_name = $${paramIndex}, `;
      params.push(role_name);
      paramIndex++;
    }

    // Remove the trailing comma and space
    query = query.slice(0, -2);

    // Add the WHERE clause
    query += ` WHERE role_id = $${paramIndex}`;
    params.push(role_id);

    await db.query(query, params);

    res.status(200).json({
      message: 'Roles and Credentials updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating roles and credentails');
  }
});
