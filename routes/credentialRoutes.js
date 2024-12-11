import express from 'express';
const router = express.Router();

import { getRolesAndCredentials } from '../controllers/credentialController/rolesAndCredentialsController/getRolesAndCredentials.js';
import { addRolesAndCredentials } from '../controllers/credentialController/rolesAndCredentialsController/addRolesAndCredentials.js';
import { updateRolesAndCredentials } from '../controllers/credentialController/rolesAndCredentialsController/updateRolesAndCredentials.js';
import { deleteRolesAndCredentials } from '../controllers/credentialController/rolesAndCredentialsController/deleteRolesAndCredentials.js';

import { getUserRole } from '../controllers/credentialController/userRoleController/getUserRole.js';
import { addUserRole } from '../controllers/credentialController/userRoleController/addUserRole.js';
import { updateUserRole } from '../controllers/credentialController/userRoleController/updateUserRole.js';
import { deleteUserRole } from '../controllers/credentialController/userRoleController/deleteUserRole.js';

router.route('/getRolesAndCredentials').get(getRolesAndCredentials);
router.route('/addRolesAndCredentials').post(addRolesAndCredentials);
router.route('/updateRolesAndCredentials').put(updateRolesAndCredentials);
router.route('/deleteRolesAndCredentials').delete(deleteRolesAndCredentials);

router.route('/getUserRole').get(getUserRole);
router.route('/addUserRole').post(addUserRole);
router.route('/updateUserRole').put(updateUserRole);
router.route('/deleteUserRole').delete(deleteUserRole);

export default router;
