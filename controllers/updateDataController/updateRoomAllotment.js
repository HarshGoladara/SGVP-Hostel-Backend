import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Update Room Allotment
// @route PUT /api/updateData/updateRoomAllotment
// @access public
export const updateRoomAllotment = asyncHandler(async (req, res) => {
  try {
    const { pin_number } = req.body;
    const { room_number, bed_number, category } = req.body;

    let query = 'UPDATE "roomAllotment" SET ';
    const params = [];
    let paramIndex = 1;

    if (room_number) {
      query += `room_number = $${paramIndex}, `;
      params.push(room_number);
      paramIndex++;
    }
    if (bed_number) {
      query += `bed_number = $${paramIndex}, `;
      params.push(bed_number);
      paramIndex++;
    }
    if (category) {
      query += `category = $${paramIndex}, `;
      params.push(category);
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
      message: 'Room Allotment updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating Room Allotment');
  }
});
