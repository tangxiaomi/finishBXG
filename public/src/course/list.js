
/*
** 课程列表
*/

define(['jquery', '../utils', 'template'], function ($, utils, template) {
	// 设置导航
	utils.setMenu('/course/list');

	$.ajax({
		url: '/api/course',
		type: 'get',
		success: function (info) {
			console.log(info);
			if(info.code == 200) {
				var html = template('courseTpl', {list: info.result});
				$('#course').append(html);
			}
		}
	})
});