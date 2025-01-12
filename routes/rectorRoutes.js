import express from 'express';
const router = express.Router();

import { getRector } from '../controllers/rectorController/getRector.js';
import { addRector } from '../controllers/rectorController/addRector.js';
import { updateRector } from '../controllers/rectorController/updateRector.js';
import { deleteRector } from '../controllers/rectorController/deleteRector.js';

router.route('/getRector').get(getRector);
router.route('/addRector').post(addRector);
router.route('/updateRector').put(updateRector);
router.route('/deleteRector').delete(deleteRector);

export default router;
