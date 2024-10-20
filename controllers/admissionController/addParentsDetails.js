import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

//@decription add parent details in database
//@route POST /api/admission/addParentsDetails
//@access public

export const addParentsDetails = asyncHandler(async (req, res) => {
  try {
    const {
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
    } = req.body;
    const query = `
            INSERT INTO parentDetail (
                pin_number, father_name, father_contact_number, father_email, father_photo_url, 
                mother_name, mother_contact_number, mother_photo_url, approval_person_name, approval_person_contact, approval_person_relation, approval_person_email
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    await db.query(query, [
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

    res.status(201).json({
      message: 'Parents details added successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error adding parent details:- ${error.sqlMessage}`);
  }
});
