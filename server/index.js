const express = require('express');
const app = express();
const seedUsers = require('./seed');  // تضمين السكربت

// تنفيذ السكربت عند بدء تشغيل الخادم
seedUsers();

app.listen(3002, () => {
    console.log('Server running on port 3001');
});
