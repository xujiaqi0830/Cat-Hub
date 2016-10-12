var express = require('express');
var router = express.Router();
var config = require('../tools/config');
var fake = require('../tools/fake');

router.get('/', function(req, res, next){
    res.send(fake.geneAjax(config.newsConfig));
});

module.exports = router;
