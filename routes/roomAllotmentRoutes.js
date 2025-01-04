import express from 'express';
const router = express.Router();

import { getRoomAllotment } from '../controllers/roomAllotmentController/getRoomAllotment.js';
import { assignRoom } from '../controllers/roomAllotmentController/assignRoom.js';
import { updateRoomAllotment } from '../controllers/roomAllotmentController/updateRoomAllotment.js';
import { getRooms } from '../controllers/roomAllotmentController/getRooms.js';
import { addRoom } from '../controllers/roomAllotmentController/addRoom.js';
import { addBed } from '../controllers/roomAllotmentController/addBed.js';
import { deleteBed } from '../controllers/roomAllotmentController/deleteBed.js';
import { deleteRoom } from '../controllers/roomAllotmentController/deleteRoom.js';
import { deAllocateRoomAndBed } from '../controllers/roomAllotmentController/deAllocateRoomAndBed.js';

router.route('/getRoomAllotment').get(getRoomAllotment);
router.route('/assignRoom').post(assignRoom);
router.route('/updateRoomAllotment').put(updateRoomAllotment);
router.route('/getRooms').get(getRooms);
router.route('/addRoom').post(addRoom);
router.route('/addBed').post(addBed);
router.route('/deleteBed').delete(deleteBed);
router.route('/deleteRoom').delete(deleteRoom);
router.route('/deAllocateRoomAndBed').delete(deAllocateRoomAndBed);

export default router;
