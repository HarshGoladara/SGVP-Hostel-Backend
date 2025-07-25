import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';
import upload from '../../config/multerConfig.js';

// @description Update Parent Details
// @route PUT /api/updateData/updateParentDetails
// @access public
export const updateParentDetails = asyncHandler(async (req, res) => {
  try {
    upload.fields([
      { name: 'father_profile_update_photo', maxCount: 1 },
      { name: 'mother_profile_update_photo', maxCount: 1 },
    ])(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
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

      // Get file paths from Multer
      const father_photo_update_url = req.files['father_profile_update_photo']
        ? req.files['father_profile_update_photo'][0].path
        : null;
      const mother_photo_update_url = req.files['mother_profile_update_photo']
        ? req.files['mother_profile_update_photo'][0].path
        : null;

      let query = 'UPDATE "parentDetail" SET ';
      const params = [];
      let paramIndex = 1;

      if (father_name) {
        query += `father_name = $${paramIndex}, `;
        params.push(father_name);
        paramIndex++;
      }
      if (father_contact_number) {
        query += `father_contact_number = $${paramIndex}, `;
        params.push(father_contact_number);
        paramIndex++;
      }
      if (father_email) {
        query += `father_email = $${paramIndex}, `;
        params.push(father_email);
        paramIndex++;
      }
      if (father_photo_url) {
        query += `father_photo_url = $${paramIndex}, `;
        params.push(father_photo_url);
        paramIndex++;
      } else if (req.files['father_profile_update_photo']) {
        query += `father_photo_url = $${paramIndex}, `;
        params.push(father_photo_update_url);
        paramIndex++;
      }

      if (mother_name) {
        query += `mother_name = $${paramIndex}, `;
        params.push(mother_name);
        paramIndex++;
      }
      if (mother_contact_number) {
        query += `mother_contact_number = $${paramIndex}, `;
        params.push(mother_contact_number);
        paramIndex++;
      }
      if (mother_photo_url) {
        query += `mother_photo_url = $${paramIndex}, `;
        params.push(mother_photo_url);
        paramIndex++;
      } else if (req.files['mother_profile_update_photo']) {
        query += `mother_photo_url = $${paramIndex}, `;
        params.push(mother_photo_update_url);
        paramIndex++;
      }

      if (approval_person_name) {
        query += `approval_person_name = $${paramIndex}, `;
        params.push(approval_person_name);
        paramIndex++;
      }
      if (approval_person_contact) {
        query += `approval_person_contact = $${paramIndex}, `;
        params.push(approval_person_contact);
        paramIndex++;
      }
      if (approval_person_relation) {
        query += `approval_person_relation = $${paramIndex}, `;
        params.push(approval_person_relation);
        paramIndex++;
      }
      if (approval_person_email) {
        query += `approval_person_email = $${paramIndex}, `;
        params.push(approval_person_email);
        paramIndex++;
      }

      // Remove trailing comma and space, and add WHERE clause
      query = query.slice(0, -2);
      query += ` WHERE pin_number = $${paramIndex}`;
      params.push(pin_number);

      if (params.length > 1) {
        await db.query(query, params);
      }

      res.status(200).json({
        message: 'Parent details updated successfully',
        father_photo_url: req.files['father_profile_update_photo']
          ? father_photo_update_url
          : father_photo_url,
        mother_photo_url: req.files['mother_profile_update_photo']
          ? mother_photo_update_url
          : mother_photo_url,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating parent details');
  }
});
