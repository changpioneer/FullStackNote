var express = require('express');
var router = express.Router();
const {sqlQuery} = require('../../databases/db.js');
const captcha = require('trek-captcha');
const md5 = require('md5');
const salt = 'take a little salt';

router.post('/login', async function (req, res) {

    const {phone, password, autoLogin} = req.body;
    console.log('chang----', req.body);
    try {
        const sql = 'SELECT * FROM kaikeba.user WHERE phone=? AND password=?';
        const results = await sqlQuery(sql, [phone, md5(password + salt)]);
        console.log('chang----results', results);
        if (results.length > 0) {
            const user = results[0];
            delete user.password;
            if (autoLogin) {
                req.session.cookie.maxAge = 7 * 24 * 3600 * 1000;
            }
            req.session.user = user;
            res.json({success: true, data: user});
        } else {
            res.json({success: false, message: '电话或密码错误'});
        }
    } catch (err) {
        res.json({success: false, message: '服务器错误，请稍后重试'});
    }
});

router.post('/register', async function (req, res) {

    console.log('chang-----', req.body);
    req.body.password = md5(req.body.password + salt);
    req.body.username = '学员' + req.body.phone;

    try {
        const sql = 'INSERT INTO kaikeba.user SET ?';
        const result = await sqlQuery(sql, req.body);
        if (result.affectedRows > 0) {
            // 注册成功
            req.body.id = result.insertId;
            delete req.body.password;
            // 保存登录状态
            req.session.user = req.body;
            res.json({success: true, data: req.body});
            console.log('chang-----', 'success');
        } else {
            res.json({success: false, message: '注册失败'});
        }
    } catch (e) {
        console.log('chang-----', e);
        res.json({success: false, message: '服务器错误'});
    }
});


router.get('/image-code', async (req, res) => {

    try {
        // token:是数字字母表示形式
        // buffer:是图片数据
        const {token, buffer} = await captcha({size: 4});
        // session中存储该token在将来验证时使用
        req.session.codeImg = token;
        // 将图片数据返回给前端
        res.json({
            success: true,
            data: buffer.toString('base64')
        });
    } catch (e) {
        res.json({
            success: false,
            message: '服务器异常，请稍后重试'
        });
    }
});

router.post('/verify-phone', async (req, res) => {
    try {
        const sql = 'SELECT * FROM kaikeba.user WHERE phone=?';
        const results = await sqlQuery(sql, req.body.phone);
        if (results.length > 0) {
            res.json({success: false, message: '电话号码已存在'});
        } else {
            res.json({success: true});
        }
    } catch (e) {
        res.json({success: false, message: '服务器错误'});
    }
});

router.post('/verify-imagecode', (req, res) => {
    try {

        const imageCode = req.session.codeImg;
        console.log('chang----imageCode=', imageCode);
        console.log('chang----shangcimageCode=', req.body.imageCode);

        if (imageCode === req.body.imageCode) {
            //校验通过
            res.json({success: true});
        } else {
            res.json({success: false, message: '验证码不一样'});
        }
    } catch (e) {
        res.json({success: false, message: '服务器错误'});
    }
});

router.get('/is-login', (req, res) => {
    if (req.session.user) {
        res.json({success: true, data: req.session.user});
    } else {
        res.json({success: false, message: '初始化登录失败'});
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({success: false, message: '注销失败'});
        } else {
            res.json({success: true});
        }
    });
});


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) { // 存储目录
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        let extname = '';
        switch (file.mimetype) {
            case 'image/jpeg':
                extname = '.jpg';
                break;
            case 'image/png':
                extname = '.png';
                break;
            case 'image/gif':
                extname = '.gif';
                break;
        }
        cb(null, Date.now() + extname);
    }
});
const upload = multer({
    // dest: 'public/images',
    storage,
    limits: {fileSize: 1 * 1024 * 1024},//最大1M
    fileFilter: function (req, file, cb) {
        console.log(file);
        // 判断文件是否合法，合法则处理，不合法则拒绝
        if (file.mimetype === 'image/gif' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png') {
            // 接收文件
            cb(null, true);
        } else {
            cb(new Error('请上传图片格式'), false);
        }
    }
});
router.post('/uploadAvatar', upload.single('file'), async (req, res) => {
        console.log('chnag----');
        if (!req.file) {
            res.sendStatus(500);
        } else {
            try {
                // 更新session数据
                req.session.user.avatar = req.file.filename;

                // 更新user表中的数据
                const result = await sqlQuery(`UPDATE kaikeba.user SET avatar=? WHERE id=?`,
                    [req.file.filename, req.session.user.id]);
                if (result.affectedRows > 0) {
                    res.json({success: true, data: req.file.filename})
                }
            } catch (error) {
                console.log('chnag----', error);
            }
        }
    }
);

// 查询用户所有课程
router.get('/my-courses', async (req, res) => {
    try {
        const sql = `select c.id,c.name,c.phase,vc.poster from user_clazz uc
                        left join clazz c on uc.clazz_id = c.id
                        left join vip_course vc on c.course_id = vc.id
                        where user_id=?`;
        const data = await sqlQuery(sql, req.session.user.id);
        res.json({success: true, data});
    } catch (error) {

    }
});

module.exports = router;