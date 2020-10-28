//每次调用$.ajax的时候  会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求时  统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
}) 