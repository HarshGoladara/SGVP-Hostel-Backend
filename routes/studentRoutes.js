import express from 'express';
const router = express.Router();
// import {studentDetails,studentDetailsByPinNumber} from '../controllers/studentController.js';
import { studentDetails } from '../controllers/studentController/studentDetails.js';
import { studentDetailsByPinNumber } from '../controllers/studentController/studentDetailsByPinNumber.js';
import { studentDetailsByName } from '../controllers/studentController/studentDetailsByName.js';
import { getAlumni } from '../controllers/studentController/getAlumni.js';
import { addAlumni } from '../controllers/studentController/addAlumni.js';
import { getStudentDetails } from '../controllers/studentController/getStudentDetails.js';

router.route('/getStudentDetails').get(getStudentDetails); //for fetching all the student info from database
router.route('/studentDetails').get(studentDetails); //for fetching all the student info from database
router.route('/studentDetailsByPinNumber').get(studentDetailsByPinNumber); //for fetching all the student info from database
router.route('/studentDetailsByName').get(studentDetailsByName); //for fetching all the student info from database
router.route('/getAlumni').get(getAlumni);
router.route('/addAlumni').post(addAlumni);

export default router;
