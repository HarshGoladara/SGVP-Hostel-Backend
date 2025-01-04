// // firebaseAdminConfig.js
// import admin from "firebase-admin";
// import fs from "fs";

// // Read the Firebase service account key file
// import path from "path";

// const serviceAccount = JSON.parse(
//   fs.readFileSync(path.resolve(__dirname, "./sgvp-collage-erp-firebase-adminsdk-28wmk-600b1fa229.json"), "utf-8")
// );

// // Initialize Firebase Admin
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// export default admin;

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the path to the JSON file
const serviceAccountPath = path.resolve(
  __dirname,
  './sgvp-collage-erp-firebase-adminsdk-28wmk-600b1fa229.json',
);

try {
  const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, 'utf-8'),
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log('Firebase Admin initialized successfully.');
} catch (err) {
  console.error('Error initializing Firebase Admin:', err);
  process.exit(1); // Exit the process if Firebase fails to initialize
}

export default admin;
