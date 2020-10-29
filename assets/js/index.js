//入口函数
$(function () {
    //获取用户信息
    getUserInfo()
    // console.log(1);

    //退出
    var layer = layui.layer
    $('#btnLogOut').on('click', function () {
        layer.confirm('确定是否退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //清空token
            localStorage.removeItem('token')
            //跳转到登录页面
            location.href = '/login.html'
            //关闭询问框
            layer.close(index);
        });
    })


})

// 在外面封装  后面害的调用这个函数
function getUserInfo() {
    // console.log(123);
    //发送ajax请求
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            //判断状态
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //请求成功时 调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        }
    })

    function renderAvatar(user) {
        // console.log(111);
        //1用户名(昵称优先  没有昵称用username)
        var name = user.nickname || user.username
        $('#welcome').html("欢迎&nbsp;&nbsp;" + name)
        //2用户头像
        //判断 如果有头像  就显示头像 把头像的属性改成user.user_pic  文字头像隐藏   否则相反
        if (user.user_pic !== null) {
            //有头像
            $('.layui-nav-img').show().attr('src', user.user_pic)
            $('.user-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            var text = name[0].toUpperCase()
            $('.user-avatar').html(text).show()
        }
    }
}