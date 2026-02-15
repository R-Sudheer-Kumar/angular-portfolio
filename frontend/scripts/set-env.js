const fs = require('fs');
const path = require('path');

// Try to load .env for local dev (optional)
try { require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); } catch (e) { }

const config = {
    firebase: {
        apiKey: process.env.FIREBASE_API_KEY || "YOUR_API_KEY",
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
        projectId: process.env.FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
        appId: process.env.FIREBASE_APP_ID || "YOUR_APP_ID",
        measurementId: process.env.FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID"
    },
    apiUrl: process.env.API_URL || "https://angular-portfolio-5vj6.onrender.com/api"
};

const targetPath = path.join(__dirname, '../public/config.json');
fs.writeFileSync(targetPath, JSON.stringify(config, null, 2));
console.log(`Generated ${targetPath} for runtime configuration.`);
