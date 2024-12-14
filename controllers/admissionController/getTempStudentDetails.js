import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch Paginated temporary student Details
// @route GET /api/admission/getTempStudentDetails?page=<page_number>&limit=<limit>
// @access Public
export const getTempStudentDetails = asyncHandler(async (req, res) => {
  const { page, limit, student_full_name, entry_number, admission_status } =
    req.query;

  try {
    // Pagination variables
    const currentPage = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;
    const offset = (currentPage - 1) * pageLimit;

    let query = `
      SELECT * FROM "tempStudentDetails" WHERE 1 = 1
    `;

    // Apply filters if query parameters are provided
    const queryParams = [];
    let paramIndex = 1;
    if (student_full_name) {
      query += ` AND student_full_name ILIKE $${paramIndex}`;
      queryParams.push(`%${student_full_name}%`);
      paramIndex++;
    } else if (entry_number) {
      query += ` AND entry_number = $${paramIndex}`;
      queryParams.push(entry_number);
      paramIndex++;
    }

    if (admission_status) {
      query += ` AND admission_status = $${paramIndex}`;
      queryParams.push(admission_status);
      paramIndex++;
    }

    // Pagination logic
    query += ` LIMIT $${paramIndex}`;
    queryParams.push(pageLimit);
    paramIndex++;

    query += ` OFFSET $${paramIndex}`;
    queryParams.push(offset);
    paramIndex++;

    // Execute the query
    const results = await db.query(query, queryParams);
    console.log(results);

    // Get the total count of tempStudentDetails for pagination metadata
    const countQuery = `SELECT COUNT(*) FROM "tempStudentDetails"`;
    const countResult = await db.query(countQuery);
    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      data: results.rows,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (err) {
    console.error(`Error fetching temp student details: ${err.message}`);
    res.status(500).json({ message: 'Error retrieving temp student details' });
  }
});
