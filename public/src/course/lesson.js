
/*
** 课时管理
*/

define(['jquery', '../utils', 'template', 'form'], function ($, utils, template) {
	// 设置导航
	utils.setMenu('/course/add');

	// 课程ID
	var cs_id = utils.qs('cs_id'),
		lesson = $('#lesson'),
		lessonModal = $('#lessonModal'),
		html;

	$.ajax({
		url: '/api/course/lesson',
		type: 'get',
		data: {cs_id: cs_id},
		success: function (info) {
			console.log(info);
			if(info.code == 200) {
				// 调用模板引擎
				html = template('lessonTpl', info.result);
				// 添加DOM
				lesson.html(html);
			}
		}
	});

	// 添加
	lesson.on('click', '.add', function () {
		// 模板引擎
		html = template('modalTpl', {
			title: '添加课时',
			ct_cs_id: cs_id,
			btn_text: '添 加',
			action: '/api/course/chapter/add'
		});
		// 添加DOM
		lessonModal.find('.modal-content').html(html);
		// 显示模态框
		lessonModal.modal();
	});

	// 编辑
	lesson.on('click', '.edit', function () {
		var _this = $(this),
			parent = _this.parent(),
			ct_id = parent.attr('data-id');

		// 获取要编辑的内容
		$.ajax({
			url: '/api/course/chapter/edit',
			type: 'get',
			data: {ct_id: ct_id},
			success: function (info) {
				console.log(info);
				if(info.code == 200) {
					// 标题
					info.result.title = '编辑课时';
					// 请求地址
					info.result.action = '/api/course/chapter/modify';
					// 按钮文字
					info.result.btn_text = '修 改',
					// 模板引擎
					html = template('modalTpl', info.result);
					// 添加DOM
					lessonModal.find('.modal-content').html(html);
					// 显示模态框
					lessonModal.modal();
				}
			}
		});
	})

	// 处理表单(添加/编辑)
	lessonModal.on('submit', 'form', function () {
		var _this = $(this),
			is_free = _this.find('.is_free')[0].checked ? 1 : 0;

		_this.ajaxSubmit({
			// url: '/api/course/chapter/add',
			type: 'post',
			data: {ct_is_free: is_free},
			success: function (info) {
				console.log(info);
				lessonModal.modal('hide');
			}
		});

		return false;
	});
});