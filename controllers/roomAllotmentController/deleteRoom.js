import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description delete room by HOD
// @route DELETE /api/roomAllotment/deleteRoom
// @access public

export const deleteRoom = asyncHandler(async (req, res) => {
  const { room_number } = req.query;

  try {
    const query = `DELETE FROM "rooms" WHERE room_number = $1`;
    const params = [room_number];

    const result = await db.query(query, params);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `No room found with room number ${room_number}.` });
    }

    res
      .status(200)
      .json({
        message: `Room with room number ${room_number} deleted successfully.`,
      });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
