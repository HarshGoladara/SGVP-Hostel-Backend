import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description get GatePass from Archived
// @route get /api/gatepass/getGatepassFromArchived
// @access public

export const getGatepassFromArchived = asyncHandler(async (req, res) => {
  try {
    const { gatepass_number, pin_number } = req.query;

    let query = 'SELECT * FROM archivedGatepass';
    const params = [];

    if (gatepass_number) {
      query += ' WHERE gatepass_number = ?';
      params.push(gatepass_number);
    } else if (pin_number) {
      query += ' WHERE pin_number = ?';
      params.push(pin_number);
    }

    db.query(query, params);

    res.status(201).json({
      message: 'Gatepass fetched from Archived successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching gatepass data');
  }
});
