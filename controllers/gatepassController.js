// import asyncHandler from 'express-async-handler';
// import db from '../config/dbConnection.js'

// // @description Add new GatePass for parent approval
// // @route POST /api/gatepass/addGatepassForParentApproval
// // @access public

// export const addGatepassForParentApproval = asyncHandler(async (req, res) => {
//     try {
//         const { pin_number, outgoing_timestamp, permission_upto_timestamp, reason } = req.body;

//         if (!pin_number || !outgoing_timestamp || !permission_upto_timestamp || !reason) {
//             return res.status(400).json({ error: 'Missing required fields' });
//         }

//         const query = `
//             INSERT INTO parentApprovalProcessGatepass
//             (pin_number, outgoing_timestamp, permission_upto_timestamp, reason)
//             VALUES (?, ?, ?, ?)
//         `;

//          await db.query(query, [
//             pin_number,
//             outgoing_timestamp,
//             permission_upto_timestamp,
//             reason
//         ]);

//         res.status(201).json({
//             message: 'Gatepass created successfully',
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Error adding gatepass data');
//     }
// });

// // @description get GatePass for parent approval
// // @route get /api/gatepass/getGatepassForParentApproval
// // @access public

// export const getGatepassForParentApproval = asyncHandler(async (req, res) => {
//     try {
//         const { gatepass_number, pin_number } = req.query;

//         let query = 'SELECT * FROM parentApprovalProcessGatepass';
//         const params = [];

//         if (gatepass_number) {
//             query += ' WHERE gatepass_number = ?';
//             params.push(gatepass_number);
//         } else if (pin_number) {
//             query += ' WHERE pin_number = ?';
//             params.push(pin_number);
//         }

//         db.query(query, params);

//         res.status(201).json({
//             message: 'Gatepass fetched from Parent successfully',
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Error fetching gatepass data');
//     }
// });

// // @description Update gatepass by parent
// // @route PUT api/gatepass/updateParentApproval
// // @access public
// export const updateParentApproval = asyncHandler(async (req, res) => {
//     try {
//         const { gatepass_number, status, remarks } = req.body;

//         // Dynamically build the query based on provided fields
//         let query = 'UPDATE parentApprovalProcessGatepass SET ';
//         let params = [];

//         if (status) {
//             query += 'status = ?, ';
//             params.push(status);
//         }
//         if (remarks) {
//             query += 'remarks = ?, ';
//             params.push(remarks);
//         }

//         // Remove the last comma and space from query
//         query = query.slice(0, -2);
//         query += ' WHERE gatepass_number = ?';
//         params.push(gatepass_number);

//         if (params.length > 1) {
//             const result = await db.query(query, params);
//         }
//         res.status(200).json({
//             message: 'Parent Updated Gatepass successfully',
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Error Updating Gatepass');
//     }
// });

// // @description Delete gatepass
// // @route DELETE api/gatepass/deleteGatepassFromParent
// // @access public

// export const deleteGatepassFromParent = asyncHandler(async (req, res) => {
//     try {
//         const { gatepass_number } = req.body;
//         const query = 'DELETE FROM parentApprovalProcessGatepass WHERE gatepass_number = ?';
//         db.query(query, [gatepass_number]);
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send('Error deleting Gatepass from parent');
//     }
// });

// // -----------------------------------------------------------------------------------------------------

// // @description Add new GatePass for admin approval
// // @route POST /api/gatepass/addGatepassForaAdminApproval
// // @access public

// export const addGatepassForAdminApproval = asyncHandler(async (req, res) => {
//     try {
//         const {
//             gatepass_number,
//             pin_number,
//             outgoing_timestamp,
//             permission_upto_timestamp,
//             reason,
//             status,
//             in_timestamp,
//             remarks
//         } = req.body;

//         const query = `
//             INSERT INTO adminApprovalProcessGatepass
//             (gatepass_number, pin_number, outgoing_timestamp, permission_upto_timestamp, reason, status, in_timestamp, remarks)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//         db.query(query, [
//             gatepass_number, pin_number, outgoing_timestamp, permission_upto_timestamp,
//             reason, status || 'pending', in_timestamp || null, remarks || ' '
//         ]);

