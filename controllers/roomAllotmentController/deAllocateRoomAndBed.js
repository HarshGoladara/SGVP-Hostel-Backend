import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description delete room by HOD
// @route DELETE /api/roomAllotment/deAllocateRoomAndBed
// @access public

export const deAllocateRoomAndBed = asyncHandler(async (req, res) => {
  const { bed_number } = req.query;

  try {
    const query = `DELETE FROM "roomAllotment" WHERE bed_number = $1`;
    const params = [bed_number];

    const result = await db.query(query, params);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `No Bed found with bed number ${bed_number}.` });
    }

    res
      .status(200)
      .json({
        message: `Bed with bed number ${bed_number} de-allocatted successfully.`,
      });
  } catch (error) {
    console.error('Error de-allocatting Bed:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
