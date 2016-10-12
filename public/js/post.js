$(document).ready(function(){
    var oDate = new Date();
    $('.blog-post').on('click', function(){
        $.ajax({
            url: '/blog/post',
            type: 'POST',
            data: {
                title: $('.blog-input-title').val(),
                tag: $('.blog-input-tag').val(),
                brief: $('.blog-input-brief').val(),
                text: $('.blog-input-text').val(),
                pw: $('.blog-input-pw').val()
            },
            success: function(result){
                console.log(result);
                if(result === 'wrong'){
                    alert('密码错误');
                }
            }
        });
    });
});
