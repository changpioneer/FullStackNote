var express = require('express');
var router = express.Router();

//http:localhost:3000/vip-course
router.get('/', function (req, res) {
    res.redirect('vip-course/web');
});

//http:localhost:3000/vip-course/xxx
router.get('/:coursename', function(req, res) {
    // res.render('course/vipcourse');
    // console.log('chang---', req.params.coursename);
    res.render('vip-course/'+req.params.coursename, {title: getTitle(res, req.params.coursename)});
});

function getTitle(res,course) {
    for(const c of res.locals.courses){
        if(c.url.indexOf(course) != -1){
            return c.name;
        }
    }
    return 'VIP开课';
}
module.exports = router;
