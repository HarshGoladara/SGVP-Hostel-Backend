import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Update a user-role mapping
// @route PUT /api/credential/updateUserRole
// @access public
export const updateUserRole = asyncHandler(async (req, res) => {
  try {
    const { mobile_number, role_id } = req.body;

    if (!mobile_number || !role_id) {
      return res
        .status(400)
        .json({ message: 'Both mobile_number and role_id are required' });
    }

    const query = `
      UPDATE "userRole"
      SET role_id = $1
      WHERE mobile_number = $2
    `;

    await db.query(query, [role_id, mobile_number]);

    res.status(200).json({
      message: 'User-role mapping updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user-role mapping');
  }
});
