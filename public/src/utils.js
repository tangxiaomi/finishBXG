
/*
** 工具模块
*/

define(['jquery'], function ($) {
	return {
		// 设置选中状态
		setMenu: function (active) {
			$('.navs a[href="' + active + '"]').addClass('active');
		},
		qs: function (key) {
			// location.search 包含地址参数
			var search = location.search.slice(1);
			search = search.split('&');
			var o = {};
			for(var i=0;i<search.length;i++) {
				var temp = search[i].split('=');

				o[temp[0]] = temp[1];
			}

			return o[key];
		}
	}
});