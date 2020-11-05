$(function () {
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_login").on("click", function () {
        $(".reg-box").hide();
        $(".login-box").show();
    })

    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var valuepwd = $(".reg-box [name = password]").val();
            if (value !== valuepwd) {
                return "两次密码不一样"
            }
        }
    })
    // 注册
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val()
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 123wretgsdfrtera
                location.href = "/login.html"
            }
        })
    })
    // 登录
    $("#form_login").on("submit", function (e) {
        e.preventDefault();
        // 快速获取表单元素
        var forms = $(this).serialize();
        // console.log(forms);
        $.post("/api/login", forms, function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            localStorage.setItem('token', res.token)
            // console.log(localStorage.getItem('token'));
            location.href = "/index.html"
        })
    })


})