import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Fetch Student Info (Paginated or by Name or Pin Number)
// @route GET /api/student/getStudentDetails?page=<page_number>&limit=<limit>&name=<student_full_name>&pin_number=<pin_number>
// @access public
export const getStudentDetails = asyncHandler(async (req, res) => {
  const { page, limit, student_full_name, pin_number, category } = req.query;

  try {
    // Pagination variables
    const currentPage = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;
    const offset = (currentPage - 1) * pageLimit;

    // Base query for fetching student data
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
      WHERE sd.is_alumni = false
    `;

    // Apply filters if query parameters are provided
    const queryParams = [];
    let paramIndex = 1;
    if (student_full_name) {
      query += ` AND sd.student_full_name ILIKE $${paramIndex}`;
      queryParams.push(`%${student_full_name}%`);
      paramIndex++;
    } else if (pin_number) {
      query += ` AND sd.pin_number = $${paramIndex}`;
      queryParams.push(pin_number);
      paramIndex++;
    } else if (category) {
      query += ` AND ra.category = $${paramIndex}`;
      queryParams.push(category);
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

    // Get the total count of students for pagination metadata
    let countQuery = `SELECT COUNT(*) FROM "studentData" WHERE is_alumni = false`;
    const countQueryParams = [];
    let countParamIndex = 1;
    if (student_full_name) {
      countQuery += ` AND student_full_name ILIKE $${countParamIndex}`;
      countQueryParams.push(`%${student_full_name}%`);
      countParamIndex++;
    } else if (pin_number) {
      countQuery += ` AND pin_number = $${countParamIndex}`;
      countQueryParams.push(pin_number);
      countParamIndex++;
    }
    const countResult = await db.query(countQuery, countQueryParams);
    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / pageLimit);

    res.status(200).json({
      data: results.rows,
      pagination: {
        totalItems,
        totalPages,
        currentPage,
        pageSize: pageLimit,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving student info');
  }
});
