var atlatl = {};

atlatl.App = function() {
	this.routes = {};
	this.controllers = {};
	
	this.serve = function() {
		var route = window.location.hash.substring(1);
		
		if(route == '') {
			route = '/';
		}
		
		var controller = this.routes[route];
		
		if(this.controllers[controller]) {
			return this.controllers[controller]();
		} else {
			console.log("Unknown route '" + route + "'")
		}
	}
}