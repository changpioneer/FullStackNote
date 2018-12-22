const hbs = require('hbs');
var path = require('path');

//注册方法
hbs.registerHelper('addOne', function (num) {
    return num+1;
});

hbs.registerHelper('minusOne', function (num) {
    return num-1;
});

hbs.registerHelper('compares', function (a, b) {
    return a == b;
});


// 注册扩展代码块helper
const blocks = {};//代码块缓存对象
hbs.registerHelper('extend', function (name, context) {
    // context 是上下文，保存有用方法和数据，最后一个参数永远是context
    let block = blocks[name]; // block用来存放代码块
    if (!block) {
        block = blocks[name] = [];
    }
    // 变异指令中代码块并放入block
    // console.log(this);
    block.push(context.fn(this));
    // 与context.fn()配对还有一个方法
    // context.inverse()
});

hbs.registerHelper('block', function (name) {
    const val = (blocks[name] || []).join('\n');
    blocks[name] = [];//清空缓存
    return val;
});

hbs.registerHelper('myLinks', function (options) {
    const {text, href, style} = options.hash;
    return new hbs.SafeString(`<a herf="${href}" style="${style}">${text}</a>`);
});

hbs.registerPartials(path.join(__dirname, '../views/partial'));

// 动态partial
hbs.registerHelper('whichPartial', function (name) {
    return name;
});

// 获取时间一部分
hbs.registerHelper('partOfDate', function (str, part, index) {
    const date = new Date(str);
    if (part == 'd') {
        return date.getDate();
    } else if(part == 'M') {
        return ''+(date.getMonth() + 1)
    } else if(part == 'h') {
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h.toString();
        return h[index];
    } else if(part == 'm') {
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m.toString();
        return m[index];
    } else {
        return ''
    }
})