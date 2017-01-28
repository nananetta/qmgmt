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

app.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log, $location) {

 
});

app.service('qService', function() {
	  var qList = [];

	  var addQ = function(newObj) {
	      qList.push(newObj);
	  };

	  var getQ = function(){
	      return qList;
	  };

	  return {
	    addQ: addQt,
	    getQ: getQ
	  };

	});

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
  }])


app.controller('HomeCtrl', function ($scope) {});

app.config(function($routeProvider) {

  $routeProvider
    .when('/Audit Log', {
      templateUrl: 'auditlog.html',
      controller: 'AuditLogCtrl'
    })
    .when('/Configuration', {
      templateUrl: 'configuration.html',
      controller: 'ConfigurationCtrl'
    })
    .when('/Reference Data', {
      templateUrl: 'referencedata.html',
      controller: 'ReferenceDataCtrl'
    })
    .when('/Service Dependency', {
      templateUrl: 'dependency.html',
      controller: 'DependencyCtrl'
    })
    .otherwise({
      templateUrl: 'home.html',
      controller: 'HomeCtrl'
    });
  // configure html5 to get links working on jsfiddle  
//  $locationProvider.html5Mode({
//    enabled: true,
//    requireBase: false
//  });

});

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