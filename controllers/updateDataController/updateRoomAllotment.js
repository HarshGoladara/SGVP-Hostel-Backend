import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Update Room Allotment
// @route PUT /api/updateData/updateRoomAllotment
// @access public
export const updateRoomAllotment = asyncHandler(async (req, res) => {
  try {
    const { pin_number } = req.body;
    const { room_number, bed_number } = req.body;

    let query = 'UPDATE roomAllotment SET ';
    const params = [];

    if (room_number) {
      query += 'room_number = ?, ';
      params.push(room_number);
    }
    if (bed_number) {
      query += 'bed_number = ?, ';
      params.push(bed_number);
    }

    query = query.slice(0, -2);
    query += ' WHERE pin_number = ?';
    params.push(pin_number);

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
