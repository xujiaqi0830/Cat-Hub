/*jshint -W030 */

$(document).ready(function(){
    var oCurtain = $('.curtain').get(0);
    var nowCurtain = 0;
    var totalCurtain = 4;
    var clickIndex;
    $(window).resize(resizeInit);

    // 自适应轮播窗帘
    + function(){

        // 初始化导航按钮
        for(var i = 0;i < totalCurtain; i += 1){
            $('.pic-navset').append('<div class="curtain-btn"></div>');
        }
        var marLeft = - $('.pic-navset').outerWidth() / 2 + 'px';
        $('.pic-navset').css('margin-left', marLeft);
        $('.pic-navset').children().eq(0).addClass('curtain-active');

        // 初始化窗帘高度，等比例图片
        var curtainHeight = $('.curtain').outerWidth() * 250 / 1024 + 'px';
        $('.curtain').css('height', curtainHeight);

        // 初始化运动：左-右
        oCurtain.timer = setInterval(function(){
            curtainMove('right', 1000);
        },1500);
    }();

    $('.curtain-btn').on('click', function(){
        curtainClick($(this).index());
    });

    // 调整窗口初始化
    function resizeInit(){
        var curtainHeight = $('.curtain').outerWidth() * 250 / 1024 + 'px';
        $('.curtain').css('height', curtainHeight);
    }

    // 窗帘序号helper
    function nowCurtainNumber(isPlus){
        var _nowCurtain = nowCurtain;
        if(isPlus === '+1'){
            _nowCurtain += 1;
            if(_nowCurtain > totalCurtain - 1){
                _nowCurtain = 0;
            }
        }else if(isPlus === '-1'){
            _nowCurtain -= 1;
            if(_nowCurtain < 0){
                _nowCurtain = totalCurtain - 1;
            }
        }
        return _nowCurtain;
    }

    // 窗帘运动
    function curtainMove(direction, ms){
        if(direction === 'right'){
            nowCurtain = nowCurtainNumber('+1');
            $('.imgset').animate({left: '+=' + $('.curtain').outerWidth() + 'px'}, ms, function(){
                // nowCurtain = nowCurtainNumber('+1');
                $('.curtain-img:last').insertBefore($('.curtain-img:first'));
                $('.imgset').css('left', '-100%');
                $('.curtain-img:first').attr('src', 'img/curtain/' + (nowCurtainNumber('+1') + 1) + '.png');
                $('.curtain-btn').removeClass('curtain-active');
                $('.curtain-btn').eq(nowCurtain).addClass('curtain-active');
            });
        }else if(direction === 'left'){
            nowCurtain = nowCurtainNumber('-1');
            $('.imgset').animate({left: '-=' + $('.curtain').outerWidth() + 'px'}, ms, function(){
                // nowCurtain = nowCurtainNumber('-1');
                $('.curtain-img:first').insertAfter($('.curtain-img:last'));
                $('.imgset').css('left', '-100%');
                $('.curtain-img:last').attr('src', 'img/curtain/' + (nowCurtainNumber('-1') + 1) + '.png');
                $('.curtain-btn').removeClass('curtain-active');
                $('.curtain-btn').eq(nowCurtain).addClass('curtain-active');
            });
        }
    }

    // 窗帘点击
    function curtainClick(index){
        clickIndex = index;
        if(index === nowCurtain) return;
        clearInterval(oCurtain.timer);
        var direction = 'right';
        var abs1 = Math.abs(nowCurtain - index);
        var abs2 = totalCurtain - abs1;
        var eq1 = nowCurtain > index ? 1 : -1;
        var eq2 = abs1 > abs2 ? 1 : -1;
        if(eq1 * eq2 === -1) direction = 'left';
        console.log(abs1);
        console.log(abs2);
        console.log({
            distance: Math.min(abs1, abs2),
            direction: direction
        });
        oCurtain.timer = setInterval(function(){
            console.log('nowCurtain:' + nowCurtain);
            console.log('clickIndex:' + clickIndex);
            curtainMove(direction, 100);
            if(nowCurtain === clickIndex){
                console.log('到了！');
                clearInterval(oCurtain.timer);
                oCurtain.timer = setInterval(function(){
                    curtainMove('right', 1000);
                },1500);
            }

        },400);


    }

});
