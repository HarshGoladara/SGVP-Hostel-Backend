import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description assign room my HOD
// @route POST /api/admission/assignRoom
// @access public

export const assignRoom = asyncHandler(async (req, res) => {
  try {
    const { pin_number, room_number, bed_number, category } = req.body;

    const query = `
            INSERT INTO "roomAllotment" (
                pin_number, room_number, bed_number, category
            ) 
            VALUES ($1, $2, $3, $4)
        `;

    await db.query(query, [pin_number, room_number, bed_number, category]);

    res.status(201).json({
      message: 'Room Assigned successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error assigning room');
  }
});
