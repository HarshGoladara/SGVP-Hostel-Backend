import asyncHandler from 'express-async-handler';
import db from '../config/dbConnection.js'

// @description Add new Student
// @route POST /api/admission
// @access public

export const addStudentData = asyncHandler(async (req, res) => {
    try {
        const {
            pin_number, student_full_name, dob, nationality, religion, address, city, postal_pin_number,
            student_contact_number, student_email, student_qualification, student_photo_url
        } = req.body;

        const query = `
            INSERT INTO studentData (
                pin_number, student_full_name, dob, nationality, religion, address, city, postal_pin_number, 
                student_contact_number, student_email, student_qualification, student_photo_url
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const result = await db.query(query, [
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
            student_photo_url
        ]);

        res.status(201).json({
            message: 'Student data added successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error adding student data');
    }
});

// @description Add student education details
// @route POST /api/admission
// @access public

export const addStudentEducation = asyncHandler(async (req, res) => {
    try {
        const { pin_number, name_of_university, name_of_collage, course, branch, course_duration_years, current_year, current_sem } = req.body;

        const query = `
            INSERT INTO studentEducation (
                pin_number, name_of_university, name_of_collage, course, branch, course_duration_years, current_year, current_sem
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const result = await db.query(query, [
            pin_number,
            name_of_university,
            name_of_collage,
            course,
            branch,
            course_duration_years,
            current_year,
            current_sem
        ]);

        res.status(201).json({
            message: 'Student education data added successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error adding student education data');
    }
});


//@decription add parent details in database
//@route POST /api/admission
//@access public

export const addParentsDetails = asyncHandler(async (req, res) => {
    try {
        const { pin_number, father_name, father_contact_number, father_email, father_photo_url, mother_name, mother_contact_number, mother_photo_url, approval_person_name, approval_person_contact, approval_person_relation, approval_person_email } = req.body;
        const query = `
            INSERT INTO parentDetail (
                pin_number, father_name, father_contact_number, father_email, father_photo_url, 
                mother_name, mother_contact_number, mother_photo_url, approval_person_name, approval_person_contact, approval_person_relation, approval_person_email
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const results = await db.query(query, [
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
            approval_person_email
        ]);

        res.status(201).json({
            message: 'Parents details added successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error adding parent details');
    }
});


// @description Add new relative
// @route POST /api/admission
// @access public

export const addRelativeDetails = asyncHandler(async (req, res) => {
    try {
        const { pin_number, relative_name, relation, relative_contact_number, relative_address } = req.body;
        const query = `
            INSERT INTO relative (
                pin_number, relative_name, relation, relative_contact_number, relative_address
            ) 
            VALUES (?, ?, ?, ?, ?)
        `;

        const result = await db.query(query, [
            pin_number,
            relative_name,
            relation,
            relative_contact_number,
            relative_address
        ]);

        res.status(201).json({
            message: 'Relative details added successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error adding relative details');
    }
});


// @description Add new SantReference
// @route POST /api/admission
// @access public

export const addSantReference = asyncHandler(async (req, res) => {
    try {
        const { pin_number, name_of_sant, sant_phone_number } = req.body;
        const query = `
            INSERT INTO santReference (
                pin_number, name_of_sant, sant_phone_number
            ) 
            VALUES (?, ?, ?)
        `;

        const result = await db.query(query, [
            pin_number,
            name_of_sant,
            sant_phone_number
        ]);

        res.status(201).json({
            message: 'Sant reference added successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding sant reference');
    }
});

// @description Add relative reference details
// @route POST /api/admission
// @access public

export const addRelativeReference = asyncHandler(async (req, res) => {
    try {
        const { pin_number, full_name, relation, mobile_number } = req.body;

        const query = `
            INSERT INTO relativeReference (
                pin_number, full_name, relation, mobile_number
            ) 
            VALUES (?, ?, ?, ?)
        `;

        const result = await db.query(query, [
            pin_number,
            full_name,
            relation,
            mobile_number
        ]);

        res.status(201).json({
            message: 'Relative reference added successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error adding relative reference');
    }
});

// -------------------------------------------------------------------------------------------------------

// @description assign room my HOD
// @route POST /api/admission
// @access public

export const assignRoom = asyncHandler(async (req, res) => {
    try {
        const { pin_number, room_number, bed_number } = req.body;

        const query = `
            INSERT INTO roomAllotment (
                pin_number, room_number, bed_number
            ) 
            VALUES (?, ?, ?)
        `;

        const result = await db.query(query, [
            pin_number,
            room_number,
            bed_number
        ]);

        res.status(201).json({
            message: 'Room Assigned successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error assigning room');
    }
});

// -----------------------------------------------------------------------------------------------------------

// @description Add relative reference details
// @route POST /api/admission
// @access public

export const addStudent = asyncHandler(async (req, res) => {
    try {
        const {
            pin_number, student_full_name, dob, nationality, religion, address, city, postal_pin_number,
            student_contact_number, student_email, student_qualification, student_photo_url
        } = req.body;

        const queryStudentData = `
            INSERT INTO studentData (
                pin_number, student_full_name, dob, nationality, religion, address, city, postal_pin_number, 
                student_contact_number, student_email, student_qualification, student_photo_url
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const resultStudentData = await db.query(queryStudentData, [
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
            student_photo_url
        ]);

        const { name_of_university, name_of_collage, course, branch, course_duration_years, current_year, current_sem } = req.body;

        const queryStudentEducation = `
            INSERT INTO studentEducation (
                pin_number, name_of_university, name_of_collage, course, branch, course_duration_years, current_year, current_sem
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const resultStudentEducation = await db.query(queryStudentEducation, [
            pin_number,
            name_of_university,
            name_of_collage,
            course,
            branch,
            course_duration_years,
            current_year,
            current_sem
        ]);

        const { father_name, father_contact_number, father_email, father_photo_url, mother_name, mother_contact_number, mother_photo_url, approval_person_name, approval_person_contact, approval_person_relation, approval_person_email } = req.body;

        const queryParentDetail = `
            INSERT INTO parentDetail (
                pin_number, father_name, father_contact_number, father_email, father_photo_url, 
                mother_name, mother_contact_number, mother_photo_url, approval_person_name, approval_person_contact, approval_person_relation, approval_person_email
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const resultsParentDetail = await db.query(queryParentDetail, [
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
            approval_person_email
        ]);

        const { relative_name, relation, relative_contact_number, relative_address } = req.body;

        const queryRelative = `
            INSERT INTO relative (
                pin_number, relative_name, relation, relative_contact_number, relative_address
            ) 
            VALUES (?, ?, ?, ?, ?)
        `;

        const resultRelative = await db.query(queryRelative, [
            pin_number,
            relative_name,
            relation,
            relative_contact_number,
            relative_address
        ]);

        const { name_of_sant, sant_phone_number } = req.body;

        const querySantReference = `
            INSERT INTO santReference (
                pin_number, name_of_sant, sant_phone_number
            ) 
            VALUES (?, ?, ?)
        `;

        const resultSantReference = await db.query(querySantReference, [
            pin_number,
            name_of_sant,
            sant_phone_number
        ]);

        const { reference_relative_full_name, reference_relative_relation, reference_relative_mobile } = req.body;

        const queryRelativeReference = `
            INSERT INTO relativeReference (
                pin_number, full_name, relation, mobile_number
            ) 
            VALUES (?, ?, ?, ?)
        `;

        const resultRelativeReference = await db.query(queryRelativeReference, [
            pin_number,
            reference_relative_full_name,
            reference_relative_relation,
            reference_relative_mobile
        ]);

        res.status(201).json({
            message: 'Student added successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error adding student', err: `Error:-${error}` });
    }
});