import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Get user-role mapping(s)
// @route GET /api/credential/getUserRole
// @access public
export const getUserRole = asyncHandler(async (req, res) => {
  try {
    const { mobile_number, role_id } = req.body;

    let query = 'SELECT * FROM "userRole"';
    const params = [];

    if (mobile_number) {
      query += ' WHERE mobile_number = $1';
      params.push(mobile_number);
    } else if (role_id) {
      query += ' WHERE role_id = $1';
      params.push(role_id);
    }

    await db.query(query, params);

    res.status(200).json({
      message: 'User-role mapping(s) fetched successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user-role mapping(s)');
  }
});
