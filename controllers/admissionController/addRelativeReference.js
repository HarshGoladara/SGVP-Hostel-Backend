import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Add relative reference details
// @route POST /api/admission/addRelativeReference
// @access public

export const addRelativeReference = asyncHandler(async (req, res) => {
  try {
    const { pin_number, full_name, relation, mobile_number } = req.body;

    const query = `
            INSERT INTO "relativeReference" (
                pin_number, full_name, relation, mobile_number
            ) 
            VALUES ($1, $2, $3, $4)
        `;

    await db.query(query, [pin_number, full_name, relation, mobile_number]);

    res.status(201).json({
      message: 'Relative reference added successfully',
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(`Error adding relative reference:- ${error.sqlMessage}`);
  }
});
