jQuery(function ($){
	console.log('jQuery est reconnu');
	// Mode strict
	// 'use strict';
	
	/* Templates et divers */
	var contenu = {};
	var templateListeItem = '<div class="listeItem"><p>{{nom}}</p></div>';
	
	
	/* Code socket */
	var socket = io.connect('http://localhost:80');
	
	socket.emit('demandeMonde');
	
	socket.on('recupereMonde', function(monde){
		$('#gestionMonde_liste').val('');
		contenu.nom = monde;
		$('#gestionMonde_liste').append(Mustache.render(templateListeItem, contenu));
	});
});