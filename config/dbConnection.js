// import postgres from 'pg';
// import pkg from 'pg';
// import {
//   DB_HOST,
//   DB_USER,
//   DB_PASSWORD,
//   DB_NAME,
//   DB_PORT,
// } from './envConfig.js';
// import { DATABASE_URL } from './envConfig.js';

// const { Pool } = pkg;

// // local Postgres connection
// const localPool = new postgres.Pool({
//   host: DB_HOST,
//   user: DB_USER,
//   password: DB_PASSWORD,
//   database: DB_NAME,
//   port: DB_PORT || 5432,
//   max: 10,
// });

// // Cloud Postgres connection
// const cloudPool = new Pool({
//   connectionString: DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false, // For secure connections
//   },
// });

// const pool = DATABASE_URL ? cloudPool : localPool;
// if (DATABASE_URL) {
//   console.log('Cloud connection');
// } else {
//   console.log('local connection');
// }

// export default pool;

import postgres from 'pg';
import pkg from 'pg';
import {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
} from './envConfig.js';
import { DATABASE_URL } from './envConfig.js';

const { Pool } = pkg;

// local Postgres connection
const localPool = new postgres.Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT || 5432,
  max: 10,
});

// Cloud Postgres connection
const cloudPool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // For secure connections
  },
});

const pool = DATABASE_URL ? cloudPool : localPool;
if (DATABASE_URL) {
  console.log('Cloud connection');
} else {
  console.log('local connection');
}

export default pool;
