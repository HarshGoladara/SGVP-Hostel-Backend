import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description admission confirmation by admin
// @route PUT /api/admission/cancelAdmission
// @access public
export const cancelAdmission = asyncHandler(async (req, res) => {
  try {
    const { entry_number } = req.body;

    await db.query('CALL cancel_admission($1)', [entry_number]);

    res.status(200).send('Student Admission is Cancelled');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
