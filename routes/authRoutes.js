import express from 'express';
const router = express.Router();

import { login } from '../controllers/authController/login.js';
import { otpVerification } from '../controllers/authController/otpVerification.js';
import { emailLogin } from '../controllers/authController/emailLogin.js';

router.route('/login').post(login);
router.route('/otpVerification').post(otpVerification);
router.route('/emailLogin').post(emailLogin);

export default router;
