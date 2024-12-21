import express from 'express';
import cors from 'cors';
// import db from './config/dbConnection.js';
import routerAdmission from './routes/admissionRoutes.js';
import routerStudent from './routes/studentRoutes.js';
import routerUpdateData from './routes/updateDataRoutes.js';
import routerGatepass from './routes/gatepassRoutes.js';
import routerCredentials from './routes/credentialRoutes.js';
import routerAuth from './routes/authRoutes.js';
import routerDashboard from './routes/dashboardRoutes.js';
import routerPagination from './routes/paginationRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

// routes
app.use('/api/admission', routerAdmission); //known as middleware
app.use('/api/student', routerStudent); //known as middleware
app.use('/api/updateData', routerUpdateData); //known as middleware
app.use('/api/gatepass', routerGatepass);
app.use('/api/credential', routerCredentials);
app.use('/api/auth', routerAuth);
app.use('/api/dashboard', routerDashboard);
app.use('/api/pagination', routerPagination);

function startServer() {
  // // Example: Query the database when the server starts
  // async function checkDBConnection() {
  //   try {
  //     await db.connect();
  //     console.log(
  //       '=============🚀 Database connection successful 🚀 ====================',
  //     );
  //   } catch (err) {
  //     console.error('Error connecting to the database:', err.message);
  //   }
  // }

  // checkDBConnection(); // Check DB connection on server startup

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  // app.listen(PORT, '192.168.70.71', () => {//harsh
  //     console.log(`Server is running on http://192.168.70.71:${PORT}`);
  // });

  // app.listen(PORT, '192.168.145.71', () => {//my
  //     console.log(`Server is running on http://192.168.145.71:${PORT}`);
  // });

  // app.listen(PORT, '192.168.19.9', () => {//sgvp
  //     console.log(`Server is running on http://192.168.19.9:${PORT}`);
  // });

  // app.listen(PORT, '10.7.68.89', () => {//nirma
  //     console.log(`Server is running on http://10.7.68.89:${PORT}`);
  // });
}

startServer();
