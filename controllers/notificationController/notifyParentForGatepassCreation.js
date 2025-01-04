import asyncHandler from 'express-async-handler';
import db from '../../config/dbConnection.js';
import admin from '../../config/firebaseAdminConfig.js';

// @description send notification on gatepass creation
// @route GET+POST /api/notifications/notifyParentForGatepassCreation
// @access public
export const notifyParentForGatepassCreation = asyncHandler(
  async (req, res) => {
    try {
      const { pin_number } = req.body;

      const query = `SELECT mobile_number,token_number from "userRole" WHERE pin_number=$1 and role_id=2`;

      const result = await db.query(query, [pin_number]);

      if (result.rows.length === 0) {
        return res.status(404).send('Parent not found');
      }
      console.log(result.rows);
      for (let i = 0; i < result.rows.length; i++) {
        const deviceToken = result.rows[i].token_number;
        if (deviceToken !== null) {
          const message = {
            notification: {
              title: 'Gatepass Created',
              body: 'Gatepass Created by your son',
            },
            token: deviceToken,
          };
          await admin.messaging().send(message);
        }
      }
      res.status(200).send('Message sent sucessfully');
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
);
