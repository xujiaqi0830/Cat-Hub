var express = require('express');
var router = express.Router();
var connection = require('../mysql/connection');
var convertor = require('../tools/convertor');
var breadSel = require('../tools/bread').breadSel;
var fnv = require('fnv-plus');

// 留言板
router.get('/', function(req, res, next){
    connection.query('SELECT `msg_name`, `msg_text`, `msg_time`, `msg_id` FROM `msg_1` ORDER BY `msg_id` DESC LIMIT 10', function(err, rows, field){
        if(err){
            throw err;
        }
        var finalObj = [];
        for(var i = 0; i < rows.length; i += 1){
            var tempObj = {};
            for(var name in rows[i]){
                tempObj[name] = rows[i][name];
            }
            finalObj.push(tempObj);
            // 当前读取的最后一个ID写入cookie
            if(i === (rows.length - 1)){
            res.clearCookie('lastBoardID');
            res.cookie('lastBoardID', rows[i].msg_id);
            }
        }
        res.render('board', {
            msg: finalObj,
            bread: breadSel('boardBread'),
            layout: '/index/layout-board',
            js: [{
                js_name: 'board.js'
            }]
        });
    });
});
// 点击确认
router.get('/confirm', function(req, res, next){
    var inputText = req.query.text;
    var inputAuthor = req.query.author;
    var inputTime = new Date();
    var inputHash = fnv.hash(inputText + inputAuthor + inputTime + ~~ (Math.random() * 1000), 64).str();
    inputTime = convertor.toFormattedTime(inputTime);
    connection.query('INSERT INTO msg_1 (`msg_name`, `msg_text`, `msg_time`, `msg_hash`) VALUES (?, ?, ?, ?)', [inputAuthor, inputText, inputTime, inputHash], function(err){
        if(err){
            throw err;
        }
        connection.query('SELECT `msg_name`, `msg_text`, `msg_time`, `msg_id` FROM `msg_1` WHERE `msg_hash` = ?', [inputHash], function(err, rows, field){
            if(err){
                throw err;
            }
            res.send({
                content: rows[0].msg_text,
                author: rows[0].msg_name,
                time: rows[0].msg_time,
                id: rows[0].msg_id
            });
        });
    });
});
// 点击'更多'按钮
router.get('/get-more', function(req, res, next){
    var lastID = req.query.lastID;
    connection.query('SELECT msg_name, msg_text, msg_time, msg_id FROM msg_1 WHERE msg_id < (?) ORDER BY msg_id DESC LIMIT 10', [lastID], function(err, rows, field){
        if(err){
            throw err;
        }
        res.send(rows);
    });
});

module.exports = router;
