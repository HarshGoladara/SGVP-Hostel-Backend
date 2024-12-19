import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description admission confirmation by admin
// @route POST /api/admission/confirmAdmission
// @access public
export const confirmAdmission = asyncHandler(async (req, res) => {
  try {
    const { entry_number, pin_number } = req.body;

    const { rows } = await db.query(
      'SELECT move_temp_to_confirm($1::integer,$2::integer) AS returned_pin_number',
      [entry_number, pin_number],
    );
    const returned_pin_number = rows[0].returned_pin_number;
    // console.log(returned_pin_number);

    res.status(200).send({
      message: 'Student Admission is confirmed',
      pin_number: returned_pin_number,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
