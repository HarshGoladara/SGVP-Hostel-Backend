import express from 'express';
const router = express.Router();

import { getStudentPagination } from '../controllers/paginationContoller/getStudentPagination.js';
import { getTempStudentPagination } from '../controllers/paginationContoller/getTempStudentPagination.js';
import { getGatepassPagination } from '../controllers/paginationContoller/getGatepassPagination.js';
import { getArchivedGatepassPagination } from '../controllers/paginationContoller/getArchivedGatepassPagination.js';
import { getAlumniPagination } from '../controllers/paginationContoller/getAlumniPagination.js';

router.route('/getStudentPagination').get(getStudentPagination); //for fetching all the student info from database
router.route('/getTempStudentPagination').get(getTempStudentPagination); //for fetching all the student info from database
router.route('/getGatepassPagination').get(getGatepassPagination); //for fetching all the student info from database
router
  .route('/getArchivedGatepassPagination')
  .get(getArchivedGatepassPagination); //for fetching all the student info from database
router.route('/getAlumniPagination').get(getAlumniPagination); //for fetching all the student info from database

export default router;
