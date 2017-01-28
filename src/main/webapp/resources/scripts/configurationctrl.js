var app = angular.module('MyApp');

app.factory('configs', [ '$resource', function($resource) {
    return $resource('/invoke/.admin.devtools.services/getConfig', {}, {
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
    ngTableDefaults.params.count = 20;
    ngTableDefaults.settings.counts = [20, 50, 100, 500];
  };
  
app.controller('ConfigurationCtrl', function ($scope, configs, NgTableParams) {
	var self = this;
	
	self.result = [];
    self.tableParams = new NgTableParams({}, {
    	dataset:this.result
    });
    
    self.statusValues = [{id:"sync", title:"Sync"},{id:"out of sync", title:"Out of Sync"}];

	configs.get().$promise.then(function(result) {
		alert("success");
	}, function(error) {
		var result = {
				   "selectConfigurationOutput": {"results":    [
				                                                {
				                                             "configID": 140547,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.ACCOUNTTRANSFERIN-INFORMATIONREQUESTREJECTED",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140549,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.ACCOUNTTRANSFERIN-REJECTED",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140550,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.TRANSFERINASSET-REJECTED",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140551,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.ACCOUNTTRANSFERIN-CONFIRMED",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140552,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.TRANSFERINASSET-CONFIRMED",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140553,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.PAYMENTIN-ADVICERECEIVED",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140554,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.ACCOUNTTRANSFERIN-COMPLETED",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140555,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.ACCOUNTTRANSFERIN-INFORMATIONREQUESTSENT",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140556,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.ACCOUNTTRANSFERIN-SENT",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140557,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.TRANSFERINASSET-SENT",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140558,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.INTERNALTRANSFER-SENT",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140559,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.INFORMATIONREQUEST-REQUESTED",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140560,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.INFORMATIONREQUEST-NOTIFIED",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140561,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.INFORMATIONREQUEST-SENT",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140563,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.ACCOUNTTRANSFEROUT-CREATED",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140565,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.ACCOUNTTRANSFEROUT-NOTIFIED",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140566,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.TRANSFEROUTASSET-CONFIRMED",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140567,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.ACCOUNTTRANSFEROUT-MARKTRANSFERASCOMPLETE",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140568,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.TRANSFEROUTASSET-SENT",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140569,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.ACCOUNTTRANSFEROUT-TRANSFERCOMPLETESENT",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140570,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.ACCOUNTTRANSFERIN-INFORMATIONRESPONSERECEIVED",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140571,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.TRANSFEROUTASSET-REJECTED",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 140572,
				                                             "configName": "AS_ATG",
				                                             "configKey": "NOTIFY_V1_0.VALIDATE.ACCOUNTTRANSFEROUT-TRANSFERCONFIRMATIONSENT",
				                                             "configValue": "Valid",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 26,
				                                             "configName": "BS_Financial_Taxation",
				                                             "configKey": "RetrieveTaxCode.TOKENTIMEOUT",
				                                             "configValue": "4",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 27,
				                                             "configName": "BS_Financial_Taxation",
				                                             "configKey": "RetrieveTaxCode.USERID.1234",
				                                             "configValue": "MockUserId",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 28,
				                                             "configName": "BS_Financial_Taxation",
				                                             "configKey": "RetrieveTaxCode.PASSWORD.1234",
				                                             "configValue": "MockPassword",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 30,
				                                             "configName": "BS_Financial_Taxation",
				                                             "configKey": "RetrieveTaxCode.WSTIMEOUT",
				                                             "configValue": "120000",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 133,
				                                             "configName": "BS_Financial_Taxation",
				                                             "configKey": "RetrieveTaxCode.PROTOCOL",
				                                             "configValue": "HTTPS",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 134,
				                                             "configName": "BS_Financial_Taxation",
				                                             "configKey": "RetrieveTaxCode.URLPATH",
				                                             "configValue": "dpsauthentication/service",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 177,
				                                             "configName": "BS_Financial_Taxation",
				                                             "configKey": "RetrieveTaxCode.Version",
				                                             "configValue": "1",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 178,
				                                             "configName": "BS_Financial_Taxation",
				                                             "configKey": "RetrieveTaxCode.VendorID.123/AN64312",
				                                             "configValue": "7173",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 179,
				                                             "configName": "BS_Financial_Taxation",
				                                             "configKey": "RetrieveTaxCode.Service",
				                                             "configValue": "PAYE",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 180,
				                                             "configName": "BS_Financial_Taxation",
				                                             "configKey": "RetrieveTaxCode.EntityType",
				                                             "configValue": "EmpRef",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 75651,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "commonAddress_v1_0.ADDRESS_FORMATTED_FAIL_CODE",
				                                             "configValue": "1101288",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 75652,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "commonAddress_v1_0.ADDRESS_FORMATTED_FAIL_TEXT",
				                                             "configValue": "Failed to format address due to lack of data.",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 75653,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "validateAddress_v1_0.MULTIPLE_ADDRESS_FOUND_CODE",
				                                             "configValue": "1101289",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 75654,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "validateAddress_v1_0.MULTIPLE_ADDRESS_FOUND_TEXT",
				                                             "configValue": "Multiple addresses are matched or this is an imprecise address.",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 75655,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "validateAddress_v1_0.NO_ADDRESS_FOUND_CODE",
				                                             "configValue": "1101290",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 75656,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "validateAddress_v1_0.NO_ADDRESS_FOUND_TEXT",
				                                             "configValue": "No address found.",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 75657,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "commonAddress_v1_0.ADDRESS_FORMATTED_SOAP_ERROR_CODE",
				                                             "configValue": "2201005",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 75658,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "commonAddress_v1_0.ADDRESS_FORMATTED_SOAP_ERROR_TEXT",
				                                             "configValue": "Failed to format address due to possibly intermittent error.",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 75659,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "findAddress_v1_0.MORE_INFORMATION_REQUIRED_CODE",
				                                             "configValue": "2201003",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 75660,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "findAddress_v1_0.MORE_INFORMATION_REQUIRED_TEXT",
				                                             "configValue": "Further information required.",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 75661,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "findAddress_v1_0.NO_ADDRESS_FOUND_CODE",
				                                             "configValue": "2201004",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 75662,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "findAddress_v1_0.NO_ADDRESS_FOUND_TEXT",
				                                             "configValue": "No address found.",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 199,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "commonAddress_v1_0.EQAS_AUTHENTICATE_COREPASSWORD",
				                                             "configValue": "123",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 200,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "commonAddress_v1_0.EQAS_AUTHENTICATE_COREUSERNAME",
				                                             "configValue": "cUsername",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 201,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "commonAddress_v1_0.EQAS_AUTHENTICATE_NON_COREPASSWORD",
				                                             "configValue": "111",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 202,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "commonAddress_v1_0.EQAS_AUTHENTICATE_NON_COREUSERNAME",
				                                             "configValue": "nuser",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 203,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "commonAddress_v1_0.EQAS_PROXYOBJECT_COREPASSWORD",
				                                             "configValue": "222",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 204,
				                                             "configName": "BS_Support_Address",
				                                             "configKey": "commonAddress_v1_0.EQAS_PROXYOBJECT_PORT",
				                                             "configValue": "port",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 30982,
				                                             "configName": "Legacy_BS_Quote",
				                                             "configKey": "CACHE_MANAGER_NAME",
				                                             "configValue": ".Legacy.Quote",
				                                             "sync": true
				                                          },
				                                                {
				                                             "configID": 30983,
				                                             "configName": "Legacy_BS_Quote",
				                                             "configKey": "GENEREATEQUOTE_CACHE_NAME",
				                                             "configValue": "GenerateQuote",
				                                             "sync": false
				                                          }
				                                       ]}
				                                    }; 
		
		
		self.result = result.selectConfigurationOutput.results.map(function(item){
			item.status = item.sync?"sync":"out of sync";
			item.status.lableclass = item.sync?"label label-success":"label label-warning";
			return item;
	    });
		$scope.tableParams = new NgTableParams({}, { dataset:$scope.configs  });

		
		self.tableParams.settings({
	        dataset: self.result
	      });
	});

});

