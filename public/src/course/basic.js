
/*
** 课程基本信息
*/

define(['jquery', '../utils', 'template', 'ckeditor', 'validate', 'form'], function ($, utils, template, CKEDITOR) {
	// 设置导航
	utils.setMenu('/course/add');

	var cs_id = utils.qs('cs_id'),
		basic = $('#basic'),
		html;

	$.ajax({
		url: '/api/course/basic',
		type: 'get',
		data: {cs_id: cs_id},
		success: function (info) {
			// 模板引擎
			html = template('basicTpl', info.result);
			// 添加DOM
			basic.html(html);
			// 富文本编辑器
			CKEDITOR.replace('ckEditor', {
				// toolbarGroups: []
			});

			// 表单验证和提交
			$('#basicForm').validate({
				sendForm: false,
				valid: function () {
					// 更新富文本编辑器
					for(instance in CKEDITOR.instances) {
						CKEDITOR.instances[instance].updateElement();
					}

					$(this).ajaxSubmit({
						url: '/api/course/update/basic',
						type: 'post',
						success: function (info) {
							if(info.code == 200) {
								location.href = '/course/picture?cs_id=' + info.result.cs_id;
							}
						}
					});
				}
			});
		}
	});

	// 获得子分类
	basic.on('change', '#top', function () {
		var _this = $(this),
			cg_id = _this.val();

		$.ajax({
			url: '/api/category/child',
			type: 'get',
			data: {cg_id: cg_id},
			success: function (info) {
				if(info.code == 200) {
					// 模板
					var tpl = '{{ each list }}\
								<option value="{{ $value.cg_id }}">{{ $value.cg_name }}</option>\
							   {{ /each }}';
					// 模板引擎
					var render = template.compile(tpl);
					html = render({list: info.result});

					// 添加DOM
					_this.next('select').html(html);
				}
			}
		});
	})
});