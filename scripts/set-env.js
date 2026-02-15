const fs = require('fs');
const path = require('path');

// Try to load .env for local dev
const envPath = path.resolve(__dirname, '../.env');
try {
    require('dotenv').config({ path: envPath });
    console.log(`Loaded environment variables from ${envPath}`);
} catch (error) {
    console.log('Note: dotenv not loaded. Relying on system environment variables.');
}

// Helper to get env variable
const getEnv = (key, fallback) => {
    // Check both standard name and NG_APP_ prefix just in case user renamed them
    return process.env[key] || process.env[`NG_APP_${key}`] || fallback;
};

// Generate the file content
const getEnvFileContent = (isProduction) => `export const environment = {
    production: ${isProduction},
    firebase: {
        apiKey: '${getEnv('FIREBASE_API_KEY', 'YOUR_API_KEY')}',
        authDomain: '${getEnv('FIREBASE_AUTH_DOMAIN', 'YOUR_AUTH_DOMAIN')}',
        projectId: '${getEnv('FIREBASE_PROJECT_ID', 'YOUR_PROJECT_ID')}',
        storageBucket: '${getEnv('FIREBASE_STORAGE_BUCKET', 'YOUR_STORAGE_BUCKET')}',
        messagingSenderId: '${getEnv('FIREBASE_MESSAGING_SENDER_ID', 'YOUR_MESSAGING_SENDER_ID')}',
        appId: '${getEnv('FIREBASE_APP_ID', 'YOUR_APP_ID')}',
        measurementId: '${getEnv('FIREBASE_MEASUREMENT_ID', 'YOUR_MEASUREMENT_ID')}'
    }
};
`;

// Paths
const targetPathProd = path.join(__dirname, '../src/environments/environment.prod.ts');
const targetPathDev = path.join(__dirname, '../src/environments/environment.ts');

console.log('Generating environment files...');

// Write environment.prod.ts
fs.writeFileSync(targetPathProd, getEnvFileContent(true));
console.log(`Generated ${targetPathProd}`);

// Write environment.ts (for local dev consistency)
fs.writeFileSync(targetPathDev, getEnvFileContent(false));
console.log(`Generated ${targetPathDev}`);

console.log('Environment configuration completed!');
