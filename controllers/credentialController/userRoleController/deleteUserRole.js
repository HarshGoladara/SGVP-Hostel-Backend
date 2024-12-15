import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Delete a user-role mapping
// @route DELETE /api/credential/deleteUserRole
// @access public
export const deleteUserRole = asyncHandler(async (req, res) => {
  try {
    const { mobile_number } = req.body;

    if (!mobile_number) {
      return res.status(400).json({ message: 'mobile_number is required' });
    }

    const query = `
      DELETE FROM "userRole"
      WHERE mobile_number = $1
    `;

    await db.query(query, [mobile_number]);

    res.status(200).json({
      message: 'User-role mapping deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting user-role mapping');
  }
});
