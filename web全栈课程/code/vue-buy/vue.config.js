module.exports = {
    configureWebpack: {
        devServer: {
            before(app) {
                app.get('/api/goods', function (req, res) {
                    res.json({
                        list: [
                            {text:'百万年薪架构是',price:100}, 
                            {text:'web课程',price:90}, 
                            {text:'Python爬虫',price:80}, 
                            {text:'Java架构师',price:120}
                        ] 
                    });
                }); 
            }
        } 
    }
}