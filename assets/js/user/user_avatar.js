$(function () {
    var layer = layui.layer;
    // 裁剪
    var $images = $("#image")
    const options = {

        aspectRatio: 1,
        viewMode: 1,
        // 定义预览区
        preview: ".img-preview"
    };
    // 创建一个裁剪区
    $images.cropper(options)

    $("#btnChooseImage").on("click", function () {
        $("#file").click();
    })
    // file 发生改变
    $("#file").on("change", function () {
        // 获取用户选择的图片
        var files = $(this)[0].files[0]
        // console.log(files);
        // 将文件转换为路径
        var imgURL = URL.createObjectURL(files);
        // console.log(imgURL);

        $images.cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    // 点击确定
    $("#btnUpload").on("click", function () {
        // console.log(123);
        var dataURL = $images
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更换头像成功！')
                window.parent.getInfo();
            }
        })
    })

})






