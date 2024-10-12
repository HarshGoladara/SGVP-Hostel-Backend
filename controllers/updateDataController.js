import asyncHandler from 'express-async-handler';
import db from '../config/dbConnection.js'

// @description Update Student Data
// @route PUT api/updateData/updateStudentData
// @access public
export const updateStudentData = asyncHandler(async (req, res) => {
    try {
        const { pin_number } = req.body;
        const {
            student_full_name, dob, nationality, religion, address, city, postal_pin_number,
            student_contact_number, student_email, student_qualification, student_photo_url
        } = req.body;

        // Dynamically build the query based on provided fields
        let query = 'UPDATE studentData SET ';
        let params = [];

        if (student_full_name) {
            query += 'student_full_name = ?, ';
            params.push(student_full_name);
        }
        if (dob) {
            query += 'dob = ?, ';
            params.push(new Date(dob));
        }
        if (nationality) {
            query += 'nationality = ?, ';
            params.push(nationality);
        }
        if (religion) {
            query += 'religion = ?, ';
            params.push(religion);
        }
        if (address) {
            query += 'address = ?, ';
            params.push(address);
        }
        if (city) {
            query += 'city = ?, ';
            params.push(city);
        }
        if (postal_pin_number) {
            query += 'postal_pin_number = ?, ';
            params.push(postal_pin_number);
        }
        if (student_contact_number) {
            query += 'student_contact_number = ?, ';
            params.push(student_contact_number);
        }
        if (student_email) {
            query += 'student_email = ?, ';
            params.push(student_email);
        }
        if (student_qualification) {
            query += 'student_qualification = ?, ';
            params.push(student_qualification);
        }
        if (student_photo_url) {
            query += 'student_photo_url = ?, ';
            params.push(student_photo_url);
        }

        // Remove the last comma and space from query
        query = query.slice(0, -2);
        query += ' WHERE pin_number = ?';
        params.push(pin_number);

        if (params.length > 1) {
            const result = await db.query(query, params);
        }
        res.status(200).json({
            message: 'Student data updated successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating student data');
    }
});


// @description Update Student Education Details
// @route PUT /api/updateData/updateStudentEducation
// @access public

export const updateStudentEducation = asyncHandler(async (req, res) => {
    try {
        const { pin_number } = req.body;
        const { name_of_university, name_of_collage, course, branch, course_duration_years, current_year, current_sem } = req.body;

        let query = 'UPDATE studentEducation SET ';
        let params = [];

        if (name_of_university) {
            query += 'name_of_university = ?, ';
            params.push(name_of_university);
        }
        if (name_of_collage) {
            query += 'name_of_collage = ?, ';
            params.push(name_of_collage);
        }
        if (course) {
            query += 'course = ?, ';
            params.push(course);
        }
        if (branch) {
            query += 'branch = ?, ';
            params.push(branch);
        }
        if (course_duration_years) {
            query += 'course_duration_years = ?, ';
            params.push(course_duration_years);
        }
        if (current_year) {
            query += 'current_year = ?, ';
            params.push(current_year);
        }
        if (current_sem) {
            query += 'current_sem = ?, ';
            params.push(current_sem);
        }

        query = query.slice(0, -2);
        query += ' WHERE pin_number = ?';
        params.push(pin_number);

        if (params.length > 1) {
            const result = await db.query(query, params);
        }

        res.status(200).json({
            message: 'Student education data updated successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating student education data');
    }
});


// @description Update Parent Details
// @route PUT /api/updateData/updateParentDetails
// @access public
export const updateParentDetails = asyncHandler(async (req, res) => {
    try {
        const { pin_number } = req.body;
        const { father_name, father_contact_number, father_email, father_photo_url, mother_name, mother_contact_number, mother_photo_url, approval_person_name, approval_person_contact, approval_person_relation, approval_person_email } = req.body;

        let query = 'UPDATE parentDetail SET ';
        let params = [];

        if (father_name) {
            query += 'father_name = ?, ';
            params.push(father_name);
        }
        if (father_contact_number) {
            query += 'father_contact_number = ?, ';
            params.push(father_contact_number);
        }
        if (father_email) {
            query += 'father_email = ?, ';
            params.push(father_email);
        }
        if (father_photo_url) {
            query += 'father_photo_url = ?, ';
            params.push(father_photo_url);
        }
        if (mother_name) {
            query += 'mother_name = ?, ';
            params.push(mother_name);
        }
        if (mother_contact_number) {
            query += 'mother_contact_number = ?, ';
            params.push(mother_contact_number);
        }
        if (mother_photo_url) {
            query += 'mother_photo_url = ?, ';
            params.push(mother_photo_url);
        }
        if (approval_person_name) {
            query += 'approval_person_name = ?, ';
            params.push(approval_person_name);
        }
        if (approval_person_contact) {
            query += 'approval_person_contact = ?, ';
            params.push(approval_person_contact);
        }
        if (approval_person_relation) {
            query += 'approval_person_relation = ?, ';
            params.push(approval_person_relation);
        }
        if (approval_person_email) {
            query += 'approval_person_email = ?, ';
            params.push(approval_person_email);
        }

        query = query.slice(0, -2);
        query += ' WHERE pin_number = ?';
        params.push(pin_number);

        if (params.length > 1) {
            const result = await db.query(query, params);
        }

        res.status(200).json({
            message: 'Parent details updated successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating parent details');
    }
});


// @description Update Relative Details
// @route PUT /api/updateData/updateRelativeDetails
// @access public
export const updateRelativeDetails = asyncHandler(async (req, res) => {
    try {
        const { pin_number } = req.body;
        const { relative_name, relation, relative_contact_number, relative_address } = req.body;

        let query = 'UPDATE relative SET ';
        let params = [];

        if (relative_name) {
            query += 'relative_name = ?, ';
            params.push(relative_name);
        }
        if (relation) {
            query += 'relation = ?, ';
            params.push(relation);
        }
        if (relative_contact_number) {
            query += 'relative_contact_number = ?, ';
            params.push(relative_contact_number);
        }
        if (relative_address) {
            query += 'relative_address = ?, ';
            params.push(relative_address);
        }

        query = query.slice(0, -2);
        query += ' WHERE pin_number = ?';
        params.push(pin_number);

        if (params.length > 1) {
            const result = await db.query(query, params);
        }

        res.status(200).json({
            message: 'Relative details updated successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating relative details');
    }
});


// @description Update Sant Reference
// @route PUT /api/updateData/updateSantReference
// @access public
export const updateSantReference = asyncHandler(async (req, res) => {
    try {
        const { pin_number } = req.body;
        const { name_of_sant, sant_phone_number } = req.body;

        let query = 'UPDATE santReference SET ';
        let params = [];

        if (name_of_sant) {
            query += 'name_of_sant = ?, ';
            params.push(name_of_sant);
        }
        if (sant_phone_number) {
            query += 'sant_phone_number = ?, ';
            params.push(sant_phone_number);
        }

        query = query.slice(0, -2);
        query += ' WHERE pin_number = ?';
        params.push(pin_number);

        if (params.length > 1) {
            const result = await db.query(query, params);
        }

        res.status(200).json({
            message: 'Sant reference updated successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating sant reference');
    }
});


// @description Update Relative Reference
// @route PUT /api/updateData/updateRelativeReference
// @access public
export const updateRelativeReference = asyncHandler(async (req, res) => {
    try {
        const { pin_number } = req.body;
        const { full_name, relation, mobile_number } = req.body;

        let query = 'UPDATE relativeReference SET ';
        let params = [];

        if (full_name) {
            query += 'full_name = ?, ';
            params.push(full_name);
        }
        if (relation) {
            query += 'relation = ?, ';
            params.push(relation);
        }
        if (mobile_number) {
            query += 'mobile_number = ?, ';
            params.push(mobile_number);
        }

        query = query.slice(0, -2);
        query += ' WHERE pin_number = ?';
        params.push(pin_number);

        if (params.length > 1) {
            const result = await db.query(query, params);
        }

        res.status(200).json({
            message: 'Relative reference updated successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating Relative reference');
    }
});

// @description Update Room Allotment
// @route PUT /api/updateData/updateRoomAllotment
// @access public
export const updateRoomAllotment = asyncHandler(async (req, res) => {
    try {
        const { pin_number } = req.body;
        const { room_number, bed_number } = req.body;

        let query = 'UPDATE roomAllotment SET ';
        let params = [];

        if (room_number) {
            query += 'room_number = ?, ';
            params.push(room_number);
        }
        if (bed_number) {
            query += 'bed_number = ?, ';
            params.push(bed_number);
        }

        query = query.slice(0, -2);
        query += ' WHERE pin_number = ?';
        params.push(pin_number);

        if (params.length > 1) {
            const result = await db.query(query, params);
        }

        res.status(200).json({
            message: 'Room Allotment updated successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating Room Allotment');
    }
});


// ------------------------------------------------------------------------------------------------

// @description Update Student
// @route PUT /api/updateData/updateStudent
// @access public
export const updateStudent = asyncHandler(async (req, res) => {
    console.log(req.body);
    try {
        const { pin_number } = req.body;
        const {
            student_full_name, dob, nationality, religion, address, city, postal_pin_number,
            student_contact_number, student_email, student_qualification, student_photo_url
        } = req.body;

        // Dynamically build the query based on provided fields
        let queryStudentData = 'UPDATE studentData SET ';
        let paramsStudentData = [];

        if (student_full_name) {
            queryStudentData += 'student_full_name = ?, ';
            paramsStudentData.push(student_full_name);
        }
        if (dob) {
            queryStudentData += 'dob = ?, ';
            paramsStudentData.push(new Date(dob));
        }
        if (nationality) {
            queryStudentData += 'nationality = ?, ';
            paramsStudentData.push(nationality);
        }
        if (religion) {
            queryStudentData += 'religion = ?, ';
            paramsStudentData.push(religion);
        }
        if (address) {
            queryStudentData += 'address = ?, ';
            paramsStudentData.push(address);
        }
        if (city) {
            queryStudentData += 'city = ?, ';
            paramsStudentData.push(city);
        }
        if (postal_pin_number) {
            queryStudentData += 'postal_pin_number = ?, ';
            paramsStudentData.push(postal_pin_number);
        }
        if (student_contact_number) {
            queryStudentData += 'student_contact_number = ?, ';
            paramsStudentData.push(student_contact_number);
        }
        if (student_email) {
            queryStudentData += 'student_email = ?, ';
            paramsStudentData.push(student_email);
        }
        if (student_qualification) {
            queryStudentData += 'student_qualification = ?, ';
            paramsStudentData.push(student_qualification);
        }
        if (student_photo_url) {
            queryStudentData += 'student_photo_url = ?, ';
            paramsStudentData.push(student_photo_url);
        }

        // Remove the last comma and space from query
        queryStudentData = queryStudentData.slice(0, -2);
        queryStudentData += ' WHERE pin_number = ?';
        paramsStudentData.push(pin_number);

        if (paramsStudentData.length > 1) {
            const resultStudentData = await db.query(queryStudentData, paramsStudentData);
            // console.log("resultStudentData",resultStudentData);
        }

        // -----------------

        const { name_of_university, name_of_collage, course, branch, course_duration_years, current_year, current_sem } = req.body;

        let queryStudentEducation = 'UPDATE studentEducation SET ';
        let paramsStudentEducation = [];

        if (name_of_university) {
            queryStudentEducation += 'name_of_university = ?, ';
            paramsStudentEducation.push(name_of_university);
        }
        if (name_of_collage) {
            queryStudentEducation += 'name_of_collage = ?, ';
            paramsStudentEducation.push(name_of_collage);
        }
        if (course) {
            queryStudentEducation += 'course = ?, ';
            paramsStudentEducation.push(course);
        }
        if (branch) {
            queryStudentEducation += 'branch = ?, ';
            paramsStudentEducation.push(branch);
        }
        if (course_duration_years) {
            queryStudentEducation += 'course_duration_years = ?, ';
            paramsStudentEducation.push(course_duration_years);
        }
        if (current_year) {
            queryStudentEducation += 'current_year = ?, ';
            paramsStudentEducation.push(current_year);
        }
        if (current_sem) {
            queryStudentEducation += 'current_sem = ?, ';
            paramsStudentEducation.push(current_sem);
        }

        queryStudentEducation = queryStudentEducation.slice(0, -2);
        queryStudentEducation += ' WHERE pin_number = ?';
        paramsStudentEducation.push(pin_number);

        if (paramsStudentEducation.length > 1) {
            const resultStudentEducation = await db.query(queryStudentEducation, paramsStudentEducation);
            // console.log("resultStudentEducation",resultStudentEducation);
        }
        // ----------------------

        const { father_name, father_contact_number, father_email, father_photo_url, mother_name, mother_contact_number, mother_photo_url, approval_person_name, approval_person_contact, approval_person_relation, approval_person_email } = req.body;

        let queryParentsDetails = 'UPDATE parentDetail SET ';
        let paramsParentsDetails = [];

        if (father_name) {
            queryParentsDetails += 'father_name = ?, ';
            paramsParentsDetails.push(father_name);
        }
        if (father_contact_number) {
            queryParentsDetails += 'father_contact_number = ?, ';
            paramsParentsDetails.push(father_contact_number);
        }
        if (father_email) {
            queryParentsDetails += 'father_email = ?, ';
            paramsParentsDetails.push(father_email);
        }
        if (father_photo_url) {
            queryParentsDetails += 'father_photo_url = ?, ';
            paramsParentsDetails.push(father_photo_url);
        }
        if (mother_name) {
            queryParentsDetails += 'mother_name = ?, ';
            paramsParentsDetails.push(mother_name);
        }
        if (mother_contact_number) {
            queryParentsDetails += 'mother_contact_number = ?, ';
            paramsParentsDetails.push(mother_contact_number);
        }
        if (mother_photo_url) {
            queryParentsDetails += 'mother_photo_url = ?, ';
            paramsParentsDetails.push(mother_photo_url);
        }
        if (approval_person_name) {
            queryParentsDetails += 'approval_person_name = ?, ';
            paramsParentsDetails.push(approval_person_name);
        }
        if (approval_person_contact) {
            queryParentsDetails += 'approval_person_contact = ?, ';
            paramsParentsDetails.push(approval_person_contact);
        }
        if (approval_person_relation) {
            queryParentsDetails += 'approval_person_relation = ?, ';
            paramsParentsDetails.push(approval_person_relation);
        }
        if (approval_person_email) {
            queryParentsDetails += 'approval_person_email = ?, ';
            paramsParentsDetails.push(approval_person_email);
        }

        queryParentsDetails = queryParentsDetails.slice(0, -2);
        queryParentsDetails += ' WHERE pin_number = ?';
        paramsParentsDetails.push(pin_number);

        if (paramsParentsDetails.length > 1) {
            const resultParentsDetails = await db.query(queryParentsDetails, paramsParentsDetails);
        }

        // --------------------------

        const { relative_name, relation, relative_contact_number, relative_address } = req.body;

        let queryRelativeDetails = 'UPDATE relative SET ';
        let paramsRelativeDetails = [];

        if (relative_name) {
            queryRelativeDetails += 'relative_name = ?, ';
            paramsRelativeDetails.push(relative_name);
        }
        if (relation) {
            queryRelativeDetails += 'relation = ?, ';
            paramsRelativeDetails.push(relation);
        }
        if (relative_contact_number) {
            queryRelativeDetails += 'relative_contact_number = ?, ';
            paramsRelativeDetails.push(relative_contact_number);
        }
        if (relative_address) {
            queryRelativeDetails += 'relative_address = ?, ';
            paramsRelativeDetails.push(relative_address);
        }

        queryRelativeDetails = queryRelativeDetails.slice(0, -2);
        queryRelativeDetails += ' WHERE pin_number = ?';
        paramsRelativeDetails.push(pin_number);

        if (paramsRelativeDetails.length > 1) {
            const resultRelativeDetails = await db.query(queryRelativeDetails, paramsRelativeDetails);
        }
        // ---------------------

        const { name_of_sant, sant_phone_number } = req.body;

        let querySantReference = 'UPDATE santReference SET ';
        let paramsSantReference = [];

        if (name_of_sant) {
            querySantReference += 'name_of_sant = ?, ';
            paramsSantReference.push(name_of_sant);
        }
        if (sant_phone_number) {
            querySantReference += 'sant_phone_number = ?, ';
            paramsSantReference.push(sant_phone_number);
        }

        querySantReference = querySantReference.slice(0, -2);
        querySantReference += ' WHERE pin_number = ?';
        paramsSantReference.push(pin_number);

        if (paramsSantReference.length > 1) {
            const resultSantReference = await db.query(querySantReference, paramsSantReference);
        }
        // --------------------------

        const { reference_relative_full_name, reference_relative_relation, reference_relative_mobile } = req.body;

        let queryRelativeReference = 'UPDATE relativeReference SET ';
        let paramsRelativeReference = [];

        if (reference_relative_full_name) {
            queryRelativeReference += 'full_name = ?, ';
            paramsRelativeReference.push(reference_relative_full_name);
        }
        if (reference_relative_relation) {
            queryRelativeReference += 'relation = ?, ';
            paramsRelativeReference.push(reference_relative_relation);
        }
        if (reference_relative_mobile) {
            queryRelativeReference += 'mobile_number = ?, ';
            paramsRelativeReference.push(reference_relative_mobile);
        }

        queryRelativeReference = queryRelativeReference.slice(0, -2);
        queryRelativeReference += ' WHERE pin_number = ?';
        paramsRelativeReference.push(pin_number);

        if (paramsRelativeReference.length > 1) {
            const resultRelativeReference = await db.query(queryRelativeReference, paramsRelativeReference);
        }
        // ----------------

        const { room_number, bed_number } = req.body;

        let queryRoomAllotment = 'UPDATE roomAllotment SET ';
        let paramsRoomAllotment = [];

        if (room_number) {
            queryRoomAllotment += 'room_number = ?, ';
            paramsRoomAllotment.push(room_number);
        }
        if (bed_number) {
            queryRoomAllotment += 'bed_number = ?, ';
            paramsRoomAllotment.push(bed_number);
        }

        queryRoomAllotment = queryRoomAllotment.slice(0, -2);
        queryRoomAllotment += ' WHERE pin_number = ?';
        paramsRoomAllotment.push(pin_number);

        if (paramsRoomAllotment.length > 1) {
            const resultRoomAllotment = await db.query(queryRoomAllotment, paramsRoomAllotment);
        }
        res.status(200).json({
            message: 'Student updated successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating student');
    }
});
