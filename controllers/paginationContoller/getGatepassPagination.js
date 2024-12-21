import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description pagination for student tab
// @route GET /api/pagination/getGatepassPagination
// @access public
export const getGatepassPagination = asyncHandler(async (req, res) => {
  const { limit, query_number, parent_approval_status, admin_approval_status } =
    req.query;

  try {
    const pageLimit = parseInt(limit) || 10;
    // Get the total count of students for pagination metadata
    let countQuery = `SELECT COUNT(*) 
            FROM "approvalGatepass" AS ag WHERE ag.in_timestamp IS NULL
        `;
    const countQueryParams = [];
    let countParamIndex = 1;
    if (parent_approval_status) {
      countQuery += ` AND ag.parent_approval_status = $${countParamIndex}`;
      countQueryParams.push(parent_approval_status);
      countParamIndex++;
    }
    if (admin_approval_status) {
      countQuery += ` AND ag.admin_approval_status = $${countParamIndex}`;
      countQueryParams.push(admin_approval_status);
      countParamIndex++;
    }
    if (query_number) {
      countQuery += ` AND (ag.gatepass_number = $${countParamIndex} OR ag.pin_number = $${countParamIndex})`;
      countQueryParams.push(query_number);
      countParamIndex++;
    }
    const countResult = await db.query(countQuery, countQueryParams);
    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / pageLimit);

    res.status(200).json({
      pagination: {
        totalItems,
        totalPages,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving student pagination');
  }
});
