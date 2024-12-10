import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch Paginated temporary student Details
// @route GET /api/getTempStudentDetails?page=<page_number>&limit=<limit>
// @access Public
export const getTempStudentDetails = asyncHandler(async (req, res) => {
  const { page, limit, student_full_name, pin_number } = req.query;

  try {
    // Pagination variables
    const currentPage = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;
    const offset = (currentPage - 1) * pageLimit;

    const query = `
      SELECT * FROM "tempStudentDetails"
    `;

    // Apply filters if query parameters are provided
    const queryParams = [];
    let paramIndex = 1;
    if (student_full_name) {
      query += ` WHERE student_full_name ILIKE $${paramIndex}`;
      queryParams.push(`%${student_full_name}%`);
      paramIndex++;
    } else if (pin_number) {
      query += ` WHERE pin_number = $${paramIndex}`;
      queryParams.push(pin_number);
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

    // Get the total count of tempStudentDetails for pagination metadata
    const countQuery = `SELECT COUNT(*) FROM tempStudentDetails`;
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
