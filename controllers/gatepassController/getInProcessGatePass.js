import asyncHandler from 'express-async-handler';
// import db from '../../../config/dbConnection.js';
import db from '../../config/dbConnection.js';

// @description Get In-Process GatePass
// @route GET /api/gatepass/getInProcessGatePass
// @access Public

export const getInProcessGatePass = asyncHandler(async (req, res) => {
  try {
    const { pin_number, student_full_name } = req.query;

    let query = `
      SELECT 
        ag.*, 
        sd.student_full_name 
      FROM "approvalGatepass" AS ag 
      JOIN "studentData" AS sd 
      ON ag.pin_number = sd.pin_number 
      WHERE ag.parent_approval_status = 'approved'
      AND ag.admin_approval_status = 'approved'
      AND ag.in_timestamp =  null
    `;

    const params = [];
    let paramIndex = 1;

    if (pin_number) {
      query += ` AND ag.pin_number = $${paramIndex}`;
      params.push(pin_number);
      paramIndex++;
    }

    if (student_full_name) {
      query += ` AND sd.student_full_name ILIKE $${paramIndex}`;
      params.push(`%${student_full_name}%`);
      paramIndex++;
    }

    query += ` ORDER BY ag.gatepass_created DESC`;

    const results = await db.query(query, params);

    res.status(200).json({
      message: 'In-process gatepasses fetched successfully',
      data: results.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching in-process gatepasses');
  }
});
