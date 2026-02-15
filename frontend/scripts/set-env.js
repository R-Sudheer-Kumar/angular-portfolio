const fs = require('fs');
const path = require('path');


// Generate the file content using process.env
const envFileContent = `export const environment = {
    production: true,
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

// Write strictly to environment.prod.ts for production
const targetPath = path.join(__dirname, '../src/environments/environment.prod.ts');
fs.writeFileSync(targetPath, envFileContent);
console.log(`Generated ${targetPath} using process.env variables.`);
