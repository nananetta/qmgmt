var app = angular.module('MyApp');

app.factory('qsearch', [ '$resource', function($resource) {
    return $resource('/qmgmt/petition/search', {}, {
	post : {
	    method : 'POST',
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
    ngTableDefaults.settings.counts = [];
  };
  
  
app.controller('QViewerCtrl', function ($scope, $mdDialog, $mdToast, qsearch, NgTableParams, branchFactory, weekFactory, currWeekFactory) {
	var self = this;
	self.result = [];
	self.weeks = [];
	self.branches = [];
	self.branchId = undefined;
	
	$scope.$on('roleCode', function(event, msg) {
	    self.branchId = msg;
	    if(msg!=undefined) {
		    self.branchAcct = true;
	    }
	  });
	
	self.weekId = undefined;
    self.tableParams = new NgTableParams({}, {
    	dataset: this.result
    });
    
	branchFactory.get().$promise.then(function(result) {
		self.branches = result.list;
	}, function(error) {
		console.log("error getting branchFactory");
	});
    
    weekFactory.get().$promise.then(function(result) {
    	self.weeks = result.list;
	}, function(error) {
		console.log("error getting weekFactory");
	});
    
    currWeekFactory.get().$promise.then(function(result) {
    	if(result!=undefined) {
        	self.weekId = result.id;
    	}
	}, function(error) {
		console.log("error getting currWeekFactory");
	});

    
    self.search = function(ev) {
    	
    	if(self.branchId == undefined || self.weekId == undefined) {
    	    $mdDialog.show(
    	      $mdDialog.alert()
    	        .parent(angular.element(document.querySelector('#popupContainer')))
    	        .clickOutsideToClose(true)
    	        .title('กรุณาระบุสาขา และสัปดาห์')
    	        .ok('ตกลง')
    	        .targetEvent(ev)
    	    );
      	  return;
    	};
    	qsearch.post({weekId: self.weekId, branchId: self.branchId}).$promise.then(function(result) {
    		if(result!=undefined && result.list!=undefined && result.list.length == 0) {
  	    	  $mdToast.show($mdToast.simple()
      			        .textContent('ไม่พบข้อมูล')
      			        .hideDelay(2000)
      			    );
    		}
        	self.result = result.list;
    		$scope.tableParams = new NgTableParams({}, { dataset:self.result  });
    		
    		self.tableParams.settings({
    	        dataset: self.result
    	      });
    	}, function(error) {
    		
    	});
    };


});

