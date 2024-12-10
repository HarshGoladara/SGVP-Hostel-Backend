import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Delete student from temporary table
// @route DELETE api/admission/deleteStudentFromTemp
// @access public

export const deleteStudentFromTemp = asyncHandler(async (req, res) => {
  try {
    const { entry_number } = req.body;
    const query = 'DELETE FROM "tempStudentDetails" WHERE entry_number = $1';
    db.query(query, [entry_number]);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting student from temp table');
  }
});
