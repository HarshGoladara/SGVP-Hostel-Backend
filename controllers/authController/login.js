import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';
import otpGenerator from 'otp-generator';
// import {
//   TWILIO_ACCOUNT_SID,
//   TWILIO_AUTH_TOKEN,
//   TWILIO_PHONE_NUMBER,
// } from '../../config/envConfig.js';
// import twilio from 'twilio';

// @description Login and send OTP
// @route POST /api/auth/login
// @access public
export const login = asyncHandler(async (req, res) => {
  try {
    const { mobile_number, phone } = req.body;

    console.log(phone);

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

    // ----------------------sms otp sending logic start-----------------------------------------

    // // Twilio credentials (use environment variables for security)
    // const accountSid = TWILIO_ACCOUNT_SID; // Your Twilio Account SID
    // const authToken = TWILIO_AUTH_TOKEN; // Your Twilio Auth Token
    // const twilioPhoneNumber = TWILIO_PHONE_NUMBER; // Your Twilio Phone Number

    // const client = twilio(accountSid, authToken);

    // // Send OTP via SMS using Twilio
    // const message = await client.messages.create({
    //   body: `SGVP sent you an OTP, Your OTP is: ${otp}. It is valid for 5 minutes.`,
    //   from: twilioPhoneNumber,
    //   to: `+${phone}${mobile_number}`, // Ensure mobile_number includes the country code
    // });

    // console.log(message);

    // ----------------------sms otp sending logic end-----------------------------------------

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
