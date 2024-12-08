// import asyncHandler from 'express-async-handler';
// import db from '../../config/dbConnection.js';

// // @description Update Student
// // @route PUT /api/updateData/updateStudent
// // @access public
// export const updateStudent = asyncHandler(async (req, res) => {
//   console.log(req.body);
//   try {
//     const { pin_number } = req.body;
//     const {
//       student_full_name,
//       dob,
//       nationality,
//       religion,
//       address,
//       city,
//       postal_pin_number,
//       student_contact_number,
//       student_email,
//       student_qualification,
//       student_photo_url,
//     } = req.body;

//     // Dynamically build the query based on provided fields
//     let queryStudentData = 'UPDATE "studentData" SET ';
//     const paramsStudentData = [];

//     if (student_full_name) {
//       queryStudentData += 'student_full_name = ?, ';
//       paramsStudentData.push(student_full_name);
//     }
//     if (dob) {
//       queryStudentData += 'dob = ?, ';
//       paramsStudentData.push(new Date(dob));
//     }
//     if (nationality) {
//       queryStudentData += 'nationality = ?, ';
//       paramsStudentData.push(nationality);
//     }
//     if (religion) {
//       queryStudentData += 'religion = ?, ';
//       paramsStudentData.push(religion);
//     }
//     if (address) {
//       queryStudentData += 'address = ?, ';
//       paramsStudentData.push(address);
//     }
//     if (city) {
//       queryStudentData += 'city = ?, ';
//       paramsStudentData.push(city);
//     }
//     if (postal_pin_number) {
//       queryStudentData += 'postal_pin_number = ?, ';
//       paramsStudentData.push(postal_pin_number);
//     }
//     if (student_contact_number) {
//       queryStudentData += 'student_contact_number = ?, ';
//       paramsStudentData.push(student_contact_number);
//     }
//     if (student_email) {
//       queryStudentData += 'student_email = ?, ';
//       paramsStudentData.push(student_email);
//     }
//     if (student_qualification) {
//       queryStudentData += 'student_qualification = ?, ';
//       paramsStudentData.push(student_qualification);
//     }
//     if (student_photo_url) {
//       queryStudentData += 'student_photo_url = ?, ';
//       paramsStudentData.push(student_photo_url);
//     }

//     // Remove the last comma and space from query
//     queryStudentData = queryStudentData.slice(0, -2);
//     queryStudentData += ' WHERE pin_number = ?';
//     paramsStudentData.push(pin_number);

//     if (paramsStudentData.length > 1) {
//       await db.query(queryStudentData, paramsStudentData);
//     }

//     // -----------------

//     const {
//       name_of_university,
//       name_of_collage,
//       course,
//       branch,
//       course_duration_years,
//       current_year,
//       current_sem,
//     } = req.body;

//     let queryStudentEducation = 'UPDATE studentEducation SET ';
//     const paramsStudentEducation = [];

//     if (name_of_university) {
//       queryStudentEducation += 'name_of_university = ?, ';
//       paramsStudentEducation.push(name_of_university);
//     }
//     if (name_of_collage) {
//       queryStudentEducation += 'name_of_collage = ?, ';
//       paramsStudentEducation.push(name_of_collage);
//     }
//     if (course) {
//       queryStudentEducation += 'course = ?, ';
//       paramsStudentEducation.push(course);
//     }
//     if (branch) {
//       queryStudentEducation += 'branch = ?, ';
//       paramsStudentEducation.push(branch);
//     }
//     if (course_duration_years) {
//       queryStudentEducation += 'course_duration_years = ?, ';
//       paramsStudentEducation.push(course_duration_years);
//     }
//     if (current_year) {
//       queryStudentEducation += 'current_year = ?, ';
//       paramsStudentEducation.push(current_year);
//     }
//     if (current_sem) {
//       queryStudentEducation += 'current_sem = ?, ';
//       paramsStudentEducation.push(current_sem);
//     }

//     queryStudentEducation = queryStudentEducation.slice(0, -2);
//     queryStudentEducation += ' WHERE pin_number = ?';
//     paramsStudentEducation.push(pin_number);

//     if (paramsStudentEducation.length > 1) {
//       await db.query(queryStudentEducation, paramsStudentEducation);
//     }
//     // ----------------------

