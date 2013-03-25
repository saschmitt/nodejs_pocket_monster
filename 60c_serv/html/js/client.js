jQuery(function ($){
	console.log('jQuery est reconnu');
	// Mode strict
	// 'use strict';
	
	/* Templates et divers */
	var contenu = {};
	var templateListeItem = '<div class="listeItem"><p>{{cible}}</p></div>';
	
	
	/* Code socket */
	var socket = io.connect('http://localhost:80');
	
	$('#Actualiser').click(function(event){
		socket.emit('t1');
	});
	
	socket.on('t2', function(){
		contenu.cible = 'Essais';
		$('#gestionMonde_liste').append(Mustache.render(templateListeItem, contenu));
	});
});