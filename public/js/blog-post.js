/*jshint -W030 */

$(document).ready(function(){
    // 左区块进入 开始
    + function(){
        $(".blog-container").css({
            transform: "perspective(800px) translateX(0)",
            transition: "all 0.3s ease-out",
            opacity: "1"
        });
    }();
    // 左区块进入 结束
    // 右边栏进入 开始
    + function() {
        $(".right-panel").css({
            transform: "perspective(800px) translateX(0)",
            transition: "all 0.3s ease-out",
            opacity: "1"
        });
    }();
    // 右边栏进入 结束
});
