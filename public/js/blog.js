/*jshint -W030 */

jQuery.fn.extend({
    // 定义 - 博文阶梯入场
    'stepEntrance': function(){
        $(this).css({
            'transform': 'translateX(0)',
            'opacity': '1'
        });
    },
    // 定义-博文阶梯离场，direction: 离场方向，默认右(5em)
    'stepExit': function(direction){
        var dis = '5';
        if(direction === 'left'){
            dis = '-5';
        }
        $(this).css({
            'transform': 'translateX(' + dis +'em)',
            'opacity': '0'
        });
    },
    // 定义 - 分页元件改变页数
    'updateShowPages': function(){
        var now = $(this)[0].dataset.now;
        var total = $(this)[0].dataset.total;
        $('.paging li').css({
            'pointer-events': '',
            'color': '',
            'cursor': ''
        });
        // 最前/最后页面禁用按钮
        if(now === '1'){
            $('.paging li:lt(2)').css({
                'pointer-events': 'none',
                'color': '#afafaf',
                'cursor': 'default'
            });
        }else if(now === total){
            $('.paging li:gt(2)').css({
                'pointer-events': 'none',
                'color': '#afafaf',
                'cursor': 'default'
            });
        }
        $('.pag-detail span:first').html(now);
        $('.pag-detail span:last').html(total);
    },
    // 标签加3D效果，每次翻页后需要调用
    'add3d': function(){
        $('.blog-block').on('mouseover mousemove', function(ev){
            var event = ev || window.event;
            var moveDegree = 3;
            var diffX = ev.clientX + $(window).scrollLeft() - $(this).offset().left - $(this).outerWidth() / 2;
            var diffY = ev.clientY + $(window).scrollTop() - $(this).offset().top - $(this).outerHeight() / 2;
            var tempX = - diffX / ($(this).outerWidth() / 2);
            var tempY = - diffY / ($(this).outerHeight() / 2);
            if(diffX < 0 && diffY < 0){
                $(this).css({
                    'transform': 'perspective(800px) rotateY(' + - moveDegree * ( - Math.pow(tempX, 2) + 2 * tempX) + 'deg) rotateX(' + moveDegree * ( - Math.pow(tempY, 2) + 2 * tempY) + 'deg)'
                });
            }else if(diffX > 0 && diffY < 0){
                tempX = - tempX;
                $(this).css({
                    'transform': 'perspective(800px) rotateY(' + moveDegree * ( - Math.pow(tempX, 2) + 2 * tempX) + 'deg)rotateX(' + moveDegree * ( - Math.pow(tempY, 2) + 2 * tempY) + 'deg)'
                });
            }else if(diffX < 0 && diffY > 0){
                tempY = - tempY;
                $(this).css({
                    'transform': 'perspective(800px) rotateY(' + - moveDegree * ( - Math.pow(tempX, 2) + 2 * tempX) + 'deg) rotateX(' +  - moveDegree * ( - Math.pow(tempY, 2) + 2 * tempY) + 'deg)'
                });
            }else if(diffX > 0 && diffY > 0){
                tempX = - tempX;
                tempY = - tempY;
                $(this).css({
                    'transform': 'perspective(800px) rotateY(' + moveDegree * ( - Math.pow(tempX, 2) + 2 * tempX) + 'deg)rotateX(' +  - moveDegree * ( - Math.pow(tempY, 2) + 2 * tempY) + 'deg)'
                });
            }
        });
        $('.blog-block').on('mouseout', function(){
            $(this).css({
                'transform': 'translateX(0)'
            });
        });
    }
});

