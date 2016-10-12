var express = require('express');
var router = express.Router();
var breadSel = require('../tools/bread').breadSel;

router.get('/purpose', function(req, res, next){
    res.render('purpose', {
        layout: '/index/layout-about',
        bread: breadSel('purposeBread'),
        js: [{
            js_name: 'purpose.js'
        }]
    });
});

module.exports = router;
