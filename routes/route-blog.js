var express = require('express');
var router = express.Router();
var connection = require('../mysql/connection');
var convertor = require('../tools/convertor');
var breadSel = require('../tools/bread').breadSel;
var marked = require('marked');
var path = require('path');
var highlight = require('highlight.js');
var Promise = require('bluebird');
var uuid = require('uuid');
var moment = require('moment');
var fnv = require('fnv-plus');
moment.locale('zh-cn');

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code) {
    return highlight.highlightAuto(code).value;
    },
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

// 博客首页 开始
router.get('/', function(req, res, next){
    Promise.join(
        connection.queryAsync('SELECT `post_uuid`, `post_hash`, `post_tags`, `post_title`, `post_brief`, `post_time`, `post_comment`, `post_read` FROM `post` ORDER BY `post_time` DESC LIMIT 10'),
        connection.queryAsync('SELECT COUNT(*) FROM `post`'),
        function(result, count){
            // 处理查询数据
            var finalPost = [];
            for(var i = 0; i < result.length; i += 1){
                result[i].post_hash = '/blog/' + result[i].post_hash;
                result[i].post_time = moment(result[i].post_time).calendar();
                var tempTagArr = result[i].post_tags.split(',');
                var tempTagObj = {};
                var finalTagArr = [];
                for(var j = 0; j < tempTagArr.length; j += 1){
                    finalTagArr.push({
                        post_tagname: tempTagArr[j]
                    });
                }
                result[i].post_tags = finalTagArr;
                var tempPost = {};
                for(var x in result[i]){
                    tempPost[x] = result[i][x];
                }
                finalPost.push(tempPost);
            }
            res.render('blog',{
                bread: breadSel('blogBread'),
                layout: '/index/layout-blog',
                post: finalPost,
                page_total: Math.ceil(count[0]['COUNT(*)'] / 10), // 待补完调整一页文章个数功能
                page_now: 1,
                css: [{
                    css_name: 'blog.css'
                }],
                js: [{
                    js_name: 'blog.js'
                }]
            });
        }
    )
    .catch(function(err){
        throw err;
    });
});
// 博客首页 结束

// 博文翻页ajax 开始
router.get('/showpage', function(req, res, next){
    var goPage = Number(req.query.page);
    var goLine = (goPage - 1) * 10 + 1;
    connection.queryAsync('SELECT * FROM post ORDER BY post_time DESC')
    .then(function(result){
        var tempArr = [];
        for(var i = goLine - 1; i < goLine + 9; i += 1){
            if(result[i]){
                tempArr.push(result[i]);
            }
        }
        res.send({
            // postCount: count,
            nowPage: goPage,
            newPage: tempArr
        });
    })
    .catch(function(err){
        throw err;
    });
});
// 博文翻页ajax 结束

// 发表博文页面(private) 开始
router.get('/post', function(req, res, next){
    res.render('post', {
        layout: '/index/layout-blog',
        js: [{
            js_name: 'post.js'
        }]
        }
    );
});
// 发表博文页面(private) 结束

// 发表博文 开始
// -----PW：1q2w3e4r-----
router.post('/post', function(req, res, next){
    if(req.body.pw !== '1q2w3e4r'){
        res.send('wrong');
        return;
    }else{
        var post_uuid = uuid.v4();
        var post_hash = fnv.hash(post_uuid, 64).str();
        var tagString = req.body.tag;
        var tagArr = req.body.tag.split(',');
        var judgeNewPromises = [];
        for(var i = 0; i < tagArr.length;i += 1){
            judgeNewPromises.push(connection.queryAsync('SELECT `tag_uuid`, `tag_name` FROM `tag` WHERE `tag_name` = ?',[tagArr[i]]));
        }
        var oNow = new Date();
        connection.queryAsync('INSERT INTO `post` (`post_uuid`, `post_hash`, `post_tags`, `post_title`, `post_brief`, `post_content`, `post_time`) VALUES (?, ?, ?, ?, ?, ?, ?)', [post_uuid, post_hash, req.body.tag, req.body.title, req.body.brief, req.body.text, moment(new Date()).format("YYYY-MM-DD HH:mm:ss")])
        .then(function(){
            return Promise.map(judgeNewPromises, function(promise){
                if(promise.length === 1){
                    return {
                        action: 'add',
                        uuid: promise[0].tag_uuid
                    };
                }else if(promise.length === 0){
                    return {
                        action: 'new'
                    };
                }
            });
        })
        .then(function(result){
            var actionPromises = [];
            var temp;
            for(var i = 0; i < result.length; i += 1){
                if(result[i].action === 'add'){
                    temp = connection.queryAsync('UPDATE `tag` SET `tag_count` = `tag_count` + 1 WHERE `tag_uuid` = ?; UPDATE `tag` SET `tag_puuids` = CONCAT(`tag_puuids`, ",", ?) WHERE `tag_uuid` = ?', [result[i].uuid, post_uuid, result[i].uuid]);
                }else{
                    var newtagUuid = uuid.v4();
                    temp = connection.queryAsync('INSERT INTO `tag` (`tag_uuid`, `tag_name`, `tag_puuids`) VALUES (?, ?, ?)', [newtagUuid, tagArr[i], post_uuid]);
                }
                actionPromises.push(temp);
            }
            return actionPromises;
        })
        .Promise.all(result)
        .catch(function(err){
            throw err;
        });
    }
});
// 文章连接
router.get('/:hash', function(req, res, next){
    connection.queryAsync('UPDATE `post` SET `post_read` = `post_read` + 1 WHERE `post_hash` = ?', [req.params.hash])
    .then(function(){
        return connection.queryAsync('SELECT * FROM `post` WHERE `post_hash` = ?', [req.params.hash]);
    })
    .then(function(result){
        var postSet = {};
        for(var x in result[0]){
            postSet[x] = result[0][x];
        }
        postSet.post_content = marked(result[0].post_content);
        var tempTagArr = postSet.post_tags.split(',');
        var tempTagSet = [];
        for(var i = 0; i < tempTagArr.length; i += 1){
            tempTagSet.push({
                post_tagname: tempTagArr[i]
            });
        }
        postSet.post_tags = tempTagSet;
        postSet.post_time = moment(postSet.post_time).format('YYYY年M月D日 HH:MM:SS 发表');
        var postBread = {
            bread_href: '/blog/' + postSet.post_hash,
            bread_isActive: '',
            bread_name: postSet.post_title,
        };
        var tempBread = breadSel('blogBread');
        tempBread.push(postBread);
        res.render('blog-post', {
            bread: tempBread,
            layout: '/index/layout-blog',
            postSet: postSet,
            css: [{
                css_name: 'blog.css'
            }, {
                css_name: 'blog-post.css'
            }, {
                css_name: 'markdown.css'
            }],
            js: [{
                js_name: 'blog-post.js'
            }]
        });
    })
    .catch(function(err){
        throw err;
    });
});
// 发表博文 结束

module.exports = router;
