import express from 'express';
const router = express.Router();
// import { addGatepassForParentApproval,getGatepassForParentApproval,updateParentApproval,deleteGatepassFromParent,addGatepassForAdminApproval,getGatepassForAdminApproval,updateAdminApproval,deleteGatepassFromAdmin,addGatepassInArchived,getGatepassFromArchived } from '../controllers/gatepassController.js';
import { addGatepassForParentApproval } from '../controllers/gatepassController/parentApproval/addGatepassForParentApproval.js';
import { getGatepassForParentApproval } from '../controllers/gatepassController/parentApproval/getGatepassForParentApproval.js';
import { updateParentApproval } from '../controllers/gatepassController/parentApproval/updateParentApproval.js';
import { deleteGatepassFromParent } from '../controllers/gatepassController/parentApproval/deleteGatepassFromParent.js';

import { addGatepassForAdminApproval } from '../controllers/gatepassController/adminApproval/addGatepassForAdminApproval.js';
import { getGatepassForAdminApproval } from '../controllers/gatepassController/adminApproval/getGatepassForAdminApproval.js';
import { updateAdminApproval } from '../controllers/gatepassController/adminApproval/updateAdminApproval.js';
import { deleteGatepassFromAdmin } from '../controllers/gatepassController/adminApproval/deleteGatepassFromAdmin.js';
import { updateStatusToParentApprove } from '../controllers/gatepassController/parentApproval/updateStatusToParentApprove.js';
import { addGatepassInArchived } from '../controllers/gatepassController/archived/addGatepassInArchived.js';
import { getGatepassFromArchived } from '../controllers/gatepassController/archived/getGatepassFromArchived.js';
import { updateStatusToParentDisapprove } from '../controllers/gatepassController/parentApproval/updateStatusToParentDisapprove.js';

router
  .route('/addGatepassForParentApproval')
  .post(addGatepassForParentApproval);
router.route('/getGatepassForParentApproval').get(getGatepassForParentApproval);
router.route('/updateParentApproval').put(updateParentApproval);
router.route('/deleteGatepassFromParent').delete(deleteGatepassFromParent);
router.route('/updateStatusToParentApprove').put(updateStatusToParentApprove);
router
  .route('/updateStatusToParentDisapprove')
  .put(updateStatusToParentDisapprove);

router.route('/addGatepassForAdminApproval').post(addGatepassForAdminApproval);
router.route('/getGatepassForAdminApproval').get(getGatepassForAdminApproval);
router.route('/updateAdminApproval').put(updateAdminApproval);
router.route('/deleteGatepassFromAdmin').delete(deleteGatepassFromAdmin);

router.route('/addGatepassInArchived').post(addGatepassInArchived);
router.route('/getGatepassFromArchived').get(getGatepassFromArchived);

export default router;
