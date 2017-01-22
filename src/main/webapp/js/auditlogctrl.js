angular.module('MyApp').controller('AuditLogCtrl', function ($scope) { 
	$scope.user = {
		      title: 'Developer',
		      email: 'ipsum@lorem.com',
		      firstName: '',
		      lastName: '',
		      company: 'Google',
		      address: '1600 Amphitheatre Pkwy',
		    	 state: ''
	}
	
	$scope.messageTypes = [undefined, 'INBOUND_REQUEST', 'OUTBOUND_REQUEST', 'INBOUND_RESPONSE', 'OUTBOUND_RESPONSE', 'INTERNAL_ERROR', 'EXTERNAL_ERROR'].map(function(messageType) {
        return {desc: messageType};
	});
});