import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

//@decription Fetch StudentInfo by name
//@route GET /api/admission
//@access public

export const studentDetailsByName = asyncHandler(async (req, res) => {
  const { student_full_name } = req.query;

  try {
    const query = `
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
                ra.bed_number as bed_number
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
            WHERE 
                sd.student_full_name ILIKE $1
        `;

    const results = await db.query(query, [`%${student_full_name}%`]);
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving student info');
  }
});
