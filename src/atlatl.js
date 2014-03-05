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
	
	ajax: function(url, callback) {
		this.bindFunction = function(caller, object) {
			return function() {
            	return caller.apply(object, [object]);
            };
        };

        this.stateChange = function(object) {
            if(this.request.readyState==4) {
                this.callbackFunction(this.request.responseText);
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

        this.postBody = (arguments[2] || "");

        this.callbackFunction = callback;
        this.url=url;
        this.request = this.getRequest();

        if(this.request) {
            var req = this.request;
	        req.onreadystatechange = this.bindFunction(this.stateChange, this);

	        if(this.postBody !== "") {
	        	req.open("POST", url, true);
	            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	            req.setRequestHeader('Connection', 'close');
	        } else {
	            req.open("GET", url, true);
	        }

	        req.send(this.postBody);
        }
	}
}