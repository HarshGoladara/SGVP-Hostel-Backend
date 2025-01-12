import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description ADD rector
// @route POST /api/rector/addRector
// @access public

export const addRector = asyncHandler(async (req, res) => {
  const { name, email_id, mobile_number, photo_url } = req.body;

  try {
    const query = `INSERT INTO "rectorInfo" (name, email_id, mobile_number, photo_url) 
         VALUES ($1, $2, $3, $4)`;
    await db.query(query, [name, email_id, mobile_number, photo_url]);

    res.status(201).json('rector added successfully');
  } catch (error) {
    console.error('Error creating rector:', error);
    res.status(500).json({ error: 'Failed to create rector.' });
  }
});
