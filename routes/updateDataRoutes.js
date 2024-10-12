import express from 'express';
const router = express.Router();
import { updateStudent,updateStudentData, updateStudentEducation, updateParentDetails, updateRelativeDetails, updateSantReference, updateRelativeReference, updateRoomAllotment } from '../controllers/updateDataController.js';

router.route("/updateStudentData").put(updateStudentData);
router.route("/updateStudentEducation").put(updateStudentEducation);
router.route("/updateParentDetails").put(updateParentDetails);
router.route("/updateRelativeDetails").put(updateRelativeDetails);
router.route("/updateSantReference").put(updateSantReference);
router.route("/updateRelativeReference").put(updateRelativeReference);
router.route("/updateRoomAllotment").put(updateRoomAllotment);

router.route("/updateStudent").put(updateStudent);

export default router;