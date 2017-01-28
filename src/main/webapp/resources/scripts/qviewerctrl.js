var app = angular.module('MyApp');

app.factory('allq', [ '$resource', function($resource) {
    return $resource('/qmgmt/petition/getAll', {}, {
	get : {
	    method : 'GET',
	    headers : {
		'Accept' : 'application/json',
		'Content-Type' : 'application/json'
	    }
	}
    });
} ])

app.factory('qsearch', [ '$resource', function($resource) {
    return $resource('/qmgmt/petition/search', {weekId: '@_weekId'}, {
	get : {
	    method : 'GET',
	    headers : {
		'Accept' : 'application/json',
		'Content-Type' : 'application/json'
	    }
	}
    });
} ])

app.run(configureDefaults);
  configureDefaults.$inject = ["ngTableDefaults"];

  
  
app.controller('QViewerCtrl', function ($scope, allq, qsearch, NgTableParams, branchFactory, weekFactory) {
	var self = this;
	self.result = [];
	self.weeks = [];
	self.branches = [];
	self.branchId = "";
	self.weekId = "";
    self.tableParams = new NgTableParams({}, {
    	dataset: this.result
    });
    
//	branchFactory.get().$promise.then(function(result) {
//		self.branches = result.list;
//	}, function(error) {
//		console.log("error getting branchFactory");
//	});
//    
//    weekFactory.get().$promise.then(function(result) {
//    	self.weeks = result.list;
//	}, function(error) {
//		console.log("error getting weekFactory");
//	});

//    qsearch.get({weekId: self.weekId}).$promise.then(function(result) {
//    	self.result = result.list.map(function(item){
//			item.status = item.isAvailable?"ว่าง":"เต็ม";
//			item.status.labelclass = item.availability?"label label-success":"label label-warning";
//			return item;
//	    });
//		$scope.tableParams = new NgTableParams({}, { dataset:$scope.allq  });
//		
//		self.tableParams.settings({
//	        dataset: self.result
//	      });
//	}, function(error) {
//		
//	});

});

