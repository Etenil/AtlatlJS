var app = new atlatl.App();

app.routes = {
	'/': 'index',
	'/toto': 'toto'
};

app.controllers = {
	index: function() {
		HTML.query('#display').innerHTML = 'Index <a href="#/toto">toto</a>';
	},
	toto: function() {
		var data = atlatl.ajax({
			url: 'test.html',
			success: function(data) {
				HTML.query('#display').innerHTML = data;
			}
		});
	}
}

app.serve();
