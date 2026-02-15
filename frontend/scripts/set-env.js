const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Explicitly define path to .env file (assuming it's in frontend root)
const envPath = path.resolve(__dirname, '../.env');

// Load environment variables
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.warn(`WARNING: Could not load .env file from ${envPath}. Using system environment variables.`);
} else {
    console.log(`Loaded environment variables from ${envPath}`);
}

console.log('FIREBASE_API_KEY present:', !!process.env.FIREBASE_API_KEY);
console.log('FIREBASE_PROJECT_ID present:', !!process.env.FIREBASE_PROJECT_ID);

// Function to generate environment file content
const getEnvFileContent = (isProduction) => `export const environment = {
    production: ${isProduction},
    firebase: {
        apiKey: '${process.env.FIREBASE_API_KEY || "YOUR_API_KEY"}',
        authDomain: '${process.env.FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN"}',
        projectId: '${process.env.FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID"}',
        storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET"}',
        messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID"}',
        appId: '${process.env.FIREBASE_APP_ID || "YOUR_APP_ID"}',
        measurementId: '${process.env.FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID"}'
    },
    apiUrl: '${process.env.API_URL || "https://angular-portfolio-5vj6.onrender.com/api"}'
};
`;

// Paths
const targetPathProd = path.join(__dirname, '../src/environments/environment.prod.ts');
const targetPathDev = path.join(__dirname, '../src/environments/environment.ts');

console.log('Generating environment files...');

// Write environment.prod.ts
fs.writeFileSync(targetPathProd, getEnvFileContent(true));
console.log(`Generated ${targetPathProd}`);

// Write environment.ts
fs.writeFileSync(targetPathDev, getEnvFileContent(false));
console.log(`Generated ${targetPathDev}`);

console.log('Environment variables configuration completed!');
