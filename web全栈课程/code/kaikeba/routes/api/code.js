var express = require('express');
var router = express.Router();
const moment = require('moment');
const md5 = require('md5');
const axios = require('axios');
const qs = require('querystring');
const {sqlQuery} = require('../../databases/db.js');

//获取短信验证码
router.get('/:phone', async function (req, res) {

    const code = ran();//生成验证码
    const to = req.params.phone;//手机号
    const accountSid = 'f8022a4e00d84c6eb20c53bf87cdbe5e';//账号ID
    const autoToken = '09d0d205483f44d29073151f2961c36d';//认证令牌
    const templateid = '956847526';//短信模板ID
    const param = `${code},1`;//短信参数
    const now = moment();
    const timestamp = now.format('YYYYMMDDHHmmss');//时间戳
    const sig = md5(accountSid + autoToken + timestamp);//MD5(ACCOUNT SID + AUTH TOKEN + timestamp)
    //发送请求
    try {
        let url = 'https://api.miaodiyun.com/20150822/industrySMS/sendSMS';
        let resq = await axios.post(url,
            qs.stringify({to, accountSid, templateid, param, sig, timestamp}),
            {headers: {'ContentType': 'application/x-www-from-urlencoded'}});
        console.log('chang--resq.data:', resq.data);
        if (resq.data.respCode === '00000') {
            //发送成功
            //存储验证码和有效期到数据库
            const exprise = moment().add(1, 'minutes').toDate();
            let sql = 'INSERT INTO kaikeba.code_verify SET ?';
            let result = await sqlQuery(sql, {phone: to, code, exprise});
            if (result.affectedRows > 0) {
                //存储成功
                res.json({success: true, msg: '发送验证码成功', code});
                console.log('chang--', code);
            } else {
                res.json({success: true, msg: '发送验证码失败'});
            }
        }
        else {
            res.json({success: true, msg: '发送验证码失败'});
        }
    } catch (err) {
        console.log('chang--', err);
        res.json({success: true, msg: '发送验证码失败'});
    }
});

function ran() {
    let rans = "";
    for (var i = 0; i < 6; i++) {
        rans += Math.floor(Math.random() * 10).toString();
    }
    return rans;
}

//报名验证
router.post('/', async function (req, res) {
    try {
        let sql = 'SELECT * FROM kaikeba.code_verify WHERE phone=? AND code=?';
        const {phone, code} = req.body;
        let results = await sqlQuery(sql, [phone, code]);
        if (results.affectedRows) {
            const exprise = results[0].exprise;
            if (exprise - new Date() > 0)//有效
            {
                res.json({success: true, message: '验证成功'});
            }
            else {
                res.json({success: false, message: '验证码过期'});
            }
            //删除记录

        }
        else {
            res.json({success: false, message: '手机号或验证码无效'});
        }
    } catch (err) {
        console.log('chang--', err);
        res.json({success: false, message: '服务器错误，请稍后再试'});
    }
});

module.exports = router;
