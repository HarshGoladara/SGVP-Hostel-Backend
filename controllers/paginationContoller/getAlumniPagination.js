import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description pagination for student tab
// @route GET /api/pagination/getAlumniPagination
// @access public
export const getAlumniPagination = asyncHandler(async (req, res) => {
  const { limit, student_full_name, pin_number } = req.query;

  try {
    const pageLimit = parseInt(limit) || 10;
    // Get the total count of students for pagination metadata
    let countQuery = `SELECT COUNT(*) FROM "studentData" sd
            WHERE sd.is_alumni = true`;
    const countQueryParams = [];
    let countParamIndex = 1;
    if (student_full_name) {
      countQuery += ` AND sd.student_full_name ILIKE $${countParamIndex}`;
      countQueryParams.push(`%${student_full_name}%`);
      countParamIndex++;
    } else if (pin_number) {
      countQuery += ` AND sd.pin_number = $${countParamIndex}`;
      countQueryParams.push(pin_number);
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
    res.status(500).send('Error retrieving alumni pagination');
  }
});
