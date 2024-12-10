import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Add student details in temporary table
// @route POST /api/admission/tempAddStudentDetails
// @access public

export const tempAddStudentDetails = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const {
      student_full_name,
      dob,
      nationality,
      religion,
      caste,
      address,
      city,
      postal_pin_number,
      student_contact_number,
      student_email,
      student_qualification,
      student_photo_url,
      name_of_university,
      name_of_collage,
      course,
      branch,
      course_duration_years,
      current_year,
      current_sem,
      father_name,
      father_contact_number,
      father_email,
      father_photo_url,
      mother_name,
      mother_contact_number,
      mother_photo_url,
      approval_person_name,
      approval_person_contact,
      approval_person_relation,
      approval_person_email,
      relative_name,
      relative_relation,
      relative_contact_number,
      relative_address,
      name_of_sant,
      sant_phone_number,
      reference_relative_full_name,
      reference_relative_relation,
      reference_relative_mobile,
    } = req.body;

    const query = `
            INSERT INTO "tempStudentDetails" (
                student_full_name, dob, nationality, religion, caste,
                address, city, postal_pin_number, student_contact_number, student_email,
                student_qualification, student_photo_url, name_of_university, name_of_collage,
                course, branch, course_duration_years, current_year, current_sem,
                father_name, father_contact_number, father_email, father_photo_url,
                mother_name, mother_contact_number, mother_photo_url,
                approval_person_name, approval_person_contact, approval_person_relation, approval_person_email,
                relative_name, relative_relation, relative_contact_number, relative_address,
                name_of_sant, sant_phone_number, reference_relative_full_name,
                reference_relative_relation, reference_relative_mobile
            ) VALUES (
                $1, $2, $3, $4, $5,
                $6, $7, $8, $9, $10,
                $11, $12, $13, $14,
                $15, $16, $17, $18, $19,
                $20, $21, $22, $23,
                $24, $25, $26,
                $27, $28, $29, $30,
                $31, $32, $33, $34,
                $35, $36, $37,
                $38, $39
            )
        `;

    const values = [
      student_full_name,
      dob,
      nationality,
      religion,
      caste,
      address,
      city,
      postal_pin_number,
      student_contact_number,
      student_email,
      student_qualification,
      student_photo_url,
      name_of_university,
      name_of_collage,
      course,
      branch,
      course_duration_years,
      current_year,
      current_sem,
      father_name,
      father_contact_number,
      father_email,
      father_photo_url,
      mother_name,
      mother_contact_number,
      mother_photo_url,
      approval_person_name,
      approval_person_contact,
      approval_person_relation,
      approval_person_email,
      relative_name,
      relative_relation,
      relative_contact_number,
      relative_address,
      name_of_sant,
      sant_phone_number,
      reference_relative_full_name,
      reference_relative_relation,
      reference_relative_mobile,
    ];

    await db.query(query, values);

    res.status(201).json({
      message: 'Student added into temporary table successfully',
    });
  } catch (error) {
    console.log({ message: 'Error adding student', err: `Error:-${error}` });
    res.status(500).send(`Error adding student:- ${error.sqlMessage}`);
  }
});
