import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Login via email
// @route POST /api/auth/emailLogin
// @access public
export const emailLogin = asyncHandler(async (req, res) => {
  try {
    const { email_id } = req.body;

    const query = `SELECT ri.rector_id,ri.name,ri.email_id,ri.mobile_number,r.role_id, r.role_name, r.gatepass_approval_credential, r.gatepass_creation_credential,
               r.attendace_marking_credential, r.room_allotment_credential, r.admission_credential,r.can_grant_access
               FROM "rectorInfo" ri
               INNER JOIN "rolesAndCredentials" r ON ri.role_id = r.role_id
               WHERE ri.email_id = $1`;

    const result = await db.query(query, [email_id]);
    if (result.rows.length === 0) {
      res.status(400).send({
        message: "User doesn't exist",
      });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    res.send(error.message);
  }
});
