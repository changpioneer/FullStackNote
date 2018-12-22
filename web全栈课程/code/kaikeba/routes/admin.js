var express = require('express');
var multer = require('multer');
var router = express.Router();
// const {sqlQuery} = require('../databases/db');

//http:localhost:3000/admin/
router.get('/', function(req, res) {
  res.redirect('admin/open-course');
});

const upload = multer({
    dest: 'public/images',
    limits: {fileSize: 2*1024*1024},//最大2M
    fileFilter: function (req, file, cb) {//文件过滤
        if(file.mimetype == "image/png" || file.mimetype == "image/jpeg"){
            //接受文件
            cb(null, true);
        }else{
            cb(new Error('请上传图片格式'), false);
        }
    }
});
router.post('/open-course', function(req, res) {

    // req.body.poster = req.file ? req.file.filename : "";
    //
    // console.log(req.file);
    //

    console.log('chang------------------');
    let message = '操作失败';

    // const result = await sqlQuery(`INSERT INTO open-course SET ?`, req.body);
    // message = result.affectedRows > 0 ? '操作成功':'操作失败';
    res.render('admin/result',
        {
            layout: 'layout-admin',
            message
        });
});



//http:localhost:3000/admin/open-course
router.get('/open-course', function(req, res, next) {
    res.render('admin/open-course',
        {
            layout: 'layout-admin',
            nav: 'open-course'
        });
});


//http:localhost:3000/admin/vip-course
router.get('/vip-course', function(req, res, next) {
    res.render('admin/vip-course',
        {
            layout: 'layout-admin',
            nav: 'vip-course'
        });
});

module.exports = router;
