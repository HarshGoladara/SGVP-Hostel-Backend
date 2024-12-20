import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch total students
// @route DELETE /api/dashboard/deleteEvent
// @access public
export const deleteEvent = asyncHandler(async (req, res) => {
  const { event_id } = req.query;
  try {
    const Query = `
            DELETE FROM "eventsList" WHERE event_id = $1
        `;

    await db.query(Query, [event_id]);

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting event');
  }
});
