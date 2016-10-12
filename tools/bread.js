var breadSet = {
    indexBread: {
        bread_href: '/',
        bread_isActive: '',
        bread_name: '首页',
        level: 0,
        parent: ''
    },
    blogBread: {
        bread_href: '/blog',
        bread_isActive: '',
        bread_name: '博客',
        level: 2,
        parent: 'indexBread'
    },
    boardBread: {
        bread_href: '/board',
        bread_isActive: '',
        bread_name: '留言板',
        level: 2,
        parent: 'indexBread'
    },
    jsonpBread: {
        bread_href: '/jsonp',
        bread_isActive: '',
        bread_name: 'JSONP接口',
        level: 2,
        parent: 'indexBread'
    },
    catBread: {
        bread_href: '/cat',
        bread_isActive: '',
        bread_name: '喵片',
        level: 2,
        parent: 'indexBread'
    },
    aboutBread: {
        bread_href: '/about',
        bread_isActive: '',
        bread_name: '关于本站',
        level: 2,
        parent: 'indexBread'
    },
    loginBread: {
        bread_href: '/login',
        bread_isActive: '',
        bread_name: '登录',
        level: 2,
        parent: 'indexBread'
    },
    regBread: {
        bread_href: '/reg',
        bread_isActive: '',
        bread_name: '注册',
        level: 2,
        parent: 'indexBread'
    },
    donateBread: {
        bread_href: '/about/donate',
        bread_isActive: '',
        bread_name: '捐献',
        level: 3,
        parent: 'aboutBread'
    },
    contactBread: {
        bread_href: '/about/contact',
        bread_isActive: '',
        bread_name: '联系方式',
        level: 3,
        parent: 'aboutBread'
    },
    purposeBread: {
        bread_href: '/about/purpose',
        bread_isActive: '',
        bread_name: '建站目的',
        level: 3,
        parent: 'aboutBread'
    }
};
var breadSel = function(piece){
    var arr = [];
    while(piece){
        arr.unshift(breadSet[piece]);
        piece = breadSet[piece].parent;
    }
    return arr;
};

module.exports = {
    breadSel: breadSel
};
