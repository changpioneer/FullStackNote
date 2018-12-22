const mysql = require('mysql');
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');


let cfg = {
    host: 'localhost',
    user: 'kaikeba_admin',
    password: 'admin',
    database: 'kaikeba'
};

const pool = mysql.createPool(cfg);

// module.exports = {
//     sqlQuery: function (sql, value) {
//         return new Promise((resolve, reject) => {
//             pool.query(sql, value, function (err, results) {
//                 if (err)reject(err);
//                 else resolve(results);
//             });
//
//         });
//     },
//     databases: databases
// };



const sequelize = new Sequelize('kaikeba', 'kaikeba_admin', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {max: 5, acquire: 30000, idle: 10000},
    timestamps: false
});

// 要导出的对象
const databases = {Sequelize, sequelize};

// 动态导入模型
// 读取当前目录中所有文件名
fs.readdirSync(__dirname)
    .filter(file => (file !== 'index.js' && file !== 'db.js'))
    .forEach(file => { // 从文件中导入模型
        const model = sequelize.import(path.join(__dirname, file));
        databases[model.name] = model;
    });

module.exports = databases;
