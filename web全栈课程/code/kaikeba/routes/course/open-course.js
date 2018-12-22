var express = require('express');
var router = express.Router();
const {OpenCourse} = require('../../databases/index');


//http:localhost:3000/open-course/
// router.get('/', async function(req, res, next) {
//     let sql = "select * from open_course order by time desc limit ?,?";
//     try{
//         //当前页
//         let page = +req.query.page || 1;
//         //每页显示的最大条目数
//         const pageSize = +req.query.pageSize || 2;
//         //分页查询
//         let offset = (page - 1)*pageSize;
//         let results = await sqlQuery(sql, [offset, pageSize]);
//
//         for (const result of results) {
//             const now = new Date();
//             const endTime = new Date(result.time);
//             if (now - endTime > 0) { // 已结束，看回放
//                 result.notBegin = false;
//             } else {
//                 result.notBegin = true;
//             }
//         }
//
//         const count = await sqlQuery('SELECT count(*) AS count FROM kaikeba.open_course')
//             .then(results => results[0].count);
//
//         res.render('open-course',
//             {
//                 title: '公开课',
//                 openCourses: results,
//                 pagination: getPagination(count, page, pageSize)
//             });
//     }catch (err){
//         if (err)
//             next(err);
//     }
// });


router.get('/', async function(req, res, next) {
    try{
        //当前页
        let page = +req.query.page || 1;
        //每页显示的最大条目数
        const pageSize = +req.query.pageSize || 2;
        //分页查询
        let offset = (page - 1)*pageSize;

        //返回带总条数的对象{rows:[], count}
        let openCourses = await OpenCourse.findAndCountAll(
            {
                offset: offset,
                limit: pageSize,
                order: [['time', 'DESC']]
            });

        let results = openCourses.rows;
        let count = openCourses.count;

        for (const result of results) {
            const now = new Date();
            const endTime = new Date(result.time);
            if (now - endTime > 0) { // 已结束，看回放
                result.notBegin = false;
            } else {
                result.notBegin = true;
            }
        }

        res.render('open-course',
            {
                title: '公开课',
                openCourses: results,
                pagination: getPagination(count, page, pageSize)
            });
    }catch (err){
        if (err)
            next(err);
    }
});

function getPagination(count, currPage, pageSize) {
    //总页数
    let totalPage = Math.ceil(count / pageSize);
    let first = currPage != 1;//是否有首页
    let last = currPage != totalPage;//是否有最后页
    let prev = currPage > 1;//是否有上一页
    let next = currPage < totalPage;//是否有下一页
    return {page: currPage, total: totalPage, first, last, prev, next};
}

module.exports = router;
