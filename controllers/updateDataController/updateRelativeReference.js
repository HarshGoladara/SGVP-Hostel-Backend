import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Update Relative Reference
// @route PUT /api/updateData/updateRelativeReference
// @access public
export const updateRelativeReference = asyncHandler(async (req, res) => {
  try {
    const { pin_number } = req.body;
    const { full_name, relation, mobile_number } = req.body;

    let query = 'UPDATE "relativeReference" SET ';
    const params = [];
    let paramIndex = 1;

    if (full_name) {
      query += `full_name = $${paramIndex}, `;
      params.push(full_name);
      paramIndex++;
    }
    if (relation) {
      query += `relation = $${paramIndex}, `;
      params.push(relation);
      paramIndex++;
    }
    if (mobile_number) {
      query += `mobile_number = $${paramIndex}, `;
      params.push(mobile_number);
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
      message: 'Relative reference updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating relative reference');
  }
});
