import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description ADD rector
// @route GET /api/rector/getRector
// @access public

export const getRector = asyncHandler(async (req, res) => {
  try {
    const query = `SELECT * FROM "rectorInfo" ORDER BY rector_id`;
    const results = await db.query(query);

    res.status(200).json({
      data: results.rows,
    });
  } catch (error) {
    console.error('Error fetching rector:', error);
    res.status(500).json({ error: 'Failed to fetch rector.' });
  }
});
