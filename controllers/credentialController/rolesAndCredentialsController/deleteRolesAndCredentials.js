import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Delete a role
// @route DELETE /api/credential/deleteRolesAndCredentials
// @access public
export const deleteRolesAndCredentials = asyncHandler(async (req, res) => {
  try {
    const { role_id } = req.body;

    const query = 'DELETE FROM "rolesAndCredentials" WHERE role_id = $1';
    await db.query(query, [role_id]);

    res.status(200).json({
      message: 'Role deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting role');
  }
});
