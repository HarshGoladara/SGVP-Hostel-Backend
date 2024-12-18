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
import { deleteStudentFromTemp } from '../controllers/admissionController/deleteStudentFromTemp.js';
import { getTempStudentDetails } from '../controllers/admissionController/getTempStudentDetails.js';
import { confirmAdmission } from '../controllers/admissionController/confirmAdmission.js';
import { cancelAdmission } from '../controllers/admissionController/cancelAdmission.js';
import { addRector } from '../controllers/admissionController/addRector.js';

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
router.route('/getTempStudentDetails').get(getTempStudentDetails);
router.route('/deleteStudentFromTemp').delete(deleteStudentFromTemp);
router.route('/confirmAdmission').post(confirmAdmission);
router.route('/cancelAdmission').post(cancelAdmission);
router.route('/addRector').post(addRector);

// update and delete apis are yet to be implemented.
export default router;
