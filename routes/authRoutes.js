import express from 'express';
const router = express.Router();

import { login } from '../controllers/authController/login.js';
import { otpVerification } from '../controllers/authController/otpVerification.js';

router.route('/login').post(login);
router.route('/otpVerification').post(otpVerification);

export default router;
