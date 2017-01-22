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

  
  
app.controller('QViewerCtrl', function ($scope, allq, NgTableParams, branchFactory, weekFactory) {
	var self = this;
	self.result = [];
	self.weeks = [];
	self.branches = [];
	self.branchId = "";
	self.weekId = "";
    self.tableParams = new NgTableParams({}, {
    	dataset: this.result
    });
    
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
    
    weekFactory.get().$promise.then(function(result) {
		alert("success");
	}, function(error) {
		var result = {"q": [ 
			{
				"weekId" : 1,
				"weekDesc" : "1 ม.ค. - 7 ม.ค. 2560",
			}, {
				"weekId" : 2,
				"weekDesc" : "8 ม.ค. - 14 ม.ค. 2560",
			}, {
				"weekId" : 3,
				"weekDesc" : "15 ม.ค. - 21 ม.ค. 2560",
			}, {
				"weekId" : 4,
				"weekDesc" : "22 ม.ค. - 29 ม.ค. 2560",
			}, {
				"weekId" : 5,
				"weekDesc" : "30 ม.ค. - 5 ก.พ. 2560",
			}, {
				"weekId" : 6,
				"weekDesc" : "6 ก.พ. - 13 ก.พ. 2560",
			}, {
				"weekId" : 7,
				"weekDesc" : "14 ก.พ. - 20 ก.พ. 2560",
			}, {
				"weekId" : 8,
				"weekDesc" : "21 ก.พ. - 28 ก.พ. 2560",
			}, {
				"weekId" : 9,
				"weekDesc" : "1 มี.ค. - 7 มี.ค. 2560",
			}, {
				"weekId" : 10,
				"weekDesc" : "8 มี.ค. - 16 มี.ค. 2560",
			}
		]};
		self.weeks = result.q;
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
		                                    "petitionNo": "P1233",
		                                    "petitionDate": "2017-02-05",
		                                    "accountNo": "A2222",
		                                    "isAvailable": true
		                                 },
		                                {
		                                    "weekId": 2,
		                                    "weekNoOfYear": 2,
		                                    "weekDesc": "7-14 ม.ค. 2560",
		                                    "branchId": "1",
		                                    "branchDesc": "02 - สาขาประชาชื่น",
		                                    "petitionNo": "P1232",
		                                    "petitionDate": "2017-04-01",
		                                    "accountNo": "A277",
		                                    "isAvailable": true
		                                 },
		                                {
		                                    "weekId": 3,
		                                    "weekNoOfYear": 3,
		                                    "weekDesc": "14-21 ม.ค. 2560",
		                                    "branchId": "1",
		                                    "branchDesc": "02 - สาขาประชาชื่น",
		                                    "petitionNo": "P1234",
		                                    "petitionDate": "2017-02-01",
		                                    "accountNo": "A132",
		                                    "isAvailable": true
		                                 },
		                                {
		                                    "weekId": 3,
		                                    "weekNoOfYear": 3,
		                                    "weekDesc": "14-21 ม.ค. 2560",
		                                    "branchId": "1",
		                                    "branchDesc": "04 - สาขาทุ่งมหาเมฆ",
		                                    "petitionNo": "P1235",
		                                    "petitionDate": "2017-01-01",
		                                    "accountNo": "A852",
		                                    "isAvailable": true
		                                 },
			                                {
			                                    "weekId": 3,
			                                    "weekNoOfYear": 3,
			                                    "weekDesc": "14-21 ม.ค. 2560",
			                                    "branchId": "1",
			                                    "branchDesc": "04 - สาขาทุ่งมหาเมฆ",
			                                    "petitionNo": "P1235",
			                                    "petitionDate": "2017-01-01",
			                                    "accountNo": "A852",
			                                    "isAvailable": true
			                                 }

		                              ]};
		
		
		self.result = result.q.map(function(item){
			item.status = item.isAvailable?"ว่าง":"เต็ม";
			item.status.labelclass = item.availability?"label label-success":"label label-warning";
			return item;
	    });
		$scope.tableParams = new NgTableParams({}, { dataset:$scope.allq  });
		
		self.tableParams.settings({
	        dataset: self.result
	      });
	});

});

