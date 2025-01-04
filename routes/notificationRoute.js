import express from 'express';
import { notifyParentForGatepassCreation } from '../controllers/notificationController/notifyParentForGatepassCreation.js';
import { registerMobileToken } from '../controllers/notificationController/registerMobileToken.js';
const router = express.Router();

router.route('/registerMobileToken').post(registerMobileToken);
router
  .route('/notifyParentForGatepassCreation')
  .post(notifyParentForGatepassCreation);

export default router;
