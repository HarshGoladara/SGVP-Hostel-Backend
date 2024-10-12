import express from 'express';
const router = express.Router();
import { addGatepassForParentApproval,getGatepassForParentApproval,updateParentApproval,deleteGatepassFromParent,addGatepassForAdminApproval,getGatepassForAdminApproval,updateAdminApproval,deleteGatepassFromAdmin,addGatepassInArchived,getGatepassFromArchived } from '../controllers/gatepassController.js';

router.route("/addGatepassForParentApproval").post(addGatepassForParentApproval);
router.route("/getGatepassForParentApproval").get(getGatepassForParentApproval);
router.route("/updateParentApproval").put(updateParentApproval);
router.route("/deleteGatepassFromParent").delete(deleteGatepassFromParent);

router.route("/addGatepassForAdminApproval").post(addGatepassForAdminApproval);
router.route("/getGatepassForAdminApproval").get(getGatepassForAdminApproval);
router.route("/updateAdminApproval").put(updateAdminApproval);
router.route("/deleteGatepassFromAdmin").delete(deleteGatepassFromAdmin);

router.route("/addGatepassInArchived").post(addGatepassInArchived);
router.route("/getGatepassFromArchived").get(getGatepassFromArchived);

export default router;