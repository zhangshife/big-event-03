$(function () {
    //1自定义验证规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1~6为之间"
            }

        }
    })

    //2用户渲染
    initUserInfo()
    //导出layer
    var layer = layui.layer
    //封装函数
    function initUserInfo() {
        //发送ajax请求
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                //判断
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('获取用户信息成功')
                //渲染到页面
                form.val('formUserInfo', res.data)
            }
        })

    }
    // 3表单重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        //重新渲染页面
        initUserInfo()
    })

    // 4修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("用户信息修改成功")
                //调用父页面中的更新用户信息和头像方法
                window.parent.getUserInfo()
            }
        })
    })
})