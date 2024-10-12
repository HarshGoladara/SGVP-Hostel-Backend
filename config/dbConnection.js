import mysql from 'mysql2'
import { DB_HOST,DB_USER, DB_PASSWORD, DB_NAME,DB_PORT } from './envConfig';

const pool = mysql.createPool({
    host: DB_HOST,  // Host from your MySQL server
    user: DB_USER,                                        // MySQL username
    password: DB_PASSWORD,                    // MySQL password
    database: DB_NAME,                                   // Database name
    port: 22466,                                             // Custom port
    waitForConnections: true,                                // Handle multiple requests
    connectionLimit: 10,                                     // Pool size
    queueLimit: 0,                                           // No limit on queued requests
    ssl: {                                                   // SSL configuration
        rejectUnauthorized: false                             // Ensure secure connection
    }
});

export default pool.promise();