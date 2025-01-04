import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description ADD Bed by HOD
// @route POST /api/roomAllotment/addBed
// @access public

export const addBed = asyncHandler(async (req, res) => {
  try {
    const { room_number, bed_number, category } = req.body;

    const query = `
            INSERT INTO "rooms" (category, room_number, bed_number) VALUES ($1, $2, $3)
        `;

    await db.query(query, [category, room_number, bed_number]);

    res.status(201).json({
      message: 'Bed Added successfully',
      // data: results.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error Adding Bed');
  }
});
