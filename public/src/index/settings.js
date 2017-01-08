
/*
** 更改个人资料
*/

define(['jquery', 'template', 'ckeditor', 'region', 'datepicker', 'language', 'form'], function ($, template, CKEDITOR) {

	var profile = $('#profile');

	$.ajax({
		url: '/api/teacher/profile',
		type: 'get',
		success: function (info) {
			console.log(info);
			if(info.code == 200) {
				// 模板引擎
				var html = template('profileForm', info.result);
				// 添加DOM
				profile.html(html);

				// 三级联动
				$('.hometown').region({
					url: '/public/assets/jquery-region/region.json'
				});

				// 富文本编辑器
				CKEDITOR.replace('ckEditor', {
					toolbarGroups: [
				        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
				        { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
				        { name: 'links' },
				        { name: 'insert' },
				        { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
				        { name: 'others' }
					]
				});
			}
		}
	});

	// 提交表单
	profile.on('submit', 'form', function () {
		var _this = $(this);

		// 处理省市县字符形式
		var p = $('#p').find('option:selected').text();
		var c = $('#c').find('option:selected').text();
		var d = $('#d').find('option:selected').text();

		_this.ajaxSubmit({
			url: '/api/teacher/modify',
			type: 'post',
			data: {tc_hometown: p + '|' + c + '|' + d},
			success: function (info) {
				if(info.code == 200) {
					alert('修改成功!');
				}
			}
		});

		return false;
	});
})