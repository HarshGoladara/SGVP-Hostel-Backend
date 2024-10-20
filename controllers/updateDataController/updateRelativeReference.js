import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Update Relative Reference
// @route PUT /api/updateData/updateRelativeReference
// @access public
export const updateRelativeReference = asyncHandler(async (req, res) => {
  try {
    const { pin_number } = req.body;
    const { full_name, relation, mobile_number } = req.body;

    let query = 'UPDATE relativeReference SET ';
    const params = [];

    if (full_name) {
      query += 'full_name = ?, ';
      params.push(full_name);
    }
    if (relation) {
      query += 'relation = ?, ';
      params.push(relation);
    }
    if (mobile_number) {
      query += 'mobile_number = ?, ';
      params.push(mobile_number);
    }

    query = query.slice(0, -2);
    query += ' WHERE pin_number = ?';
    params.push(pin_number);

    if (params.length > 1) {
      await db.query(query, params);
    }

    res.status(200).json({
      message: 'Relative reference updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating Relative reference');
  }
});
