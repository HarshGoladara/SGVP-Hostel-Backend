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

    let query = 'UPDATE relative SET ';
    const params = [];

    if (relative_name) {
      query += 'relative_name = ?, ';
      params.push(relative_name);
    }
    if (relation) {
      query += 'relation = ?, ';
      params.push(relation);
    }
    if (relative_contact_number) {
      query += 'relative_contact_number = ?, ';
      params.push(relative_contact_number);
    }
    if (relative_address) {
      query += 'relative_address = ?, ';
      params.push(relative_address);
    }

    query = query.slice(0, -2);
    query += ' WHERE pin_number = ?';
    params.push(pin_number);

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
