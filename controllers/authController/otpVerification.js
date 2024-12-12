import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';

// @description Verify OTP and fetch role/credentials
// @route POST /api/auth/otpVerification
// @access public
export const otpVerification = asyncHandler(async (req, res) => {
  try {
    const { mobile_number, otp } = req.body;

    if (!mobile_number || !otp) {
      return res
        .status(400)
        .json({ message: 'Mobile number and OTP are required' });
    }

    // Verify OTP
    const query = `
        SELECT otp, created_at
        FROM "otpTable"
        WHERE mobile_number = $1
      `;
    const result = await db.query(query, [mobile_number]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mobile number not found' });
    }

    const { otp: storedOtp, created_at } = result.rows[0];

    // console.log(otp);//input otp
    // console.log(storedOtp);//database otp;

    const currentTime = new Date();

    // Check if OTP matches and is within the 5-minute validity
    if (
      parseInt(storedOtp) !== parseInt(otp) ||
      (currentTime - new Date(created_at)) / 60000 > 5
    ) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Fetch user role and credentials
    const roleQuery = `
        SELECT r.role_id, r.role_name, r.gatepass_approval_credential, r.gatepass_creation_credential,
               r.attendace_marking_credential, r.room_allotment_credential, r.admission_credential
        FROM "userRole" ur
        INNER JOIN "rolesAndCredentials" r ON ur.role_id = r.role_id
        WHERE ur.mobile_number = $1
      `;
    const roleResult = await db.query(roleQuery, [mobile_number]);

    if (roleResult.rows.length === 0) {
      return res.status(404).json({ message: 'Role not found for this user' });
    }

    res.status(200).json({
      message: 'Login successful',
      data: roleResult.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error verifying OTP');
  }
});
