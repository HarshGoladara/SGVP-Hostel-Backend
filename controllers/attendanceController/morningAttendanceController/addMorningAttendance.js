import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Add or Update Morning Attendance
// @route POST /api/attendance/addMorningAttendance
// @access public

export const addMorningAttendance = asyncHandler(async (req, res) => {
  try {
    const { pin_number, date, status } = req.body;

    // Validate the inputs
    if (!pin_number || !date || !status) {
      return res
        .status(400)
        .json({
          error: 'All fields are required: pin_number, date, and status.',
        });
    }

    const query = `
          INSERT INTO "morningAttendance" (pin_number, date, status)
          VALUES ($1, $2, $3)
          ON CONFLICT (pin_number, date)
          DO UPDATE SET status = EXCLUDED.status
          RETURNING attendance_number;
        `;
    const values = [pin_number, date, status];

    const response = await db.query(query, values);

    res.status(201).json({
      message: 'Morning attendance added or updated successfully',
      attendance_number: response.rows[0]?.attendance_number, // Return the attendance_number
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding or updating Morning attendance');
  }
});
