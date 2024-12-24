import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Get all roles and credentials
// @route GET /api/credential/getRolesAndCredentials
// @access public

export const getRolesAndCredentials = asyncHandler(async (req, res) => {
  try {
    const { role_id, role_name } = req.body; // Extracting role_id and role_name from the request body
    let query = 'SELECT * FROM "rolesAndCredentials"';
    const params = [];

    // Dynamically build the WHERE clause based on input
    if (role_id) {
      query += ' WHERE role_id = $1';
      params.push(role_id);
    } else if (role_name) {
      query += ' WHERE role_name = $1';
      params.push(role_name);
    }

    const result = await db.query(query, params);

    res.status(200).json({
      message: 'Roles and Credentials fetched successfully',
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching roles and credentials');
  }
});