//     const {
//       father_name,
//       father_contact_number,
//       father_email,
//       father_photo_url,
//       mother_name,
//       mother_contact_number,
//       mother_photo_url,
//       approval_person_name,
//       approval_person_contact,
//       approval_person_relation,
//       approval_person_email,
//     } = req.body;

//     let queryParentsDetails = 'UPDATE parentDetail SET ';
//     const paramsParentsDetails = [];

//     if (father_name) {
//       queryParentsDetails += 'father_name = ?, ';
//       paramsParentsDetails.push(father_name);
//     }
//     if (father_contact_number) {
//       queryParentsDetails += 'father_contact_number = ?, ';
//       paramsParentsDetails.push(father_contact_number);
//     }
//     if (father_email) {
//       queryParentsDetails += 'father_email = ?, ';
//       paramsParentsDetails.push(father_email);
//     }
//     if (father_photo_url) {
//       queryParentsDetails += 'father_photo_url = ?, ';
//       paramsParentsDetails.push(father_photo_url);
//     }
//     if (mother_name) {
//       queryParentsDetails += 'mother_name = ?, ';
//       paramsParentsDetails.push(mother_name);
//     }
//     if (mother_contact_number) {
//       queryParentsDetails += 'mother_contact_number = ?, ';
//       paramsParentsDetails.push(mother_contact_number);
//     }
//     if (mother_photo_url) {
//       queryParentsDetails += 'mother_photo_url = ?, ';
//       paramsParentsDetails.push(mother_photo_url);
//     }
//     if (approval_person_name) {
//       queryParentsDetails += 'approval_person_name = ?, ';
//       paramsParentsDetails.push(approval_person_name);
//     }
//     if (approval_person_contact) {
//       queryParentsDetails += 'approval_person_contact = ?, ';
//       paramsParentsDetails.push(approval_person_contact);
//     }
//     if (approval_person_relation) {
//       queryParentsDetails += 'approval_person_relation = ?, ';
//       paramsParentsDetails.push(approval_person_relation);
//     }
//     if (approval_person_email) {
//       queryParentsDetails += 'approval_person_email = ?, ';
//       paramsParentsDetails.push(approval_person_email);
//     }

//     queryParentsDetails = queryParentsDetails.slice(0, -2);
//     queryParentsDetails += ' WHERE pin_number = ?';
//     paramsParentsDetails.push(pin_number);

//     if (paramsParentsDetails.length > 1) {
//       await db.query(queryParentsDetails, paramsParentsDetails);
//     }

//     // --------------------------

//     const {
//       relative_name,
//       relation,
//       relative_contact_number,
//       relative_address,
//     } = req.body;

//     let queryRelativeDetails = 'UPDATE relative SET ';
//     const paramsRelativeDetails = [];

//     if (relative_name) {
//       queryRelativeDetails += 'relative_name = ?, ';
//       paramsRelativeDetails.push(relative_name);
//     }
//     if (relation) {
//       queryRelativeDetails += 'relation = ?, ';
//       paramsRelativeDetails.push(relation);
//     }
//     if (relative_contact_number) {
//       queryRelativeDetails += 'relative_contact_number = ?, ';
//       paramsRelativeDetails.push(relative_contact_number);
//     }
//     if (relative_address) {
//       queryRelativeDetails += 'relative_address = ?, ';
//       paramsRelativeDetails.push(relative_address);
//     }

//     queryRelativeDetails = queryRelativeDetails.slice(0, -2);
//     queryRelativeDetails += ' WHERE pin_number = ?';
//     paramsRelativeDetails.push(pin_number);

//     if (paramsRelativeDetails.length > 1) {
//       await db.query(queryRelativeDetails, paramsRelativeDetails);
//     }
//     // ---------------------

//     const { name_of_sant, sant_phone_number } = req.body;

//     let querySantReference = 'UPDATE santReference SET ';
//     const paramsSantReference = [];

//     if (name_of_sant) {
//       querySantReference += 'name_of_sant = ?, ';
//       paramsSantReference.push(name_of_sant);
//     }
//     if (sant_phone_number) {
//       querySantReference += 'sant_phone_number = ?, ';
//       paramsSantReference.push(sant_phone_number);
//     }

//     querySantReference = querySantReference.slice(0, -2);
//     querySantReference += ' WHERE pin_number = ?';
//     paramsSantReference.push(pin_number);

