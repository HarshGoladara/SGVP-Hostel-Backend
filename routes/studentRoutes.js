import express from 'express';
const router = express.Router();
// import {studentDetails,studentDetailsByPinNumber} from '../controllers/studentController.js';
import { studentDetails } from '../controllers/studentController/studentDetails.js';
import { studentDetailsByPinNumber } from '../controllers/studentController/studentDetailsByPinNumber.js';
import { studentDetailsByName } from '../controllers/studentController/studentDetailsByName.js';

router.route('/studentDetails').get(studentDetails); //for fetching all the student info from database
router.route('/studentDetailsByPinNumber').get(studentDetailsByPinNumber); //for fetching all the student info from database
router.route('/studentDetailsByName').get(studentDetailsByName); //for fetching all the student info from database

export default router;
