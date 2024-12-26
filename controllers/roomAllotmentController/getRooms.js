import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch rooms by HOD
// @route GET /api/roomAllotment/getRooms
// @access public

export const getRooms = asyncHandler(async (req, res) => {
  try {
    const { room_number, bed_number, category } = req.query;

    let query = `
            SELECT 
            r.category,
            r.room_number,
            r.bed_number,
            ra.pin_number,
            sd.student_full_name
            FROM "rooms" r
            LEFT JOIN "roomAllotment" ra
            ON r.room_number = ra.room_number AND r.bed_number = ra.bed_number
            LEFT JOIN "studentData" sd
            ON ra.pin_number = sd.pin_number
            WHERE 1 = 1
        `;
    let paramIndex = 1;
    const params = [];

    if (room_number) {
      query += ` AND r.room_number = $${paramIndex}`;
      params.push(room_number);
      paramIndex++;
    }
    if (bed_number) {
      query += ` AND r.bed_number = $${paramIndex}`;
      params.push(bed_number);
      paramIndex++;
    }
    if (category) {
      query += ` AND r.category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    query += ` ORDER BY r.room_number, r.bed_number`;

    const results = await db.query(query, params);

    res.status(200).json({
      message: 'Rooms  fetched successfully',
      data: results.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching rooms');
  }
});
