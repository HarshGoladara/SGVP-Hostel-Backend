import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Add new relative
// @route POST /api/admission/addRelativeDetails
// @access public

export const addRelativeDetails = asyncHandler(async (req, res) => {
  try {
    const {
      pin_number,
      relative_name,
      relation,
      relative_contact_number,
      relative_address,
    } = req.body;
    const query = `
            INSERT INTO relative (
                pin_number, relative_name, relation, relative_contact_number, relative_address
            ) 
            VALUES (?, ?, ?, ?, ?)
        `;

    await db.query(query, [
      pin_number,
      relative_name,
      relation,
      relative_contact_number,
      relative_address,
    ]);

    res.status(201).json({
      message: 'Relative details added successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error adding relative details:- ${error.sqlMessage}`);
  }
});
