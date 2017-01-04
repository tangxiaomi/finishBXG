
require.config({
	baseUrl: '/public',
	paths: {
		jquery: 'assets/jquery/jquery',
		cookie: 'assets/jquery-cookie/jquery.cookie',
		bootstrap: 'assets/bootstrap/js/bootstrap.min',
		template: 'assets/artTemplate/template-native'
	},
	shim: {
		bootstrap: {
			deps: ['jquery']
		}
	}
});
