var express = require('express');
var router = express.Router();

// index
router.get('/', function(req, res, next) {
    res.render('index', {
        layout: 'index/layout-index',
        js: [{
            js_name: 'index.js'
        }]
    });
});
//点击确认

module.exports = router;