//         res.status(201).json({
//             message: 'Gatepass added for Admmin approval successfully',
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Error adding gatepass data in admin approval');
//     }
// });

// // @description get GatePass for admin approval
// // @route get /api/gatepass/getGatepassForAdminApproval
// // @access public

// export const getGatepassForAdminApproval = asyncHandler(async (req, res) => {
//     try {
//         const { gatepass_number, pin_number } = req.query;

//         let query = 'SELECT * FROM adminApprovalProcessGatepass';
//         const params = [];

//         if (gatepass_number) {
//             query += ' WHERE gatepass_number = ?';
//             params.push(gatepass_number);
//         } else if (pin_number) {
//             query += ' WHERE pin_number = ?';
//             params.push(pin_number);
//         }

//         db.query(query, params);

//         res.status(201).json({
//             message: 'Gatepass fetched from Admin successfully',
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Error fetching gatepass data');
//     }
// });

// // @description Update gatepass by admin
// // @route PUT api/gatepass/updateAdminApproval
// // @access public
// export const updateAdminApproval = asyncHandler(async (req, res) => {
//     try {
//         const { gatepass_number, status, remarks } = req.body;

//         // Dynamically build the query based on provided fields
//         let query = 'UPDATE adminApprovalProcessGatepass SET ';
//         let params = [];

//         if (status) {
//             query += 'status = ?, ';
//             params.push(status);
//         }
//         if (remarks) {
//             query += 'remarks = ?, ';
//             params.push(remarks);
//         }

//         // Remove the last comma and space from query
//         query = query.slice(0, -2);
//         query += ' WHERE gatepass_number = ?';
//         params.push(gatepass_number);

//         if (params.length > 1) {
//             const result = await db.query(query, params);
//         }
//         res.status(200).json({
//             message: 'admin Updated Gatepass successfully',
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Error Updating Gatepass');
//     }
// });

// // @description Delete gatepass
// // @route DELETE api/gatepass/deleteGatepassFromAdmin
// // @access public

// export const deleteGatepassFromAdmin = asyncHandler(async (req, res) => {
//     try {
//         const { gatepass_number } = req.body;
//         const query = 'DELETE FROM adminApprovalProcessGatepass WHERE gatepass_number = ?';
//         db.query(query, [gatepass_number]);
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send('Error deleting Gatepass from admin');
//     }
// });

// // ---------------------------------------------------------------------------------------------------

// // @description Add new GatePass in Archived
// // @route POST /api/gatepass/addGatepassInArchived
// // @access public

// export const addGatepassInArchived = asyncHandler(async (req, res) => {
//     try {
//         const {
//             gatepass_number,
//             pin_number,
//             gatepass_created,
//             outgoing_timestamp,
//             permission_upto_timestamp,
//             reason,
//             status,
//             in_timestamp,
//             remarks
//         } = req.body;

//         const query = `
//             INSERT INTO archivedGatepass
//             (gatepass_number, pin_number, gatepass_created, outgoing_timestamp, permission_upto_timestamp, reason, status, in_timestamp, remarks)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//         db.query(query, [
//             gatepass_number, pin_number, gatepass_created, outgoing_timestamp, permission_upto_timestamp,
//             reason, status, in_timestamp || null, remarks || ' '
//         ]);

//         res.status(201).json({
//             message: 'Gatepass Added in Archived successfully',
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Error adding gatepass in Archived');
//     }
// });

// // @description get GatePass from Archived
// // @route get /api/gatepass/getGatepassFromArchived
// // @access public

// export const getGatepassFromArchived = asyncHandler(async (req, res) => {
//     try {
//         const { gatepass_number, pin_number } = req.query;

//         let query = 'SELECT * FROM archivedGatepass';
//         const params = [];

//         if (gatepass_number) {
//             query += ' WHERE gatepass_number = ?';
//             params.push(gatepass_number);
//         } else if (pin_number) {
//             query += ' WHERE pin_number = ?';
//             params.push(pin_number);
//         }

//         db.query(query, params);

//         res.status(201).json({
//             message: 'Gatepass fetched from Archived successfully',
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Error fetching gatepass data');
//     }
// });

// // no update no delete in archive
