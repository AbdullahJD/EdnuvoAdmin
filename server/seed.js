const bcrypt = require('bcryptjs');
const users = [
    {
        email: 'admin@ednuvo.com',
        password: 'password123',
        role: 'admin',
    },
    {
        email: 'user@ednuvo.com',
        password: 'userpassword',
        role: 'user',
    },
];

// وظيفة لتخزين المستخدمين بشكل افتراضي
const seedUsers = async () => {
    for (let user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        console.log(`User created: ${user.email}, Password: ${hashedPassword}`);
        // هنا يمكنك إضافة الكود الخاص بإدخال البيانات في قاعدة بياناتك
    }
};

// تصدير الدالة seedUsers لتكون قابلة للاستخدام في أماكن أخرى
module.exports = seedUsers;
