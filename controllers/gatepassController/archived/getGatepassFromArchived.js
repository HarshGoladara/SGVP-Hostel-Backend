import asyncHandler from 'express-async-handler';
import db from '../../../config/dbConnection.js';

// @description get GatePass from Archived
// @route get /api/gatepass/getGatepassFromArchived
// @access public

export const getGatepassFromArchived = asyncHandler(async (req, res) => {
  try {
    const { page, limit, query_number, startDate, endDate, student_full_name } =
      req.query;

    // Pagination variables
    const currentPage = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;
    const offset = (currentPage - 1) * pageLimit;

    let query = `
      SELECT 
        ag.*, 
        sd.student_full_name 
      FROM "archivedGatepass" AS ag 
      JOIN "studentData" AS sd 
      ON ag.pin_number = sd.pin_number 
      WHERE 1 = 1
    `;
    const params = [];
    let paramIndex = 1;

    // query += `WHERE parent_approval_status = 'approved' AND admin_approval_status = 'pending'`;

    if (query_number) {
      query += ` AND (ag.gatepass_number = $${paramIndex} OR ag.pin_number = $${paramIndex})`;
      params.push(query_number);
      paramIndex++;
    }

    if (startDate && endDate && startDate <= endDate) {
      query += ` AND ag.outgoing_timestamp >= $${paramIndex}`;
      params.push(startDate);
      paramIndex++;
      query += ` AND ag.permission_upto_timestamp <= $${paramIndex}`;
      params.push(endDate);
      paramIndex++;
    }

    if (student_full_name) {
      query += ` AND sd.student_full_name ILIKE $${paramIndex}`;
      params.push(`%${student_full_name}%`);
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

    // Get the total count of alumni for pagination metadata
    const countQuery = `SELECT COUNT(*) FROM "archivedGatepass"`;
    const countResult = await db.query(countQuery);
    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    // res.status(201).json({
    //   message: 'Gatepass fetched from Admin successfully',
    //   data: results.rows, // Return the fetched data
    // });
    res.status(200).json({
      message: 'Gatepass fetched from Admin successfully',
      data: results.rows,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching gatepass data');
  }
});
