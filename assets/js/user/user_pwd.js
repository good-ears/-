$(function () {
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        samePwd: function (value) {
            if (value === $("[name = oldPwd]").val()) {
                return "新旧密码不能相同"
            }
        },
        repwd: function (value) {
            console.log($("[name = newPwd]").val());
            if (value !== $("[name = newPwd]").val()) {
                return "两次密码不一致"
            }
        }
    })

    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("修改失败")
                }
                layui.layer.msg("修改成功")
                $(".layui-form")[0].reset();
            }
        })
    })
})