//     if (paramsSantReference.length > 1) {
//       await db.query(querySantReference, paramsSantReference);
//     }
//     // --------------------------

//     const {
//       reference_relative_full_name,
//       reference_relative_relation,
//       reference_relative_mobile,
//     } = req.body;

//     let queryRelativeReference = 'UPDATE relativeReference SET ';
//     const paramsRelativeReference = [];

//     if (reference_relative_full_name) {
//       queryRelativeReference += 'full_name = ?, ';
//       paramsRelativeReference.push(reference_relative_full_name);
//     }
//     if (reference_relative_relation) {
//       queryRelativeReference += 'relation = ?, ';
//       paramsRelativeReference.push(reference_relative_relation);
//     }
//     if (reference_relative_mobile) {
//       queryRelativeReference += 'mobile_number = ?, ';
//       paramsRelativeReference.push(reference_relative_mobile);
//     }

//     queryRelativeReference = queryRelativeReference.slice(0, -2);
//     queryRelativeReference += ' WHERE pin_number = ?';
//     paramsRelativeReference.push(pin_number);

//     if (paramsRelativeReference.length > 1) {
//       await db.query(queryRelativeReference, paramsRelativeReference);
//     }
//     // ----------------

//     const { room_number, bed_number } = req.body;

//     let queryRoomAllotment = 'UPDATE roomAllotment SET ';
//     const paramsRoomAllotment = [];

//     if (room_number) {
//       queryRoomAllotment += 'room_number = ?, ';
//       paramsRoomAllotment.push(room_number);
//     }
//     if (bed_number) {
//       queryRoomAllotment += 'bed_number = ?, ';
//       paramsRoomAllotment.push(bed_number);
//     }

//     queryRoomAllotment = queryRoomAllotment.slice(0, -2);
//     queryRoomAllotment += ' WHERE pin_number = ?';
//     paramsRoomAllotment.push(pin_number);

//     if (paramsRoomAllotment.length > 1) {
//       await db.query(queryRoomAllotment, paramsRoomAllotment);
//     }
//     res.status(200).json({
//       message: 'Student updated successfully',
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Error updating student');
//   }
// });

// -------------------------------------------------------------------------------------------------------

import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Update Student
// @route PUT /api/updateData/updateStudent
// @access public
export const updateStudent = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const { pin_number } = req.body;
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
      relation,
      relative_contact_number,
      relative_address,
      name_of_sant,
      sant_phone_number,
      reference_relative_full_name,
      reference_relative_relation,
      reference_relative_mobile,
      room_number,
      bed_number,
    } = req.body;

    const updateQueries = [
      {
        table: '"studentData"',
        fields: {
          student_full_name,
          dob: dob ? new Date(dob) : null,
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
        },
      },
      {
        table: '"studentEducation"',
        fields: {
          name_of_university,
          name_of_collage,
          course,
          branch,
          course_duration_years,
          current_year,
          current_sem,
        },
      },
      {
        table: '"parentDetail"',
        fields: {
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
        },
      },
      {
        table: '"relative"',
        fields: {
          relative_name,
          relation,
          relative_contact_number,
          relative_address,
        },
      },
      {
        table: '"santReference"',
        fields: {
          name_of_sant,
          sant_phone_number,
        },
      },
      {
        table: '"relativeReference"',
        fields: {
          full_name: reference_relative_full_name,
          relation: reference_relative_relation,
          mobile_number: reference_relative_mobile,
        },
      },
      {
        table: '"roomAllotment"',
        fields: {
          room_number,
          bed_number,
        },
      },
    ];

    for (const { table, fields } of updateQueries) {
      let query = `UPDATE ${table} SET `;
      const params = [];
      let paramIndex = 1;

      for (const [key, value] of Object.entries(fields)) {
        if (value !== undefined && value !== null) {
          query += `${key} = $${paramIndex}, `;
          params.push(value);
          paramIndex++;
        }
      }

      query = query.slice(0, -2); // Remove the trailing comma and space
      query += ` WHERE pin_number = $${paramIndex}`;
      params.push(pin_number);

      if (params.length > 1) {
        await db.query(query, params);
      }
    }

    res.status(200).json({
      message: 'Student updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating student');
  }
});
