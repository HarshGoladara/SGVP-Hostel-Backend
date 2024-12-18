import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description add new rector
// @route POST /api/admission/addRector
// @access public
export const addRector = asyncHandler(async (req, res) => {
  try {
    const { name, email_id, mobile_number, photo_url } = req.body;

    const query = `INSERT INTO "rectorInfo"("name","email_id","mobile_number","photo_url") VALUES($1,$2,$3,$4);`;

    await db.query(query, [name, email_id, mobile_number, photo_url]);
    res.status(200).send({
      message: 'Admin created sucessfully',
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
