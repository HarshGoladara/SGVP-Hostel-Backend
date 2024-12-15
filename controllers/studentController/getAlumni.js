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
      SELECT 
          sd.pin_number,
          sd.student_full_name,
          sd.dob,
          sd.nationality,
          sd.religion,
          sd.caste,
          sd.address,
          sd.city,
          sd.postal_pin_number,
          sd.student_contact_number,
          sd.student_email,
          sd.student_qualification,
          sd.student_photo_url,
          se.name_of_university,
          se.name_of_collage,
          se.course,
          se.branch,
          se.course_duration_years,
          se.current_year,
          se.current_sem,
          pd.father_name,
          pd.father_contact_number,
          pd.father_email,
          pd.father_photo_url,
          pd.mother_name,
          pd.mother_contact_number,
          pd.mother_photo_url,
          pd.approval_person_name,
          pd.approval_person_contact,
          pd.approval_person_relation,
          pd.approval_person_email,
          r.relative_name,
          r.relation,
          r.relative_contact_number,
          r.relative_address,
          sr.name_of_sant,
          sr.sant_phone_number,
          rr.full_name AS reference_relative_full_name,
          rr.relation AS reference_relative_relation,
          rr.mobile_number AS reference_relative_mobile,
          ra.room_number as room_number,
          ra.bed_number as bed_number,
          ra.category as category
      FROM 
          "studentData" sd
      LEFT JOIN 
          "parentDetail" pd ON sd.pin_number = pd.pin_number
      LEFT JOIN 
          "relative" r ON sd.pin_number = r.pin_number
      LEFT JOIN 
          "relativeReference" rr ON sd.pin_number = rr.pin_number
      LEFT JOIN 
          "santReference" sr ON sd.pin_number = sr.pin_number
      LEFT JOIN 
          "studentEducation" se ON sd.pin_number = se.pin_number
      LEFT JOIN 
          "roomAllotment" ra ON sd.pin_number = ra.pin_number
      WHERE sd.is_alumni = true
    `;

    // Apply filters if query parameters are provided
    const queryParams = [];
    let paramIndex = 1;
    if (student_full_name) {
      query += ` AND student_full_name ILIKE $${paramIndex}`;
      queryParams.push(`%${student_full_name}%`);
      paramIndex++;
    } else if (pin_number) {
      query += ` AND pin_number = $${paramIndex}`;
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
