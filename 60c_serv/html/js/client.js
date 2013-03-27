jQuery(function ($){
	console.log('jQuery est reconnu');
	// Mode strict
	// 'use strict';
	
	/* Templates et divers */
	var contenu 						= {};
	var templateListeItem 				= '<div class="listeItem" id="{{id}}"><p>{{nom}}</p></div>';
	
	
	/* Code socket */
	var socket 							= io.connect('http://localhost:80');
	
	
	/*******************
	**
	** AFFICHAGE CONTENU
	**
	*******************/
	/************************/
	/* Récupérer les mondes */
	/************************/
	socket.emit('demandeMonde');
	
	socket.on('recupereMonde', function(idMonde, nomMonde){
		contenu.id 						= idMonde;
		contenu.nom 					= nomMonde;
		$('#gestionMonde_liste').append(Mustache.render(templateListeItem, contenu));
	});
	
	/**************************/
	/* Récupérer les familles */
	/**************************/
	$('#gestionMonde_liste').on('click', '.listeItem', function(event){
			/* Changer la sélection */
		$('#gestionMonde_liste .selection').removeClass('selection');
		$(this).addClass('selection');
		
			/* Effacer les familles */
		$('#gestionFamille_liste').empty();
		$('#gestionMonstre_liste').empty();
		
			/* Récupérer l'ID du monde sélectionné et l'envoyer au serveur */
		idMonde 						= $(this).prop("id");
		socket.emit('demandeFamille', idMonde);
	});
	
	socket.on('recupereFamille', function(idFamille, nomFamille){
		contenu.id 						= idFamille;
		contenu.nom 					= nomFamille;
		$('#gestionFamille_liste').append(Mustache.render(templateListeItem, contenu));
	});
	
	/**************************/
	/* Récupérer les monstres */
	/**************************/
	$('#gestionFamille_liste').on('click', '.listeItem', function(event){
			/* Changer la sélection */
		$('#gestionFamille_liste .selection').removeClass('selection');
		$(this).addClass('selection');
		
			/* Effacer les monstres */
		$('#gestionMonstre_liste').empty();
		
			/* Récupérer l'ID du monde et de la famille et l'envoyer au serveur */
		var idMonde 					= $('#gestionMonde_liste .selection').prop("id");
		var idFamille 					= $('#gestionFamille_liste .selection').prop("id");
		socket.emit('demandeMonstre', idMonde, idFamille);
	});
	
	socket.on('recupereMonstre', function(idMonstre, nomMonstre){
		contenu.id 						= idMonstre;
		contenu.nom 					= nomMonstre;
		$('#gestionMonstre_liste').append(Mustache.render(templateListeItem, contenu));
	});
	
	
	$('#gestionMonstre_liste').on('click', '.listeItem', function(event){
			/* Changer la sélection */
		$('#gestionMonstre_liste .selection').removeClass('selection');
		$(this).addClass('selection');
	});
		
	/*********************
	**
	** SUPPRESSION CONTENU
	**
	*********************/
	/*******************/
	/* Supprimer monde */
	/*******************/
	$('#supprimerMonde').on('click', function(event){
		var idMonde 					= $('#gestionMonde_liste .selection').prop("id");
		socket.emit('aSupprimerMonde', idMonde);
	});
	socket.on('okSupprimerMonde', function(idMonde){
		$('#gestionMonstre_liste').empty();
		$('#gestionFamille_liste').empty();
		$('#gestionMonde_liste #'+idMonde).remove();
	});
	/*********************/
	/* Supprimer famille */
	/*********************/
	$('#supprimerFamille').on('click', function(event){
		var idMonde 					= $('#gestionMonde_liste .selection').prop("id");
		var idFamille 					= $('#gestionFamille_liste .selection').prop("id");
		socket.emit('aSupprimerFamille', idMonde, idFamille);
	});
	socket.on('okSupprimerFamille', function(idFamille){
		$('#gestionMonstre_liste').empty();
		$('#gestionFamille_liste #'+idFamille).remove();
	});
	/*********************/
	/* Supprimer monstre */
	/*********************/
	$('#supprimerMonstre').on('click', function(event){
		var idMonde 					= $('#gestionMonde_liste .selection').prop("id");
		var idFamille 					= $('#gestionFamille_liste .selection').prop("id");
		var idMonstre					= $('#gestionMonstre_liste .selection').prop("id");
		socket.emit('aSupprimerMonstre', idMonde, idFamille, idMonstre);
	});
	socket.on('okSupprimerMonstre', function(idMonstre){
		$('#gestionMonstre_liste #'+idMonstre).remove();
	});
});