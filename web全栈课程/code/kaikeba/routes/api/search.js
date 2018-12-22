var express = require('express');
var router = express.Router();
const {sqlQuery} = require('../../databases/db.js');


router.get('/courses', async function (req, res) {
    try {
        const sql = `SELECT * FROM kaikeba.vip_course where name like ?`;
        const results = await sqlQuery(sql, '%'+req.query.keyword+'%');
        // console.log('chang-----', results);
        if (results.length > 0){
            res.json({success: true, data: results});
        } else {
            res.json({success: false, message: '没有查询到数据'});
        }
    } catch (e) {
        res.json({success: false, message: '查询失败'});
    }
});


module.exports = router;