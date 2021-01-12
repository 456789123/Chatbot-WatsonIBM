app.controller("appCtrl", function ( $scope, appService, $anchorScroll, $location ) {

    $scope.mostrar = false;
    $scope.stiloChat = "circulo_chat";
	$scope.textInput = '';
	$scope.watsonResposta = '';
	$scope.fixar = '';
	$scope.contao = new Object( );
 
	var enviar = function( ) {
		appService.getEnviarMensagem($scope.textInput).then( function( success ){
			$scope.watsonResposta = success.data.output.text[0];
			mensagemPrint('watson', $scope.watsonResposta );
		}, function(error){
			console.log("Aconteceu um problema com o Watson!!");
		});
		$scope.textInput = '';
	}

    $scope.aparecerDesaparecer = function( ) {
        $scope.mostrar = !$scope.mostrar;
        console.log($scope.mostrar);
    }

    $scope.cursoCima = function( ) {
        $scope.stiloChat = "circulo_chat_1";
    }

    $scope.cursoSair = function( ) {
        $scope.stiloChat = "circulo_chat";
    }


	var mensagemPrint = function( usuario, mensagemTela ) {
		$scope.fixar = 'fixar' + document.getElementById('usuarioChat').scrollHeight;
		angular.element(document.getElementById('usuarioChat')).append('<div class="from-'+usuario+'"><div id="'+$scope.fixar+'" class="message-inner"><p id="msg_texto">'+mensagemTela+'</p></div></div>');
		if ($location.hash() !== $scope.fixar)
			$location.hash($scope.fixar);
		else
			$anchorScroll();
	}
	
	$scope.enviarTexto = function( ) {
		if ( event.keyCode === 13 ) {
			mensagemPrint('user', $scope.textInput );
			enviar( );
		}
	}


	$scope.enviarMensagemContato = function( contato ) {
		appService.getPostEnviarContato(contato).then( function( success ){
		}, function(error){
			console.log("Aconteceu um problema ao enviar informações do contato.");
		});
		
		$scope.contato = new Object( );
	}

	

	enviar( );
	
});

