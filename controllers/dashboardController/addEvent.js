import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch total students
// @route POST /api/dashboard/addEvent
// @access public
export const addEvent = asyncHandler(async (req, res) => {
  const { event_date, description } = req.body;
  try {
    const Query = `
            INSERT INTO "eventsList"(event_date, description) VALUES($1, $2) RETURNING event_id
        `;
    const response = await db.query(Query, [event_date, description]);
    const newEventId = response.rows[0].event_id; // Retrieve the returned event_id
    console.log(response);

    res.status(201).json({
      message: 'Event Added successfully',
      event_id: newEventId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding event');
  }
});
