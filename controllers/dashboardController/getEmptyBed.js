import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch empty beds
// @route GET /api/dashboard/getEmptyBed
// @access public

export const getEmptyBed = asyncHandler(async (req, res) => {
  try {
    // const { room_number, bed_number, category } = req.query;

    let query = `
            SELECT 
            r.category AS category,
            COUNT(*) AS empty_beds_count
            FROM "rooms" r
            LEFT JOIN "roomAllotment" ra
            ON r.room_number = ra.room_number AND r.bed_number = ra.bed_number
            WHERE ra.pin_number IS null
        `;

    query += `
            GROUP BY r.category
            ORDER BY r.category
        `;

    const results = await db.query(query);
    // console.log(results);

    res.status(200).json({
      message: 'Empty beds fetched successfully',
      data: results.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching empty beds');
  }
});
