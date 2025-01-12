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

import { getMorningAttendanceTable } from '../controllers/attendanceController/morningAttendanceController/getMorningAttendanceTable.js';
import { getEveningAttendanceTable } from '../controllers/attendanceController/eveningAttendanceController/getEveningAttendanceTable.js';
import { getNightAttendanceTable } from '../controllers/attendanceController/nightAttendanceController/getNightAttendanceTable.js';
import { getSundayAttendanceTable } from '../controllers/attendanceController/sundayAttendanceController/getSundayAttendanceTable.js';

router.route('/addMorningAttendance').post(addMorningAttendance);
router.route('/addEveningAttendance').post(addEveningAttendance);
router.route('/addNightAttendance').post(addNightAttendance);
router.route('/addSundayAttendance').post(addSundayAttendance);

router.route('/getTotalStudents').get(getTotalStudents);
router.route('/getMorningAttendance').get(getMorningAttendance);
router.route('/getEveningAttendance').get(getEveningAttendance);
router.route('/getNightAttendance').get(getNightAttendance);
router.route('/getSundayAttendance').get(getSundayAttendance);

router.route('/getMorningAttendanceTable').get(getMorningAttendanceTable);
router.route('/getEveningAttendanceTable').get(getEveningAttendanceTable);
router.route('/getNightAttendanceTable').get(getNightAttendanceTable);
router.route('/getSundayAttendanceTable').get(getSundayAttendanceTable);

export default router;
