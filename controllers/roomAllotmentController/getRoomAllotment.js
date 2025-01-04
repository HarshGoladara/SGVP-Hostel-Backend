import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description assign room my HOD
// @route POST /api/roomAllotment/getRoomAllotment
// @access public

export const getRoomAllotment = asyncHandler(async (req, res) => {
  try {
    // const { pin_number, room_number, bed_number, category } = req.body;

    const query = `
            SELECT 
            ra.pin_number,
            sd.student_full_name,
            ra.room_number,
            ra.bed_number,
            ra.category
            FROM "roomAllotment" ra
            LEFT JOIN
            "studentData" sd ON ra.pin_number = sd.pin_number
        `;

    const results = await db.query(query);

    res.status(200).json({
      message: 'Room Data fetched successfully',
      data: results.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching room allotment');
  }
});
