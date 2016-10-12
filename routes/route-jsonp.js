var express = require('express');
var router = express.Router();
var fake = require('../tools/fake');

router.get('/', function(req, res, next){
    res.render('jsonpusers', {
        names: '\n只需要支付一条小鱼干，我就可以为你定制专属的JSONP接口。以下是已购买定制服务的同学名单：\n 1. 不愿意吐露姓名的Q同学（尚未支付，请尽快支付！）',
        layout: 'jsonp'
    });
});

router.get('/zqadd', function(req, res, next){
    var add1 = Number(req.query.add1);
    var add2 = Number(req.query.add2);
    var cb = req.query.cb;
    res.send(cb + '({result: ' + (add1 + add2) + '});');
});



router.get('/fake*', function(req, res, next){
    if(!req.query.types){
        res.send('参数说明:<br>1. types: 新闻标题种类数，例如需求的假数据中，存在6字标题、10字标题、15字标题三种，则types=3。<br>2. rows[x]: 第x种标题中存在的标题数目。例如第一种为6字标题，6字标题有5条，则rows1=5<br>3. len[x]: 第x种标题的字数。例如第一种为6字标题，则len1=6<br>4. sp[x]: 第x中标题中是否存在空格。若存在空格则值不为0（任填），不存在空格等号后留空或不写此参数<br>5. cb: 回调函数名称，缺省值为“show”。<br>6. 范例：<a href="http://xjqboard.duapp.com/jsonp/fake?types=1&rows1=10&len1=6&sp1=true&cb=run">http://xjqboard.duapp.com/jsonp/fake?types=1&rows1=10&len1=6&sp1=true&cb=run</a><br><a href="http://xjqboard.duapp.com/jsonp/fake?types=2&rows1=10&len1=6&sp1=true&rows2=15&len2=12&sp2=&cb=hey">http://xjqboard.duapp.com/jsonp/fake?types=2&rows1=10&len1=6&sp1=true&rows2=15&len2=12&sp2=&cb=hey</a>');
        return;
    }
    // console.log(req.query.cb);
    // console.log(req.query.types);
    var cb = req.query.cb || 'show';
    var totalCount = Number(req.query.types);
    var arr = [];
    for(var i = 1; i <= totalCount; i += 1){
        // console.log(req.query['sp' + i]);
        // console.log(req.query['len' + i]);
        var isSpace = req.query['sp' + i] || false;
        var lens = Number(req.query['len' + i]) || 1;
        for(var j = 0; j < Number(req.query['rows' + i]); j += 1){
            arr.push({
                'len': lens,
                'sp': isSpace
            });
        }
    }
    // console.log(arr);
    res.send(cb + fake.geneJsonp(arr) + ';');
});
// http://xjqboard.duapp.com/jsonp/fake?types=1&len1=6&sp1=true&cb=run
// http://127.0.0.1:3000/jsonp/fake?types=1&rows1=2&len1=5&sp=true&cb=run
// router.get('/fake/intro', function(req, res, next){
//     res.render('jsonpusers', {
//         names: '假数据JSON接口参数说明：\n1、',
//         layout: 'jsonp'
//     });
// })

module.exports = router;
