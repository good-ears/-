$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value > 6) {
                return "昵称必须在1~6个字符之间"
            }
        }
    })

    GetUser();
    // 请求数据
    function GetUser() {
        $.ajax({
            url: "/my/userinfo",
            method: "GET",
            success: function (res) {
                if (res.status !== 0) {
                    return "shibai"
                }
                form.val("formUserInfo", res.data)
            }

        })
    }
    // 重置
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        GetUser()
    })

    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg("更改成功")
                window.parent.getInfo();
            }
        })
    })

})