var atlatl = {
	App: function() {
		var that = this;

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

		window.onhashchange = function(e) {
			that.serve();
			return false;
		}
	},
	
	ajax: function(settings) {
        this.stateChange = function(object) {
            if(that.request.readyState == 4) {
				var result = null;
				if(that.type == 'json') {
					result = JSON.parse(that.request.responseText);
				} else {
					result = that.request.responseText;
				}
                that.success(result);
			}
        };

        this.getRequest = function() {
            if(window.ActiveXObject) {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
			else if(window.XMLHttpRequest) {
                return new XMLHttpRequest();
			}
            return false;
        };

		function preparePost(data) {
			var post = '';
			for(var key in data) {
				if(post.length > 0) post+= '&';
				post+= encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
			}
			
			return post;
		}

		// Defaults
		var that = this;
		this.method = 'GET';
		this.data = {};
		this.type = 'raw';
		this.success = null;
		this.error = null;
        this.request = this.getRequest();

		// Reading the provided settings.
		if(!settings.url) {
			console.log('No URL provided!');
			return false;
		}
		this.url = settings.url;
		if(settings.method) this.method = settings.method.toUpperCase();
		if(settings.data) this.data = settings.data;
		if(settings.type) this.type = settings.type.toLowerCase();
		if(settings.success) this.success = settings.success;
		if(settings.error) this.error = settings.error;

        if(this.request) {
            var req = this.request;
	        req.onreadystatechange = this.stateChange;
	        req.open(this.method, this.url, true);
	        req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		    req.setRequestHeader('Connection', 'close');
		
			if(this.data) {
	        	req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
				req.send(preparePost(this.data));
			} else {
				req.send();
			}
        }
	}
}