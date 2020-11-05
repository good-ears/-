$(function () {
    getInfo()
    // 退出
    $("#btnLogout").on("click", function () {
        layer.confirm('你确定退出?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem("token");
            location.href = "/login.html"
            layer.close(index);
        });

    })

})
// 获取用户信息
function getInfo() {
    $.ajax({
        url: "/my/userinfo",
        method: "GET",
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // console.log(res);
            renderAvater(res.data);
        },
    })
}
// 渲染用户的头像
function renderAvater(user) {
    // console.log(user);
    var name = user.nickname || user.username;
    // console.log(user.username);
    $("#welcome").html("欢迎&nbsp;&nbsp" + name);
    if (!!user.user_pic) {
        $(".text-avatar").hide();
        $(".layui-nav-img").attr("src", user.user_pic);
    } else {
        // console.log(name);
        $(".text-avatar").html(name[0].toUpperCase()).show();
        $(".layui-nav-img").hide();
    }
}