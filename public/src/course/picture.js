
/*
** 课程封面
*/

define(['jquery', '../utils', 'template', 'uploadify', 'Jcrop', 'form'], function ($, utils, template) {
	// 设置导航
	utils.setMenu('/course/add');

	// 获取课程ID
	var cs_id = utils.qs('cs_id'),
		picture = $('#picture'),
		html;

	$.ajax({
		url: '/api/course/picture',
		type: 'get',
		data: {cs_id: cs_id},
		success: function (info) {
			// 调用模板引擎
			html = template('pictureTpl', info.result);
			// 添加DOM
			picture.html(html);

			// 全局获取DOM元素
			var preview = $('.preview img'),
				jcrop_api;

			// 上传封面图
			$('#upfile').uploadify({
				width: 70,
				height: 'auto',
				buttonText: '选择图片',
				fileTypeExts: '*.gif; *.jpg; *.png',
				fileSizeLimit: '2MB',
				buttonClass: 'btn btn-success btn-sm',
				fileObjName: 'cs_cover_original',
				formData: {cs_id: cs_id},
				itemTemplate: '<span></span>',
				uploader: '/api/uploader/cover',
				swf: '/public/assets/uploadify/uploadify.swf',
				onUploadSuccess: function (file, data) {
					// 将json数据转成对象
					data = JSON.parse(data);
					if(data.code == 200) {
						// 显示图片
						preview.attr('src', data.result.path);

						// 调用裁切
						imageCrop();

						// 改变按钮状态
						$('#crop')
						.prop('disabled', false)
						.attr('data-status', 'save')
						.val('保存图片');
					}
				}
			});

			// 实时获得裁切尺寸
			preview.parent().on('cropmove cropend', function (a, b, c) {
				// 将实时的参数，放到form中
				$('#x').val(c.x);
				$('#y').val(c.y);
				$('#w').val(c.w);
				$('#h').val(c.h);
			});

			// 保存或裁切
			$('#crop').on('click', function () {

				var _this = $(this);

				// 根据按钮状态处理不同逻辑
				if(_this.attr('data-status') == 'save') {
					// 保存
					// 将裁切的尺寸传给后端
					$('#coords').ajaxSubmit({
						url: '/api/course/update/picture',
						type: 'post',
						data: {cs_id: cs_id},
						success: function (info) {
							if(info.code == 200) {
								// 跳转下一步
								location.href = '/course/lesson?cs_id=' + info.result.cs_id;
							}
						}
					});

				} else {
					// 存储一个状态
					_this.attr('data-status', 'save');
					// 改变按钮文字
					_this.val('保存图片');
					// 调用裁切
					imageCrop();
				}
			});

			// 图片裁切
			function imageCrop() {
				// 保证只有一个实例
				jcrop_api && jcrop_api.destroy();

				// 调用插件
				preview.Jcrop({
					// 比例
					aspectRatio: 2,
					// 盒子尺寸
					boxWidth: 400,
					// setSelect: [0, 0, 100, 100]
				}, function () {
					jcrop_api = this;

					// 获取图片原始尺寸
					var width = this.ui.stage.width,
						height = this.ui.stage.height,
						// 根据盒子尺寸设置选区
						w = width,
						h = width / 2,
						x = 0,
						y = (height - h) / 2;

					// 初始化选区
					this.newSelection();
					// 设置默认选区尺寸
					this.setSelect([x, y, w, h]);
					// 缩略图
					thumbnail = this.initComponent('Thumbnailer', {
						width: 240,
						height: 120,
						thumb: '.thumb'
					});

					// 调整缩略图定位坐标
					$('.jcrop-thumb').css({
						left: 0,
						top: 0
					});
				});
			}
		}
	});
})