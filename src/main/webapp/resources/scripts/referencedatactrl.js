var app = angular.module('MyApp');

app.factory('refdata', [ '$resource', function($resource) {
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
  
app.controller('ReferenceDataCtrl', function ($scope, refdata, NgTableParams) {
	var self = this;
	self.result = [];
    self.tableParams = new NgTableParams({}, {
    	dataset: this.result
    });

    
    self.statusValues = [{id:"sync", title:"Sync"},{id:"out of sync", title:"Out of Sync"}];

	refdata.get().$promise.then(function(result) {
		alert("success");
	}, function(error) {
		var result = {"ReferenceData": [
		                                {
		                                    "mappingid": 1,
		                                    "referencetype": "DCSPROPERTY_NAME",
		                                    "codevalue": "businessAssociateId",
		                                    "synced": true
		                                 },
		                                    {
		                                    "mappingid": 83,
		                                    "referencetype": "ISOALPHA2_COUNTRYCODE",
		                                    "codevalue": "AL",
		                                    "synced": true
		                                 },
		                                    {
		                                    "mappingid": 83,
		                                    "referencetype": "ISOALPHA3_COUNTRYCODE",
		                                    "codevalue": "ALB",
		                                    "synced": true
		                                 },
		                                    {
		                                    "mappingid": 83,
		                                    "referencetype": "PERCANA_ISOCOUNTRYCODE",
		                                    "codevalue": "AL",
		                                    "synced": true
		                                 },
		                                    {
		                                    "mappingid": 107,
		                                    "referencetype": "ATG_ISOCOUNTRYCODE",
		                                    "codevalue": "BO",
		                                    "synced": true
		                                 },
		                                    {
		                                    "mappingid": 341,
		                                    "referencetype": "CIM_LANGUAGE",
		                                    "codevalue": "POL",
		                                    "synced": true
		                                 },
		                                    {
		                                    "mappingid": 342,
		                                    "referencetype": "CIM_LANGUAGE",
		                                    "codevalue": "NLD",
		                                    "synced": true
		                                 }
		                              ]}
		
		
		self.result = result.ReferenceData.map(function(item){
			item.status = item.synced?"sync":"out of sync";
			item.status.lableclass = item.sync?"label label-success":"label label-warning";
			return item;
	    });
		$scope.tableParams = new NgTableParams({}, { dataset:$scope.refdata  });

		
		self.tableParams.settings({
	        dataset: self.result
	      });
	});

});

