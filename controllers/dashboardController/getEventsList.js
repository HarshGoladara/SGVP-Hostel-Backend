import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch total students
// @route GET /api/dashboard/getEventsList
// @access public
export const getEventsList = asyncHandler(async (req, res) => {
  try {
    const query = `
        SELECT event_id,event_date::date AS date,description AS title FROM "eventsList"
        `;
    const result = await db.query(query);
    const events_list = result.rows;
    // console.log(events_list);

    res.status(200).json({
      events_list,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting events');
  }
});
