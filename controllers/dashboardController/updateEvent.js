import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch total students
// @route PUT /api/dashboard/updateEvent
// @access public
export const updateEvent = asyncHandler(async (req, res) => {
  const { event_id, description } = req.body;
  try {
    const Query = `
            UPDATE "eventsList" SET description = $1 WHERE event_id = $2
        `;

    await db.query(Query, [description, event_id]);

    res.status(200).json({
      message: 'Event Updated successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating event');
  }
});
