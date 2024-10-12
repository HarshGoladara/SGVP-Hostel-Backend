import express from 'express';
const router = express.Router();
import {studentDetails,studentDetailsByPinNumber} from '../controllers/studentController.js';


router.route("/studentDetails").get(studentDetails);//for fetching all the student info from database
router.route("/studentDetailsByPinNumber").get(studentDetailsByPinNumber);//for fetching all the student info from database

// edit details apis are yet to be implemented

export default router;