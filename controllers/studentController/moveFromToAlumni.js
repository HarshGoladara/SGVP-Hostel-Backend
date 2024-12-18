import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description admission confirmation by admin
// @route PUT /api/student/moveFromToAlumni
// @access public
export const moveFromToAlumni = asyncHandler(async (req, res) => {
  try {
    const { pin_number, is_alumni } = req.body;

    await db.query(
      'UPDATE "studentData" SET is_alumni=$1 WHERE pin_number=$2',
      [is_alumni, pin_number],
    );
    res
      .status(200)
      .send(
        `Successfully moved data for PIN number ${pin_number} from/to the alumni table.`,
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
