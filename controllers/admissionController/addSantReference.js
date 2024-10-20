import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Add new SantReference
// @route POST /api/admission/addSantReference
// @access public

export const addSantReference = asyncHandler(async (req, res) => {
  try {
    const { pin_number, name_of_sant, sant_phone_number } = req.body;
    const query = `
            INSERT INTO santReference (
                pin_number, name_of_sant, sant_phone_number
            ) 
            VALUES (?, ?, ?)
        `;

    await db.query(query, [pin_number, name_of_sant, sant_phone_number]);

    res.status(201).json({
      message: 'Sant reference added successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error adding sant reference:- ${error.sqlMessage}`);
  }
});
