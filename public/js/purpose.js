$(document).ready(function() {
    $("[data-toggle='popover']").popover();
    $('.jumbotron a').on('click', function() {
        alert('你的生命减少了1秒');
    });
});
