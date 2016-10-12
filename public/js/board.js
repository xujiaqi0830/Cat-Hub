/*jshint -W030 */

$(document).ready(function() {
    // navigator.geolocation.getCurrentPosition(function(ev){
    //     console.log(ev.coords);
    // }, function(ev){
    //     console.log('获取地址失败');
    // });

    // 读取更多留言 开始
    + function(){
        $('.more').on('click', function(){
            var lastID = getCookie('lastBoardID');
            if(lastID){
                $.get('/board/get-more', {
                    lastID: lastID,
                    random_seed: ~~ (Math.random() * 1000)
                }, function(data, textStatus){
                    for(var i = 0; i < data.length; i += 1){
                        $($('.more')).before(generateDiv(data[i].msg_name, data[i].msg_time, data[i].msg_text, data[i].msg_id, true));
                        if(i === data.length - 1){
                            setCookie('lastBoardID', data[i].msg_id);
                        }
                    }
                });
            }
        });
    }();
    // 读取更多留言 结束
    // 读取Cookie记住用户名 开始
    + function(){
        var usrname = getCookie('board-username');
        if(usrname){
            $('#edit-zone input').val(usrname);
        }
    }();
    // 读取Cookie记住用户名 结束
    // 留言按钮 开始
    + function(){
        // 按钮点击
        $('#edit-zone a').on('click', function() {
            var inputText = $('#edit-zone textarea').val();
            var inputAuthor = $('#edit-zone input').val();
            if (!(inputText && inputAuthor)) {
                alert('输入框内容均不能为空');
            } else if ((!regUsername(inputAuthor)) || (!regContent(inputText))) {
                alert('以空格开头/结尾是不对的！');
                if (!regUsername(inputAuthor)) {
                    $('#edit-zone .name').html('').focus();
                }
                if (!regContent(inputText)) {
                    $('#edit-zone textarea').html('').focus();
                }
            } else if (inputText.length > 140 || inputAuthor.length > 20) {
                alert('输入框内不得超过140个字符，用户名不得超过20个字符！');
            } else {
                // cookie存储用户名
                if($('.check-div input').prop('checked') === true){
                    setCookie('board-username', '1', -1);
                    setCookie('board-username', inputAuthor, 30);
                }else{
                    setCookie('board-username', '1', -1);
                }
                //防止频繁点击
                $('#edit-zone a').attr('disabled', 'disabled');
                var countClick = 3;
                $('#edit-zone a').html('冷却时间' + countClick + '秒');
                var timerCounter = setInterval(function() {
                    if (countClick == 1) {
                        clearInterval(timerCounter);
                        $('#edit-zone a').removeAttr('disabled');
                        $('#edit-zone a').html('猛击这里发表');
                        return;
                    }
                    countClick -= 1;
                    $('#edit-zone a').html('冷却时间' + countClick + '秒');
                }, 1000);
                $.get('/board/confirm', {
                    text: inputText,
                    author: inputAuthor,
                    random_seed: ~~ (Math.random() * 1000)
                }, function(data, textStatus) {
                    $($('#edit-zone')).after(generateDiv(data.author, data.time, data.content, data.id, false));
                    $('.msg').eq(0).css('display', 'none');
                    $('.msg').eq(0).fadeIn(1200);
                    //显示添加成功方框
                    $('.confirm-bar').css({
                        'left': $(window).width() / 2 + 'px',
                        'top': $(document).scrollTop() + $(window).height() / 2 + 'px'
                    });
                    $('.confirm-bar').fadeIn().delay(1300).fadeOut();
                });
            }
        });
        // 留言按钮 结束
        // 验证用户名，文本框 开始
        function regUsername(name) {
            var re = /^\S+[\s\w\u4E00-\u9FA5\uF900-\uFA2D]*\S+$/img;
            return re.test(name);
        }

        function regContent(text) {
            var re = /^\s{0,2}\S+[\s\w\u4E00-\u9FA5\uF900-\uFA2D]*\S+$/img;
            return re.test(text);
        }
        // 验证用户名，文本框 结束
    }();

    // 公用函数 开始
        // 创建留言块
    function generateDiv(username, time, text, id, isDisplay) {
        var display = isDisplay ? '' : ' style="display: none"';
        return '<div class="msg clearfix"' + display + '>' +
            '<div class="msg-left">' +
            '<p class="username">' + username + '</p>' +
            '<p class="time">' + time + '</p>' +
            '</div>' +
            '<div class="msg-right">' +
            '<div class="msg-text">' + text + '</div>' +
            '</div>' +
            '<div class="msg-id">#' + id + '</div>' +
            '</div>';
    }

        // 设置cookie
    function setCookie(name, value, iDay){
    	if(iDay){
    		var oDate = new Date();
    		oDate.setDate(oDate.getDate() + iDay);
    		oDate.setHours(0, 0, 0, 0);
    		document.cookie = name + '=' + value + '; PATH = /; EXPIRES = ' + oDate.toGMTString();
    	}else{
    		document.cookie = name + '=' + value + '; PATH = /';
    	}
    }

        // 获取cookie
    function getCookie(name){
    	var arr = document.cookie.split('; ');
    	for(var i = 0; i < arr.length; i += 1){
    		var arr2 = arr[i].split('=');
    		if(arr2[0] == name){
    			return arr2[1];
    		}
    	}
    }
    // 公用函数 结束
});
