var app = angular.module('MyApp');

app.factory('session', [ '$resource', function($resource) {
    return $resource('/rest/admin/devtools/services/refdata', {}, {
	get : {
	    method : 'GET',
	    headers : {
		'Accept' : 'application/json',
		'Content-Type' : 'application/json'
	    }
	}
    });
} ])


app.controller('SessionCtrl', function ($scope, session) {
	var self = this;

});

