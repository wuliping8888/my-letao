$(function(){
    //刚开始进入要判断用户是否登录，如果没有登录要打回到登录页
    $.ajax({
        url: "/employee/checkRootLogin",
        success: function (backdata) {
            // console.log(backdata);
            if (backdata.error == 400) {
                window.location.href = "login.html"
            }
        }
    })

    //点击左边的按钮，会隐藏侧边栏，再点击会显示侧边栏
    $('#right .header a').first().click(function () {
        $('#left').toggle();
        $('#right').toggleClass('pad')
    })
    //点击右边的按钮会弹出模态框
    $('#right .header a').last().click(function () {
        $('#myModal').modal('show')
    })

    //点击确定退出的时候跳转到登录页,点击退出的时候要调用退出的接口，否则下次输入首页地址会直接登录进来
    $('#myModal .modal-footer button').last().click(function () {
        $.ajax({
            url: "/employee/employeeLogout",
            success: function (backdata) {
                // console.log(backdata)
                window.location.href = "./login.html"
            }
        })
    })

    //点击分类管理的时候收起隐藏下面的分级
    $('#left .content ul li').eq(1).children('a').click(function(){
        $('#left .content ul li').eq(1).children('ol').slideToggle();
    })
})