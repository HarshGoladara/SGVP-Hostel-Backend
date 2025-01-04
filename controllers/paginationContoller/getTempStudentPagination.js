import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description pagination for student tab
// @route GET /api/pagination/getTempStudentPagination
// @access public
export const getTempStudentPagination = asyncHandler(async (req, res) => {
  const { limit, student_full_name, search_query, admission_status } =
    req.query;

  try {
    const pageLimit = parseInt(limit) || 10;
    // Get the total count of students for pagination metadata
    let countQuery = `SELECT COUNT(*) FROM "tempStudentDetails" WHERE 1 = 1`;
    const countQueryParams = [];
    let countParamIndex = 1;
    if (student_full_name) {
      countQuery += ` AND student_full_name ILIKE $${countParamIndex}`;
      countQueryParams.push(`%${student_full_name}%`);
      countParamIndex++;
    } else if (search_query) {
      countQuery += ` AND (entry_number = $${countParamIndex} OR pin_number = $${countParamIndex})`;
      countQueryParams.push(search_query);
      countParamIndex++;
    }

    if (admission_status) {
      countQuery += ` AND admission_status = $${countParamIndex}`;
      countQueryParams.push(admission_status);
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
    res.status(500).send('Error retrieving tempStudent pagination');
  }
});
