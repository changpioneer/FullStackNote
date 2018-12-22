const mysql = require('mysql');

let cfg = {
    host: 'localhost',
    user: 'kaikeba_admin',
    password: 'admin',
    database: 'kaikeba'
};

const pool = mysql.createPool(cfg);

module.exports = {
    sqlQuery: function (sql, value) {
        return new Promise((resolve, reject) => {
            pool.query(sql, value, function (err, results) {
                if (err)reject(err);
                else resolve(results);
            });

        });
    },
    pool
};



