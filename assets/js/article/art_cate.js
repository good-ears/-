$(function () {
    // 获取文章数据
    getArticle()
    $("#btnAddCate").on("click", function () {
        layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $("#dialog-add").html()
        })
    })

    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
    })


})
function getArticle() {
    $.ajax({
        method: "GET",
        url: "/my/article/cates",
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // console.log(res.data);
            var t = template("tpl-table", res)
            // console.log(t);
            $("tbody").html(t)
        }
    })
}