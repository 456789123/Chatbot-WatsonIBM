angular.module("app").factory("appService", function($http) {

	var baseUrl = 'http://localhost:3000';

	var _getEnviarMensagem = function ( mensagem ) {
		return $http.get( baseUrl + '/conversation/' + mensagem );
	};

	var _getPostEnviarContato = function ( contato ) {
		return $http.post( baseUrl + '/contato', contato );
	}

	return {
		getEnviarMensagem: _getEnviarMensagem,
		getPostEnviarContato: _getPostEnviarContato
	};
});