//每次调用$.ajax的时候  会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求时  统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    //判断
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }

    //拦截所有响应  判断身份信息
    options.complete = function (res) {
        var obj = res.responseJSON
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token')
            //强制跳转到登录页面
            location.href = '/login.html'
        }

    }
}) 