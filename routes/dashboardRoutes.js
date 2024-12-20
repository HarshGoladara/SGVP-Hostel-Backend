import express from 'express';
const router = express.Router();

import { getTotalStudents } from '../controllers/dashboardController/getTotalStudents.js';
import { getPendingAdmission } from '../controllers/dashboardController/getPendingAdmission.js';
import { getIncomingStudents } from '../controllers/dashboardController/getIncomingStudents.js';
import { getOutgoingStudents } from '../controllers/dashboardController/getOutgoingStudents.js';
import { getActiveGatepasses } from '../controllers/dashboardController/getActiveGatepasses.js';
import { getPendingEntries } from '../controllers/dashboardController/getPendingEntries.js';
import { getEventsList } from '../controllers/dashboardController/getEventsList.js';
import { addEvent } from '../controllers/dashboardController/addEvent.js';
import { updateEvent } from '../controllers/dashboardController/updateEvent.js';
import { deleteEvent } from '../controllers/dashboardController/deleteEvent.js';

router.route('/getTotalStudents').get(getTotalStudents);
router.route('/getPendingAdmission').get(getPendingAdmission);
router.route('/getIncomingStudents').get(getIncomingStudents);
router.route('/getOutgoingStudents').get(getOutgoingStudents);
router.route('/getActiveGatepasses').get(getActiveGatepasses);
router.route('/getPendingEntries').get(getPendingEntries);
router.route('/getEventsList').get(getEventsList);
router.route('/addEvent').post(addEvent);
router.route('/updateEvent').put(updateEvent);
router.route('/deleteEvent').delete(deleteEvent);

export default router;
