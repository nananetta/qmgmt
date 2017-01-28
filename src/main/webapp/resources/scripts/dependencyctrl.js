var app = angular.module('MyApp');

app.factory('dependency', [ '$resource', function($resource) {
    return $resource('/rest/avvv/admin/devtools/services/refdata', {}, {
	get : {
	    method : 'GET',
	    headers : {
		'Accept' : 'application/json',
		'Content-Type' : 'application/json'
	    }
	}
    });
} ])

  
app.controller('DependencyCtrl', function ($scope, $http, dependency, NgTableParams) {
	var self = this;
	var raw = {};
	$scope.refList = [{"name":"ab"}];
    
	$scope.clear = function() {
	    self.refList = [{"name":"abcdef"}];
	}
	
	$scope.reload = function() {
		
		$http({
            method: 'GET',
            url: 'https://www.example.com/api/v1/page',
            params: 'limit=10, sort_by=created:desc',
            headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
        }).success(function(data){
            // With the data succesfully returned, call our callback
						alert("hello");
        }).error(function(){
        	raw = {
				    "dependent": {
				        "LOCK_STATUS": 2,
				        "isNotification": "false",
				        "isPub": "false",
				        "name": "Client/client.services:getClient_v1_0",
				        "paths": null,
				        "referencedBy": [
				            {
				                "LOCK_STATUS": 2,
				                "isNotification": "false",
				                "isPub": "false",
				                "name": "Client_/services:getClient_v1_0",
				                "paths": [
				                    "/Flow Path;1.0/INVOKE;0"
				                ],
				                "referencedBy": [
				                    {
				                        "LOCK_STATUS": 2,
				                        "isNotification": "false",
				                        "isPub": "false",
				                        "name": "Client/ws.provider.services:getClient_v1_0",
				                        "paths": [
				                            "/Flow Path;1.0/SEQUENCE;3/SEQUENCE;0/INVOKE;0"
				                        ]
				                    }
				                ],
				                "type": "flow/default"
				            }
				        ],
				        "type": "flow/default"
				    },
				    "node": "client.iservices:getClient_v1_0"
				};
			$scope.refList1 = new Array();
		    $scope.refList1.push(raw.dependent);
		    $scope.refList = $scope.refList1;
		    console.log($scope.refList);
		    console.log("added to tree");
        });
		
		
	}
	
	
});

