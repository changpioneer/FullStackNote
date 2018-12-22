var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        showVideo: false, //首页视频是否播放
        courses:res.locals.courses
    });
});

module.exports = router;
