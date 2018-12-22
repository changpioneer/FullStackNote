const {sqlQuery} = require('../databases/db');


let courses = null;
module.exports.initLocal = async function (req, res, next) {

    if (courses == null) {
        let sql = "select * from vip_course";
        try{
            const results = await sqlQuery(sql, null);
            results.forEach(result => result.cooperation = result.cooperation.split(','));
            courses = res.locals.courses = results;
            next();
        }catch (err){
            if (err)
                next(err);
        }

    } else {
        res.locals.courses = courses;
        next();
    }
};