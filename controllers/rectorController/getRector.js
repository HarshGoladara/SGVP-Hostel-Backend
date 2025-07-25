import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description ADD rector
// @route GET /api/rector/getRector
// @access public

export const getRector = asyncHandler(async (req, res) => {
  try {
    const { rector_id } = req.query;
    const query = rector_id
      ? `SELECT * FROM "rectorInfo" WHERE rector_id = $1`
      : `SELECT * FROM "rectorInfo" ORDER BY rector_id`;

    const params = rector_id ? [rector_id] : [];

    const results = await db.query(query, params);

    res.status(200).json({
      data: results.rows,
    });
  } catch (error) {
    console.error('Error fetching rector:', error);
    res.status(500).json({ error: 'Failed to fetch rector.' });
  }
});
