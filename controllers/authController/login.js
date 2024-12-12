import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';
import otpGenerator from 'otp-generator';

// @description Login and send OTP
// @route POST /api/auth/login
// @access public
export const login = asyncHandler(async (req, res) => {
  try {
    const { mobile_number } = req.body;

    if (!mobile_number) {
      return res.status(400).json({ message: 'Mobile number is required' });
    }

    // Generate a 4-digit OTP
    const otp = otpGenerator.generate(4, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });

    // Save OTP and timestamp in database
    const query = `
        INSERT INTO "otpTable" (mobile_number, otp, created_at)
        VALUES ($1, $2, NOW())
        ON CONFLICT (mobile_number) DO UPDATE
        SET otp = $2, created_at = NOW()
      `;
    await db.query(query, [mobile_number, otp]);

    // Simulate sending OTP (Replace this with actual SMS sending logic)
    console.log(`OTP for ${mobile_number}: ${otp}`);

    res.status(200).json({
      message: 'OTP sent successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating OTP');
  }
});
