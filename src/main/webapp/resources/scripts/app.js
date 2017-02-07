app = angular.module('MyApp', [ 'ngMaterial', 'ngMessages', 'ngRoute',
		'material.svgAssetsCache', 'ngTable', 'ngResource',
		'ngAnimate', 'angular-loading-bar' ]);

app.factory('branchFactory', [ '$resource', function($resource) {
    return $resource('/qmgmt/master/branch/getAll', {}, {
	get : {
	    method : 'GET',
	    headers : {
		'Accept' : 'application/json',
		'Content-Type' : 'application/json'
	    }
	}
    });
} ]);

app.factory('weekFactory', [ '$resource', function($resource) {
    return $resource('/qmgmt/week/getAll', {}, {
	get : {
	    method : 'GET',
	    headers : {
		'Accept' : 'application/json',
		'Content-Type' : 'application/json'
	    }
	}
    });
} ]);

app.factory('currWeekFactory', [ '$resource', function($resource) {
    return $resource('/qmgmt/week/getCurrentWeek', {}, {
	get : {
	    method : 'GET',
	    headers : {
		'Accept' : 'application/json',
		'Content-Type' : 'application/json'
	    }
	}
    });
} ]);

app.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log, $location) {

 
});

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
  }])


app.config(function($mdThemingProvider) {
	$mdThemingProvider.theme('docs-dark', 'default')
	.primaryPalette('yellow')
	.dark();

});

app.directive('emptyToNull', function() {
    return {
    	restrict : 'A',
    	require : 'ngModel',
    	link : function(scope, elem, attrs, ctrl) {
    	    ctrl.$parsers.push(function(viewValue) {
    		if (viewValue === "") {
    		    return null;
    		}
    		return viewValue;
    	    });
    	}
        };
    })