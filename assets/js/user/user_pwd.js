$(function () {
    //1定义效验规则
    var layer = layui.layer
    var form = layui.form
    form.verify({
        //   1.1密码
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 1.2新密码
        samePwd: function (value) {
            //判断
            if (value == $('[name=oldPwd]').val()) {
                return "新密码和旧密码不能相同"
            }
        },
        // 1.3两次新密码必须相同
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return "两次密码输入不一致,请重新输入"
            }
        }
    })

    // 2表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(message)
                }
                layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})