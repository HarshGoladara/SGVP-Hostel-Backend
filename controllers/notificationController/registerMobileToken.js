import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description add token on login
// @route PUT /api/notifications/registerMobileToken
// @access public
export const registerMobileToken = asyncHandler(async (req, res) => {
  try {
    const { mobile_number, token_number } = req.body;
    console.log(mobile_number);
    console.log(token_number);
    if (!mobile_number || !token_number) {
      res.send(400).send({
        message: "Token or Mobile can't be empty",
      });
    }

    const query = `UPDATE "userRole" 
                            SET token_number=$1
                            WHERE mobile_number=$2`;

    await db.query(query, [token_number, mobile_number]);

    res.status(200).send({
      message: 'Token added successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
