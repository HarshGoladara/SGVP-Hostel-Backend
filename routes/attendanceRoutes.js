import express from 'express';
const router = express.Router();

import { addMorningAttendance } from '../controllers/attendanceController/morningAttendanceController/addMorningAttendance.js';
import { addEveningAttendance } from '../controllers/attendanceController/eveningAttendanceController/addEveningAttendance.js';
import { addNightAttendance } from '../controllers/attendanceController/nightAttendanceController/addNightAttendance.js';
import { addSundayAttendance } from '../controllers/attendanceController/sundayAttendanceController/addSundayAttendance.js';

import { getTotalStudents } from '../controllers/attendanceController/getTotalStudents.js';
import { getMorningAttendance } from '../controllers/attendanceController/morningAttendanceController/getMorningAttendance.js';
import { getEveningAttendance } from '../controllers/attendanceController/eveningAttendanceController/getEveningAttendance.js';
import { getNightAttendance } from '../controllers/attendanceController/nightAttendanceController/getNightAttendance.js';
import { getSundayAttendance } from '../controllers/attendanceController/sundayAttendanceController/getSundayAttendance.js';

router.route('/addMorningAttendance').post(addMorningAttendance); //for fetching all the student info from database
router.route('/addEveningAttendance').post(addEveningAttendance); //for fetching all the student info from database
router.route('/addNightAttendance').post(addNightAttendance); //for fetching all the student info from database
router.route('/addSundayAttendance').post(addSundayAttendance); //for fetching all the student info from database

router.route('/getTotalStudents').get(getTotalStudents); //for fetching all the student info from database
router.route('/getMorningAttendance').get(getMorningAttendance); //for fetching all the student info from database
router.route('/getEveningAttendance').get(getEveningAttendance); //for fetching all the student info from database
router.route('/getNightAttendance').get(getNightAttendance); //for fetching all the student info from database
router.route('/getSundayAttendance').get(getSundayAttendance); //for fetching all the student info from database

export default router;
