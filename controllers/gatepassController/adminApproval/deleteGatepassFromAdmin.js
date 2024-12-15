import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description Delete gatepass
// @route DELETE api/gatepass/deleteGatepassFromAdmin
// @access public

export const deleteGatepassFromAdmin = asyncHandler(async (req, res) => {
  try {
    const { gatepass_number } = req.body;
    const query = 'DELETE FROM "approvalGatepass" WHERE gatepass_number = $1';
    db.query(query, [gatepass_number]);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting Gatepass from admin');
  }
});
