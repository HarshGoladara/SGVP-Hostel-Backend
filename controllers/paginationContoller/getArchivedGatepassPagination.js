import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description pagination for student tab
// @route GET /api/pagination/getArchivedGatepassPagination
// @access public
export const getArchivedGatepassPagination = asyncHandler(async (req, res) => {
  const { limit, query_number, startDate, endDate, student_full_name } =
    req.query;

  try {
    const pageLimit = parseInt(limit) || 10;
    // Get the total count of students for pagination metadata
    let countQuery = `SELECT COUNT(*) 
            FROM "archivedGatepass" AS ag WHERE 1 = 1
        `;
    const countQueryParams = [];
    let countParamIndex = 1;
    if (query_number) {
      countQuery += ` AND (ag.gatepass_number = $${countParamIndex} OR ag.pin_number = $${countParamIndex})`;
      countQueryParams.push(query_number);
      countParamIndex++;
    }

    if (startDate && endDate && startDate <= endDate) {
      countQuery += ` AND ag.outgoing_timestamp >= $${countParamIndex}`;
      countQueryParams.push(startDate);
      countParamIndex++;
      countQuery += ` AND ag.permission_upto_timestamp <= $${countParamIndex}`;
      countQueryParams.push(endDate);
      countParamIndex++;
    }

    if (student_full_name) {
      countQuery += ` AND sd.student_full_name ILIKE $${countParamIndex}`;
      countQueryParams.push(`%${student_full_name}%`);
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
