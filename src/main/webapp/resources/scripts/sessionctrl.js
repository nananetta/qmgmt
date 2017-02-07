var app = angular.module('MyApp');

app.factory('sessionFactory', [ '$resource', function($resource) {
    return $resource('/qmgmt/user/getProfile', {}, {
	get : {
	    method : 'GET',
	    headers : {
		'Accept' : 'application/json',
		'Content-Type' : 'application/json'
	    }
	}
    });
} ])


app.controller('SessionCtrl', function ($scope, sessionFactory, $rootScope) {
	var self = this;
	self.roleId = undefined;
	self.roleCode = undefined;
	self.userName = undefined;
	
	sessionFactory.get().$promise.then(function(result) {
			self.userName = result.userName;
			var roles = result.roles;
			if(roles != undefined) {
		    	self.roleId = roles[0].id;
		    	self.roleCode = roles[0].roleCode;
		    	$rootScope.$broadcast('roleCode', self.roleCode);
			}
		}, function(error) {
			console.log("error getting roleFactory");
		});
});

