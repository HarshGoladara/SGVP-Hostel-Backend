import express from 'express';
const router = express.Router();

import { addMorningAttendance } from '../controllers/attendanceController/morningAttendanceController/addMorningAttendance.js';
import { addEveningAttendance } from '../controllers/attendanceController/morningAttendanceController/addEveningAttendance.js';
import { addNightAttendance } from '../controllers/attendanceController/morningAttendanceController/addNightAttendance.js';
import { addSundayAttendance } from '../controllers/attendanceController/morningAttendanceController/addSundayAttendance.js';

router.route('/addMorningAttendance').post(addMorningAttendance); //for fetching all the student info from database
router.route('/addEveningAttendance').post(addEveningAttendance); //for fetching all the student info from database
router.route('/addNightAttendance').post(addNightAttendance); //for fetching all the student info from database
router.route('/addSundayAttendance').post(addSundayAttendance); //for fetching all the student info from database

export default router;
