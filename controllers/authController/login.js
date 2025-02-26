import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';
import otpGenerator from 'otp-generator';
import axios from 'axios';
import { AUTHKEY, TEMPLATE_ID } from '../../config/envConfig.js';

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

    const recieverPhone = phone[0] === '+' ? phone.slice(1) : phone;

    // ----------------------sms otp sending logic USING TWILIO start-----------------------------------------

    // // Twilio credentials (use environment variables for security)
    // const accountSid = TWILIO_ACCOUNT_SID; // Your Twilio Account SID
    // const authToken = TWILIO_AUTH_TOKEN; // Your Twilio Auth Token
    // const twilioPhoneNumber = TWILIO_PHONE_NUMBER; // Your Twilio Phone Number

    // const client = twilio(accountSid, authToken);

    // // Send OTP via SMS using Twilio
    // const message = await client.messages.create({
    //   body: `SGVP sent you an OTP, Your OTP is: ${otp}. It is valid for 5 minutes.`,
    //   from: twilioPhoneNumber,
    //   to: `+${recieverPhone}${mobile_number}`, // Ensure mobile_number includes the country code
    // });

    // console.log(message);

    // ----------------------sms otp sending logic USING TWILIO end-----------------------------------------

    // -----------------------sgvp sms service code start----------------------------
    const tataTelecomConfig = {
      method: 'post',
      url: 'https://control.msg91.com/api/v5/flow', // Replace with actual Tata Telecom API endpoint
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        authkey: `${AUTHKEY}`, // Replace with your Tata Telecom API auth token
      },
      data: {
        template_id: `${TEMPLATE_ID}`,
        short_url: '1 (On) or 0 (Off)',
        short_url_expiry: 'Seconds (Optional)',
        realTimeResponse: '1 (Optional)',
        recipients: [
          {
            mobiles: `${recieverPhone}${mobile_number}`,
            otp: `${otp}`,
          },
        ],
      },
    };

    // Send OTP via Tata Telecom SMS API
    const response = await axios(tataTelecomConfig);

    console.log('SMS Response:', response.data);
    // -----------------------sgvp sms service code end----------------------------

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
