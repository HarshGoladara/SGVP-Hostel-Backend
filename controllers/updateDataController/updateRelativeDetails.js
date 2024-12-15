import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Update Relative Details
// @route PUT /api/updateData/updateRelativeDetails
// @access public
export const updateRelativeDetails = asyncHandler(async (req, res) => {
  try {
    const { pin_number } = req.body;
    const {
      relative_name,
      relation,
      relative_contact_number,
      relative_address,
    } = req.body;

    let query = 'UPDATE "relative" SET ';
    const params = [];
    let paramIndex = 1;

    if (relative_name) {
      query += `relative_name = $${paramIndex}, `;
      params.push(relative_name);
      paramIndex++;
    }
    if (relation) {
      query += `relation = $${paramIndex}, `;
      params.push(relation);
      paramIndex++;
    }
    if (relative_contact_number) {
      query += `relative_contact_number = $${paramIndex}, `;
      params.push(relative_contact_number);
      paramIndex++;
    }
    if (relative_address) {
      query += `relative_address = $${paramIndex}, `;
      params.push(relative_address);
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
      message: 'Relative details updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating relative details');
  }
});
