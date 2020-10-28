$(function () {
    //1点击去注册账号  登录区域隐藏  注册区域显示
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //1.1点击去登录  登录区域显示  注册区隐藏
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 2自定义验证规则
    var form = layui.form
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function (value) {
            // 获取注册密码框里的值
            var pwd = $('.reg-box input[name=password]').val()
            //判断
            if (value !== pwd) {
                return "两次密码输入不一致  请重新输入"
            }
        }

    })
    //3监听注册表单提交事件
    var layer = layui.layer
    $('#form-reg').on('submit', function (e) {
        console.log(123);
        //阻止表单默认提交
        e.preventDefault()
        //ajax 提交
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val(),
            },
            success: function (res) {
                console.log(res);
                //返回状态判断
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                // 提交成功后处理代码
                layer.msg("注册成功,请登录")
                //手动切换到登录区域
                $('#link-login').click()
                //重置注册表单
                $('#form-reg')[0].reset()

            }
        })
    })

    //4登录功能(给form表单注册绑定事件)
    $('#form-login').submit(function (e) {
        //阻止表单默认提交
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            //获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                //效验表单状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //成功的话
                //提示信息  保存token  跳转页面
                layer.msg("登录成功")
                //保存token
                localStorage.setItem('token', res.token)
                //跳转
                location.href = "/index.html"
            }
        })
    })
})