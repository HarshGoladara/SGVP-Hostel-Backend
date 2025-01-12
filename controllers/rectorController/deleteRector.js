import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description delete room by HOD
// @route DELETE /api/rector/deleteRector
// @access public

export const deleteRector = asyncHandler(async (req, res) => {
  const { rector_id } = req.query;

  try {
    const query = `DELETE FROM "rectorInfo" WHERE rector_id = $1`;
    const params = [rector_id];

    const result = await db.query(query, params);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `No rector found with rector id ${rector_id}.` });
    }

    res.status(200).json({
      message: `rector with rector id ${rector_id} deleted successfully.`,
    });
  } catch (error) {
    console.error('Error deleting rector:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
