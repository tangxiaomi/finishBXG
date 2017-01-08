
/**
 * 讲师管理
*/

define(['jquery', '../utils', 'template', 'datepicker', 'language', 'validate', 'form'], function ($, utils, template) {
	// 设置导航
	utils.setMenu('/teacher/list');

	// 获取讲id
	var tc_id = utils.qs('tc_id'),
		teacher = $('#teacher'),
		html;

	// 编辑要发请求，添加不发请求

	if(tc_id) { // 编辑
		
		$.ajax({
			url: '/api/teacher/edit',
			type: 'get',
			data: {tc_id: tc_id},
			success: function (info) {
				if(info.code == 200) {
					// 标题
					info.result.title = '讲师编辑';

					info.result.btnText= ' 修 改 ';
					// 模板引擎
					html = template('teacherTpl', info.result);
					// 添加DOM
					teacher.html(html);
					// 
					dealForm('/api/teacher/update');
				}
			}
		});		
	} else { // 添加
		
		// 模板引擎
		html = template('teacherTpl', {
			title: '讲师添加',
			tc_gender: 0,
			btnText: ' 添 加 '
		});

		// 添加DOM
		teacher.html(html);

		// 
		dealForm('/api/teacher/add');
	}

	// 对表单进行验证并提交表单
	function dealForm(url) {
		$('#teacherForm').validate({
			onKeyup: true,
			sendForm: false,
			// 当表单合法会触发此回调
			valid: function () {
				// this 是指当前表单元素
				$(this).ajaxSubmit({
					url: url,
					type: 'post',
					success: function (info) {
						console.log(info);
					}
				});
			},
			// 当任何一表单元素不合法，会调用
			eachInvalidField: function () {
				// this 是指不合法表单
				$(this).closest('.form-group')
				.removeClass('has-success')
				.addClass('has-error');
			},
			// 当任何一表单元素合法，会调用
			eachValidField: function () {
				// this 是指合法表单
				$(this).closest('.form-group')
				.removeClass('has-error')
				.addClass('has-success');
			},
			description: {
				// 用户名
				tcName: {
					required: '不能为空'
				},
				// 密码
				tcPass: {
					required: '密码不能为空',
					pattern: '只能是6位数字'
				}
			}
		});
	}
});