import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Update Parent Details
// @route PUT /api/updateData/updateParentDetails
// @access public
export const updateParentDetails = asyncHandler(async (req, res) => {
  try {
    const { pin_number } = req.body;
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

    let query = 'UPDATE "parentDetail" SET ';
    const params = [];

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
      await db.query(query, params);
    }

    res.status(200).json({
      message: 'Parent details updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating parent details');
  }
});
