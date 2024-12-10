import express from 'express';
const router = express.Router();
// import {addParentsDetails,addRelativeDetails,addSantReference,addStudentData,addStudentEducation,addRelativeReference,assignRoom,addStudent} from '../controllers/admissionController.js';
import { addStudentData } from '../controllers/admissionController/addStudentData.js';
import { addStudentEducation } from '../controllers/admissionController/addStudentEducation.js';
import { addParentsDetails } from '../controllers/admissionController/addParentsDetails.js';
import { addRelativeDetails } from '../controllers/admissionController/addRelativeDetails.js';
import { addSantReference } from '../controllers/admissionController/addSantReference.js';
import { addRelativeReference } from '../controllers/admissionController/addRelativeReference.js';
import { assignRoom } from '../controllers/admissionController/assignRoom.js';
import { addStudent } from '../controllers/admissionController/addStudent.js';
import { tempAddStudentDetails } from '../controllers/admissionController/tempAddStudentDetails.js';

// router.route("/studentDetails").get(studentDetails);//for fetching all the student info from database
// router.route("/studentDetailsByPinNumber").get(studentDetailsByPinNumber);//for fetching all the student info from database

router.route('/addStudentData').post(addStudentData);
router.route('/addStudentEducation').post(addStudentEducation);
router.route('/addParentsdetails').post(addParentsDetails);
router.route('/addRelativeDetails').post(addRelativeDetails);
router.route('/addSantReference').post(addSantReference);
router.route('/addRelativeReference').post(addRelativeReference);
router.route('/assignRoom').post(assignRoom);
router.route('/addStudent').post(addStudent);
router.route('/tempAddStudentDetails').post(tempAddStudentDetails);

// update and delete apis are yet to be implemented.
export default router;
