
// 将原来代码包装成模块
// 将原来代码用define方法包起就可以了
define(['jquery', 'template', 'cookie'], function ($, template) {
	// 通过检测cookie中有没有PHPSESSID来判断用户是否登录
	// 除了登录页面以外都要进行检测

	var pathname = location.pathname;
	if(pathname != '/index.php/login' && !$.cookie('PHPSESSID')) {
		location.href = '/index.php/login';
	}

	// 设置用户信息
	var loginfo = $.cookie('loginfo') && JSON.parse($.cookie('loginfo'));

	var html = template('tpl', loginfo);

	$('.aside .profile').html(html);

});













