import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch Paginated Alumni Details
// @route GET /api/student/getAlumni?page=<page_number>&limit=<limit>&name=<student_full_name>&pin_number=<pin_number>
// @access Public
export const getAlumni = asyncHandler(async (req, res) => {
  const { page, limit, student_full_name, pin_number } = req.query;

  try {
    // Pagination variables
    const currentPage = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;
    const offset = (currentPage - 1) * pageLimit;

    let query = `
      SELECT * FROM "alumni"
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

    // Get the total count of alumni for pagination metadata
    const countQuery = `SELECT COUNT(*) FROM "alumni"`;
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
    console.error(`Error fetching alumni details: ${err.message}`);
    res.status(500).json({ message: 'Error retrieving alumni details' });
  }
});
