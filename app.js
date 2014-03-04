var app = new atlatl.App();

app.routes = {
	'/': 'index'
};

app.controllers.index = function() {
	console.log('toto');
}

app.serve();