$(document).ready(function(){
    // 页面读取博文阶梯入场 开始
    + function(i){
        var enterIndex = 0;
        - function(){
            var enterStepTimer = setInterval(function(){
                var tempIndex = '.blog-block:eq(' + enterIndex + ')';
                $(tempIndex).stepEntrance();
                enterIndex += 1;
                if(enterIndex === $('.blog-block').length){
                    clearInterval(enterStepTimer);
                }
            }, 120);
        }();
    }();
    // 页面读取博文阶梯入场 结束

    // 博文block悬停3D 开始
    $(document).add3d();
    // 博文block悬停3D 结束

    // 分页工具 开始
    + function(){
        $('.paging').updateShowPages();
        // 下一页按钮、快进按钮
        $('.paging li').not(":eq(2)").on('click', function(){
            var goPage = $('.paging')[0].dataset.total;
            var directionFlag;
            switch ($(this).index()){
            case 0:
                goPage = 1,
                directionFlag = "left";
                break;
            case 1:
                goPage = Number($(".paging")[0].dataset.now) - 1,
                directionFlag = "left";
                break;
            case 3:
                goPage = Number($(".paging")[0].dataset.now) + 1,
                directionFlag = "right";
                break;
            default:
                directionFlag = "right";
            }
            var exitIndex = 9;
            var exitStep = function(){
                $('.paging')[0].dataset.now = goPage;
                $('.paging').updateShowPages();
                var exitDone = $.Deferred();
                var exitStepTimer = setInterval(function(){
                    var tempIndex = '.blog-block:eq(' + exitIndex + ')';
                    $(tempIndex).stepExit(directionFlag); // 也可不传
                    exitIndex -= 1;
                    if(exitIndex === -1){
                        clearInterval(exitStepTimer);
                        exitDone.resolve();
                    }
                }, 120);
                return exitDone.promise();
            };
            $.when(exitStep(), $.ajax({
                url: '/blog/showpage',
                cache: false,
                data: {
                    'page': goPage,
                },
                dataType: 'json'
            }))
            .done(function(a, b){
                $(".blog-block").remove();
                for (var i = 0; i < b[0].newPage.length; i += 1)
                    $(".blog-container").prepend($('<div class="blog-block"></div>'));
                var isMinus = "right" === directionFlag ? "-" : "";
                $('.blog-block').css({
                    'opacity': '0',
                    'transform': "translateX(" + isMinus + "5em)"
                });
                $('.blog-block').html(function(index){
                    var tempTag = '';
                    var tempArr = b[0].newPage[index].post_tags.split(',');
                    for(var i = 0; i < tempArr; i += 1){
                        tempTag += '<a  href="/blog/tag/' + tempArr[i] + '}" class="blog-tagbag">' + tempArr[i] + '</a>';
                    }
                    return '<h2><a href="' + b[0].newPage[index].post_hash + '">' + b[0].newPage[index].post_title + '</a></h2>' +
            		tempTag +
            		'<p class="blog-brief">' + b[0].newPage[index].post_brief + '</p>' +
            		'<a class="blog-more" href="' + b[0].newPage[index].post_hash + '">点击查看全文</a>' +
            		'<div class="blog-detail clearfix">' +
            			'<p class="blog-time">' + b[0].newPage[index].post_time + ' 发布</p>' +
            			'<p class="blog-comment">评论: <span>' + b[0].newPage[index].post_comment + '</span></p>' +
            			'<p class="blog-read">阅读: <span>' + b[0].newPage[index].post_read + '</span></p>' +
            		'</div>';
                });
            })
            .done(function(){
                var enterIndex = $('.blog-block:last').index();
                - function(){
                    var enterTimer = setInterval(function(){
                        var tempIndex = '.blog-block:eq(' + enterIndex + ')';
                        $(tempIndex).stepEntrance();
                        enterIndex -= 1;
                        if(enterIndex < 0){
                            clearInterval(enterTimer);
                        }
                    }, 120);
                }();
                $('body').animate({
                    'scrollTop': "0"
                }, 150 * (enterIndex + 1), 'linear');
            })
            .then(function(){
                $(document).add3d();
            })
            .fail(function(err){
                console.log(err);
            });
        });
    }();
    // 分页工具 结束

    // 右边栏进入 开始
    +function() {
        $(".right-panel").css({
            transform: "perspective(800px) translateX(0)",
            transition: "all 0.2s ease-out",
            opacity: "1"
        });
    }();
    // 右边栏进入 结束
});
