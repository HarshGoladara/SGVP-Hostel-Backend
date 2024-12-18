import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description admission confirmation by admin
// @route POST /api/admission/confirmAdmission
// @access public
export const confirmAdmission = asyncHandler(async (req, res) => {
  try {
    const { entry_number } = req.body;

    await db.query('CALL move_temp_to_confirm($1)', [entry_number]);

    res.status(200).send('Student Admission is confirmed');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
