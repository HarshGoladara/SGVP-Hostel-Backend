import express from 'express';
import cors from 'cors';
import db from './config/dbConnection.js';
import routerAdmission from './routes/admissionRoutes.js';
import routerStudent from './routes/studentRoutes.js';
import routerUpdateData from './routes/updateDataRoutes.js';
import { PORT } from './config/envConfig.js';

const app = express();
// const PORT = PORT || 5001;

app.use(express.json());
app.use(cors());

// routes
app.use("/api/admission", routerAdmission);//known as middleware
app.use("/api/student", routerStudent);//known as middleware
app.use("/api/updateData", routerUpdateData);//known as middleware

function startServer() {

    // Example: Query the database when the server starts
    // async function checkDBConnection() {
    //     try {
    //         const [rows, fields] = await db.query('SELECT 2'); // Example query to check connection
    //         console.log('Database connection successful:', rows);
    //     } catch (err) {
    //         console.error('Error connecting to the database:', err.message);
    //     }
    // }

    // checkDBConnection(); // Check DB connection on server startup

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });


}

startServer();