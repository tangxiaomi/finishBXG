
/*
** 课程创建
*/

define(['jquery', '../utils', 'validate', 'form'], function ($, utils) {
	// 设置导航
	utils.setMenu('/course/add');

	$('#addForm').validate({
		sendForm: false,
		valid: function () {
			$(this).ajaxSubmit({
				url: '/api/course/create',
				type: 'post',
				success: function (info) {
					if(info.code == 200) {
						location.href = '/course/basic?cs_id=' + info.result.cs_id;
					}
				}
			});
		}
	});

});