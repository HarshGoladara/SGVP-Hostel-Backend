import express from 'express';
const router = express.Router();
// import { updateStudent,updateStudentData, updateStudentEducation, updateParentDetails, updateRelativeDetails, updateSantReference, updateRelativeReference, updateRoomAllotment } from '../controllers/updateDataController.js';
import { updateStudent } from '../controllers/updateDataController/updateStudent.js';
import { updateStudentData } from '../controllers/updateDataController/updateStudentData.js';
import { updateStudentEducation } from '../controllers/updateDataController/updateStudentEducation.js';
import { updateParentDetails } from '../controllers/updateDataController/updateParentDetails.js';
import { updateRelativeDetails } from '../controllers/updateDataController/updateRelativeDetails.js';
import { updateSantReference } from '../controllers/updateDataController/updateSantReference.js';
import { updateRelativeReference } from '../controllers/updateDataController/updateRelativeReference.js';
import { updateRoomAllotment } from '../controllers/updateDataController/updateRoomAllotment.js';

router.route('/updateStudentData').put(updateStudentData);
router.route('/updateStudentEducation').put(updateStudentEducation);
router.route('/updateParentDetails').put(updateParentDetails);
router.route('/updateRelativeDetails').put(updateRelativeDetails);
router.route('/updateSantReference').put(updateSantReference);
router.route('/updateRelativeReference').put(updateRelativeReference);
router.route('/updateRoomAllotment').put(updateRoomAllotment);

router.route('/updateStudent').put(updateStudent);

export default router;
