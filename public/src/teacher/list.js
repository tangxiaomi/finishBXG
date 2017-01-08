
/*
** 讲师列表
*/

define(['jquery', 'template', '../utils'], function ($, template, utils) {
	// 设置导航
	utils.setMenu('/teacher/list');

	var teacherList = $('#teacherList'),
		teacherModal = $('#teacherModal');

	// 模块具体逻辑
	$.ajax({
		url: '/api/teacher',
		type: 'get',
		success: function (info) {
			if(info.code == 200) {
				// 通过模板引擎将数据放到页面中
				var html = template('tpl', {list: info.result});
				// 添加DOM
				teacherList.html(html);
			}
		}
	});

	// 查看讲师
	teacherList.on('click', '.preview', function () {

		// 获取讲师ID（父元素的自定义属性中）
		var tc_id = $(this).closest('td').attr('data-id');

		$.ajax({
			url: '/api/teacher/view',
			type: 'get',
			data: {tc_id: tc_id},
			success: function (info) {
				console.log(info);
				if(info.code == 200) {
					// 处理家乡数据，去掉分隔线|
					var hometown = info.result.tc_hometown
					info.result.tc_hometown = hometown.split('|').join(' ');
					// 模板引擎
					var html = template('teacherTpl', info.result);
					// 添加DOM
					teacherModal.find('table').html(html);
					// 调用模态框
					teacherModal.modal();
				}
			}
		});
	});

	// 注销/启用讲师
	teacherList.on('click', '.handle', function () {
		var _this = $(this),
			parent = _this.closest('td'),
			// 获取讲师ID
			tc_id = parent.attr('data-id'),
			// 讲师状态
			tc_status = parent.attr('data-status');
		
		// 发送请求
		$.ajax({
			url: '/api/teacher/handle',
			type: 'post',
			data: {tc_id: tc_id, tc_status: tc_status},
			success: function (info) {
				if(info.code == 200) {
					if(tc_status == 0) {
						_this.text('启 用');
					} else {
						_this.text('注 销');
					}
					// 更新讲师状态
					parent.attr('data-status', info.result.tc_status);
				}
			}
		})
	})
});