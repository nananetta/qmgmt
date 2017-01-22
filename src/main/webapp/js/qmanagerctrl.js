var app = angular.module('MyApp');

app.factory('allq', [ '$resource', function($resource) {
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
	
	branchFactory.get().$promise.then(function(result) {
		alert("success");
	}, function(error) {
		var result = {"q": [ 
			{
				"branchId" : 1,
				"branchDesc" : "01 - สาขาประชาชื่น",
			}, {
				"branchId" : 2,
				"branchDesc" : "02 - สาขาทุ่งมหาเมฆ",
			}, {
				"branchId" : 3,
				"branchDesc" : "03 - สาขาแม้นศรี",
			}, {
				"branchId" : 4,
				"branchDesc" : "04 - สาขามหาสวัสดิ์",
			}, {
				"branchId" : 5,
				"branchDesc" : "05 - สาขาตากสิน",
			}, {
				"branchId" : 6,
				"branchDesc" : "06 - สาขาประชาชื่น",
			}, {
				"branchId" : 7,
				"branchDesc" : "07 - สาขาพญาไท",
			}
		]}
		self.branches = result.q;
	});

	allq.get().$promise.then(function(result) {
		alert("success");
	}, function(error) {
		var result = {"q": [
                            {
                                "weekId": 1,
                                "weekNoOfYear": 1,
                                "weekDesc": "1-7 ม.ค. 2560",
                                "branchId": "1",
                                "branchDesc": "02 - สาขาประชาชื่น",
                                "isAvailable": true
                             },
                            {
                                "weekId": 2,
                                "weekNoOfYear": 2,
                                "weekDesc": "7-14 ม.ค. 2560",
                                "branchId": "1",
                                "branchDesc": "02 - สาขาประชาชื่น",
                                "isAvailable": true
                             },
                            {
                                "weekId": 3,
                                "weekNoOfYear": 3,
                                "weekDesc": "14-21 ม.ค. 2560",
                                "branchId": "1",
                                "branchDesc": "02 - สาขาประชาชื่น",
                                "isAvailable": true
                             },
                            {
                                "weekId": 3,
                                "weekNoOfYear": 3,
                                "weekDesc": "14-21 ม.ค. 2560",
                                "branchId": "1",
                                "branchDesc": "04 - สาขาทุ่งมหาเมฆ",
                                "isAvailable": true
                             }

                          ]}
	});
	
	self.showInputDialog = function(ev) {
	    $mdDialog.show({
	      controller: DialogController,
	      controllerAs: 'dc',
	      templateUrl: 'inputDialog.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:false,
	      locals: {
	    	  branchId: self.branchId,
	    	  branches: self.branches,
	    	  reservedWeek: self.reservedWeek
	      },
	      fullscreen: true // Only for -xs, -sm breakpoints.
	    })
	    .then(function(result) {
	      console.log("result");
	    }, function() {
	      console.log("cancel");
	    });
	  };


	  function DialogController($scope, $mdDialog, branchId, branches, reservedWeek) {
		var self = this;
		self.branchId = branchId;
		self.branches = branches;
		self.reservedWeek = reservedWeek;
		self.accountNo = undefined;
		self.petitionNo = undefined;
		  
	    self.hide = function() {
	      $mdDialog.hide();
	    };

	    self.cancel = function() {
	      $mdDialog.cancel();
	    };

	    self.answer = function() {
	      $mdDialog.hide(self);
	    };
	  }

});

