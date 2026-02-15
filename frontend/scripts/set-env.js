
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Define the environment file path
const targetPath = path.join(__dirname, '../src/environments/environment.prod.ts');

// Environment file content
const envConfigFile = `export const environment = {
    production: true,
    firebase: {
        apiKey: '${process.env.FIREBASE_API_KEY}',
        authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
        projectId: '${process.env.FIREBASE_PROJECT_ID}',
        storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
        messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
        appId: '${process.env.FIREBASE_APP_ID}',
        measurementId: '${process.env.FIREBASE_MEASUREMENT_ID}'
    },
    apiUrl: '${process.env.API_URL || "https://angular-portfolio-5vj6.onrender.com/api"}'
};
`;

console.log(`Writing environment variables to ${targetPath}`);

// Write the file
fs.writeFileSync(targetPath, envConfigFile);

console.log('Environment variables written successfully!');
