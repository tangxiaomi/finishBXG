
require.config({
	baseUrl: '/public',
	paths: {
		jquery: 'assets/jquery/jquery',
		cookie: 'assets/jquery-cookie/jquery.cookie',
		bootstrap: 'assets/bootstrap/js/bootstrap.min',
		uploadify: 'assets/uploadify/jquery.uploadify.min',
		Jcrop: 'assets/Jcrop/js/Jcrop.min',
		form: 'assets/jquery-form/jquery.form',
		region: 'assets/jquery-region/jquery.region',
		validate: 'assets/jquery-validate/jquery-validate.min',
		datepicker: 'assets/bootstrap-datepicker/js/bootstrap-datepicker.min',
		language: 'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
		template: 'assets/artTemplate/template',
		nprogress: 'assets/nprogress/nprogress',
		ckeditor: 'assets/ckeditor/ckeditor'
	},
	shim: {
		bootstrap: {
			deps: ['jquery']
		},
		validate: {
			deps: ['jquery']
		},
		Jcrop: {
			deps: ['jquery']
		},
		uploadify: {
			deps: ['jquery']
		},
		language: {
			deps: ['jquery', 'datepicker']
		},
		ckeditor: {
			exports: 'CKEDITOR'
		}
	}
});
