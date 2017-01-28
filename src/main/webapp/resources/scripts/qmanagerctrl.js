var app = angular.module('MyApp');

app.factory('allq', [ '$resource', function($resource) {
    return $resource('/qmgmt/week/getAll', {}, {
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

  function configureDefaults(ngTableDefaults) {
    ngTableDefaults.params.count = 10;
    ngTableDefaults.settings.counts = [10, 20, 50];
  };
  
app.controller('QManagerCtrl', function ($scope, allq, branchFactory, $mdDialog) {
	var self = this;
	self.result = [];
	self.branchId = "";
	self.reservedWeek = "";
	
//	branchFactory.get().$promise.then(function(result) {
//		self.branches = result.list;
//	}, function(error) {
//		console.log("error getting branchFactory");
//	});
//
//	allq.get().$promise.then(function(result) {
//		self.branches = result.list;
//	}, function(error) {
//		console.log("error getting allq");
//	});
//	
//	self.showInputDialog = function(ev) {
//	    $mdDialog.show({
//	      controller: DialogController,
//	      controllerAs: 'dc',
//	      templateUrl: 'inputDialog.tmpl.html',
//	      parent: angular.element(document.body),
//	      targetEvent: ev,
//	      clickOutsideToClose:false,
//	      locals: {
//	    	  branchId: self.branchId,
//	    	  branches: self.branches,
//	    	  reservedWeek: self.reservedWeek
//	      },
//	      fullscreen: true // Only for -xs, -sm breakpoints.
//	    })
//	    .then(function(result) {
//	      console.log("result");
//	    }, function() {
//	      console.log("cancel");
//	    });
//	  };
//
//
//	  function DialogController($scope, $mdDialog, branchId, branches, reservedWeek) {
//		var self = this;
//		self.branchId = branchId;
//		self.branches = branches;
//		self.reservedWeek = reservedWeek;
//		self.accountNo = undefined;
//		self.petitionNo = undefined;
//		  
//	    self.hide = function() {
//	      $mdDialog.hide();
//	    };
//
//	    self.cancel = function() {
//	      $mdDialog.cancel();
//	    };
//
//	    self.answer = function() {
//	      $mdDialog.hide(self);
//	    };
//	  }

});

