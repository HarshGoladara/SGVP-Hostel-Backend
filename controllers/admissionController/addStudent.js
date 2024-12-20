import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Add relative reference details
// @route POST /api/admission/addStudent
// @access public

export const addStudent = asyncHandler(async (req, res) => {
  try {
    const {
      pin_number,
      student_full_name,
      dob,
      nationality,
      religion,
      address,
      city,
      postal_pin_number,
      student_contact_number,
      student_email,
      student_qualification,
      student_photo_url,
    } = req.body;

    const queryStudentData = `
            INSERT INTO "studentData" (
                pin_number, student_full_name, dob, nationality, religion, address, city, postal_pin_number, 
                student_contact_number, student_email, student_qualification, student_photo_url
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    await db.query(queryStudentData, [
      pin_number,
      student_full_name,
      dob,
      nationality,
      religion,
      address,
      city,
      postal_pin_number,
      student_contact_number,
      student_email,
      student_qualification,
      student_photo_url,
    ]);

    const {
      name_of_university,
      name_of_collage,
      course,
      branch,
      course_duration_years,
      current_year,
      current_sem,
    } = req.body;

    const queryStudentEducation = `
            INSERT INTO studentEducation (
                pin_number, name_of_university, name_of_collage, course, branch, course_duration_years, current_year, current_sem
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

    await db.query(queryStudentEducation, [
      pin_number,
      name_of_university,
      name_of_collage,
      course,
      branch,
      course_duration_years,
      current_year,
      current_sem,
    ]);

    const {
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
    } = req.body;

    const queryParentDetail = `
            INSERT INTO parentDetail (
                pin_number, father_name, father_contact_number, father_email, father_photo_url, 
                mother_name, mother_contact_number, mother_photo_url, approval_person_name, approval_person_contact, approval_person_relation, approval_person_email
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    await db.query(queryParentDetail, [
      pin_number,
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
    ]);

    const {
      relative_name,
      relation,
      relative_contact_number,
      relative_address,
    } = req.body;

    const queryRelative = `
            INSERT INTO relative (
                pin_number, relative_name, relation, relative_contact_number, relative_address
            ) 
            VALUES (?, ?, ?, ?, ?)
        `;

    await db.query(queryRelative, [
      pin_number,
      relative_name,
      relation,
      relative_contact_number,
      relative_address,
    ]);

    const { name_of_sant, sant_phone_number } = req.body;

    const querySantReference = `
            INSERT INTO santReference (
                pin_number, name_of_sant, sant_phone_number
            ) 
            VALUES (?, ?, ?)
        `;

    await db.query(querySantReference, [
      pin_number,
      name_of_sant,
      sant_phone_number,
    ]);

    const {
      reference_relative_full_name,
      reference_relative_relation,
      reference_relative_mobile,
    } = req.body;

    const queryRelativeReference = `
            INSERT INTO relativeReference (
                pin_number, full_name, relation, mobile_number
            ) 
            VALUES (?, ?, ?, ?)
        `;

    await db.query(queryRelativeReference, [
      pin_number,
      reference_relative_full_name,
      reference_relative_relation,
      reference_relative_mobile,
    ]);

    res.status(201).json({
      message: 'Student added successfully',
    });
  } catch (error) {
    console.log({ message: 'Error adding student', err: `Error:-${error}` });
    res.status(500).send(`Error adding student:- ${error.sqlMessage}`);
  }
});
