var app = angular.module('MyApp');

app.factory('qmgr', [ '$resource', function($resource) {
    return $resource('/qmgmt/slot/search', {}, {
    	post : {
    	    method : 'POST',
    	    headers : {
    		'Accept' : 'application/json',
    		'Content-Type' : 'application/json'
    	    }
    	}
        });
    } ])

app.factory('pFactory', [ '$resource', function($resource) {
    return $resource('/qmgmt/petition/save', {}, {
    	save : {
    	    method : 'POST',
    	    headers : {
    		'Accept' : 'application/json',
    		'Content-Type' : 'application/json'
    	    }
    	}
        });
    } ])

app.controller('QManagerCtrl', function ($scope, $mdDialog, $mdToast, qmgr, branchFactory, pFactory) {
	var self = this;
	self.result = [];
	self.branches = [];
	self.branchId = undefined;
	self.reservedWeek = undefined;
	
	branchFactory.get().$promise.then(function(result) {
		self.branches = result.list;
	}, function(error) {
		console.log("error getting branchFactory "+ error);
	});

	self.selectBranch = function() {
		qmgr.post({branchId: self.branchId}).$promise.then(function(result) {
			self.result = result.list.map(function(item){
				item.status = item.availability>0?"ว่าง":"เต็ม";
				item.status.labelclass = item.availability?"label label-success":"label label-warning";
				item.branchId = self.branchId;
				var code = self.branches[self.branchId - 1].code;
				var text = self.branches[self.branchId - 1].description;
				item.branchText = code + " - "+ text;
				return item;
		    });

		}, function(error) {
			console.log("error getting qmgr "+error);
		});
	}
	
	self.showInputDialog = function(ev, branchId, weekId) {
	    $mdDialog.show({
	      controller: DialogController,
	      controllerAs: 'dc',
	      templateUrl: 'inputDialog.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:false,
	      locals: {
	    	  branchId: branchId,
	    	  branches: self.branches,
	    	  reservedWeek: weekId
	      },
	      fullscreen: true // Only for -xs, -sm breakpoints.
	    })
	    .then(function(result) {
	      console.log("result");
	    }, function() {
	      console.log("cancel");
	    });
	  };


	  function DialogController($scope, $mdDialog, $mdToast, branchId, branches, reservedWeek, pFactory) {
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
	    	
	    	if(self.accountNo == undefined || self.petitionNo == undefined) {
	    		$mdDialog.show(
	    	    	      $mdDialog.alert()
	    	    	        .parent(angular.element(document.querySelector('#popupContainer')))
	    	    	        .clickOutsideToClose(true)
	    	    	        .title('กรุณาระบุเลขทะเบียนผู้ใช้น้ำ และเลขที่คำร้อง')
	    	    	        .ok('ตกลง')
	    	    	        .targetEvent(ev)
	    	    	    );
	    		return;
	    	}
	    	
	    	var obj = {};
	    	obj.accountNo = self.accountNo;
	    	obj.petitionNo = self.petitionNo;
	    	obj.branch = {};
	    	obj.branch.id = self.branchId;
	    	obj.week = {};
	    	obj.week.id = self.reservedWeek;
	    	pFactory.save(obj).$promise.then(function(result) {
		      $mdDialog.hide(self);
	    	  $mdToast.show($mdToast.simple()
    			        .textContent('สร้างใบคำร้องแล้ว')
    			        .hideDelay(2000)
    			    );

			}, function(error) {
				console.log("error saving petition "+error);
			});
	    };
	  }

});

