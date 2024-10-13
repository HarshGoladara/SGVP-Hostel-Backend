import postgres from 'pg'
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from './envConfig.js';

const pool = new postgres.Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT || 5432,
    max: 10
});

export default pool;