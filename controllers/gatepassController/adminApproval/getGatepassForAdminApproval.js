import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description get GatePass for admin approval
// @route get /api/gatepass/getGatepassForAdminApproval
// @access public

export const getGatepassForAdminApproval = asyncHandler(async (req, res) => {
  try {
    const {
      page,
      limit,
      query_number,
      parent_approval_status,
      admin_approval_status,
    } = req.query;

    // Pagination variables
    const currentPage = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;
    const offset = (currentPage - 1) * pageLimit;

    let query = `
      SELECT 
        ag.*, 
        sd.student_full_name 
      FROM "approvalGatepass" AS ag 
      JOIN "studentData" AS sd 
      ON ag.pin_number = sd.pin_number 
    `;
    const params = [];
    let paramIndex = 1;

    query += ` WHERE ag.in_timestamp IS NULL`;

    if (parent_approval_status) {
      query += ` AND ag.parent_approval_status = $${paramIndex}`;
      params.push(parent_approval_status);
      paramIndex++;
    }
    if (admin_approval_status) {
      query += ` AND ag.admin_approval_status = $${paramIndex}`;
      params.push(admin_approval_status);
      paramIndex++;
    }

    // query += `WHERE parent_approval_status = 'approved' AND admin_approval_status = 'pending'`;

    if (query_number) {
      query += ` AND (ag.gatepass_number = $${paramIndex} OR ag.pin_number = $${paramIndex})`;
      params.push(query_number);
      paramIndex++;
    }

    query += ` ORDER BY ag.gatepass_number DESC`;

    // Pagination logic
    query += ` LIMIT $${paramIndex}`;
    params.push(pageLimit);
    paramIndex++;

    query += ` OFFSET $${paramIndex}`;
    params.push(offset);
    paramIndex++;

    const results = await db.query(query, params);
    // console.log(results);

    res.status(200).json({
      message: 'Gatepass fetched from Admin successfully',
      data: results.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching gatepass data');
  }
});
