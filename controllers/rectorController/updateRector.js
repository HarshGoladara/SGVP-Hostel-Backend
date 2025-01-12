import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description ADD rector
// @route PUT /api/rector/updateRector
// @access public

export const updateRector = asyncHandler(async (req, res) => {
  const { name, email_id, mobile_number, photo_url, role_id, rector_id } =
    req.body;

  try {
    let query = 'UPDATE "rectorInfo" SET ';
    const params = [];
    let paramIndex = 1;

    if (name) {
      query += `name = $${paramIndex}, `;
      params.push(name);
      paramIndex++;
    }
    if (email_id) {
      query += `email_id = $${paramIndex}, `;
      params.push(email_id);
      paramIndex++;
    }
    if (mobile_number) {
      query += `mobile_number = $${paramIndex}, `;
      params.push(mobile_number);
      paramIndex++;
    }
    if (photo_url) {
      query += `photo_url = $${paramIndex}, `;
      params.push(photo_url);
      paramIndex++;
    }
    if (role_id) {
      query += `role_id = $${paramIndex}, `;
      params.push(role_id);
      paramIndex++;
    }

    query = query.slice(0, -2);
    query += ` WHERE rector_id = $${paramIndex}`;
    params.push(rector_id);

    if (params.length > 1) {
      await db.query(query, params);
    }

    res.status(200).json({
      message: 'Rector data updated successfully',
    });
  } catch (error) {
    console.error('Error updating rector:', error);
    res.status(500).json({ error: 'Failed to update rector.' });
  }
});
