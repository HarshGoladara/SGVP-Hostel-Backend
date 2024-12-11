import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Add a new user-role mapping
// @route POST /api/credential/addUserRole
// @access public
export const addUserRole = asyncHandler(async (req, res) => {
  try {
    const { mobile_number, role_id } = req.body;

    const query = `
      INSERT INTO "userRole" (mobile_number, role_id)
      VALUES ($1, $2)
    `;

    await db.query(query, [mobile_number, role_id]);

    res.status(201).json({
      message: 'User-role mapping added successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding user-role mapping');
  }
});
