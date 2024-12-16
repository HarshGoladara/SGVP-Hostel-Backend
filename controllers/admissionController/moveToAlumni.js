import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

export const moveToAlumni = asyncHandler(async (req, res) => {
  try {
    const { pin_number } = req.body;

    await db.query(
      'UPDATE "studentData" SET is_alumni=true WHERE pin_number=$1',
      [pin_number],
    );
    res
      .status(200)
      .send(
        `Successfully moved data for PIN number ${pin_number} to the alumni table.`,
      );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
