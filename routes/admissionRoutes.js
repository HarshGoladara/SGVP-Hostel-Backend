import express from 'express';
const router = express.Router();
import {addParentsDetails,addRelativeDetails,addSantReference,addStudentData,addStudentEducation,addRelativeReference,assignRoom,addStudent} from '../controllers/admissionController.js';


// router.route("/studentDetails").get(studentDetails);//for fetching all the student info from database
// router.route("/studentDetailsByPinNumber").get(studentDetailsByPinNumber);//for fetching all the student info from database

router.route("/addParentsdetails").post(addParentsDetails);
router.route("/addRelativeDetails").post(addRelativeDetails);
router.route("/addSantReference").post(addSantReference);
router.route("/addStudentData").post(addStudentData);
router.route("/addStudentEducation").post(addStudentEducation);
router.route("/addRelativeReference").post(addRelativeReference);
router.route("/assignRoom").post(assignRoom);

router.route("/addStudent").post(addStudent);

// update and delete apis are yet to be implemented.
export default router;