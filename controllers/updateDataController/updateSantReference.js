import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Update Sant Reference
// @route PUT /api/updateData/updateSantReference
// @access public
export const updateSantReference = asyncHandler(async (req, res) => {
  try {
    const { pin_number } = req.body;
    const { name_of_sant, sant_phone_number } = req.body;

    let query = 'UPDATE "santReference" SET ';
    const params = [];
    let paramIndex = 1;

    if (name_of_sant) {
      query += `name_of_sant = $${paramIndex}, `;
      params.push(name_of_sant);
      paramIndex++;
    }
    if (sant_phone_number) {
      query += `sant_phone_number = $${paramIndex}, `;
      params.push(sant_phone_number);
      paramIndex++;
    }

    // Remove the trailing comma and space, then add the WHERE clause
    query = query.slice(0, -2);
    query += ` WHERE pin_number = $${paramIndex}`;
    params.push(pin_number);

    // Execute query only if there are fields to update
    if (params.length > 1) {
      await db.query(query, params);
    }

    res.status(200).json({
      message: 'Sant reference updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating Sant reference');
  }
});
