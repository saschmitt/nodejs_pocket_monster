jQuery(function ($){
	console.log('jQuery est reconnu');
	// Mode strict
	// 'use strict';
	
	  /***********************/
	 /* Templates et divers */
	/***********************/
	var contenu 						= {};
	var templateListeItem 				= '<div class="listeItem" id="{{id}}"><p>{{nom}}</p></div>';
	var templateFamilleItem 			= '<div class="listeItem" id="{{id}}"><p>{{nom}} ({{nbMonstresActuels}}/{{nbMonstresMax}})</p></div>';
	var templateCreationMonde 			= '<h2>Création</h2>'
				+'<form action="#" id="formCreerMonde">'
					+'Création de Monde.'
					+'<input type="text" id="nomMonde" placeholder="Entrez le nom" />'
					+'<input type="submit" id="creerMonde" value="Créer" />'
				+'</form>';
	var templateCreationFamille 		= '<h2>Création</h2>'
				+'<form action="#" id="formCreerFamille">'
					+'Création de Famille.'
					+'<input type="text" id="nomFamille" placeholder="Entrez le nom" />'
					+'<input type="text" id="nbMonstresMax" placeholder="nbMonstresMax" />'
					+'<input type="submit" id="creerFamille" value="Créer" />'
				+'</form>';
	var templateCreationMonstre 		= '<h2>Création</h2>'
				+'<form action="#" id="formCreerMonstre">'
					+'Création de Monstre.'
					+'<input type="text" id="nomMonstre" placeholder="Entrez le nom" />'
					// +'<input type="text" id="origineMonstre" placeholder="Origine du monstre" />'
					+'<input type="submit" id="creerFamille" value="Créer" />'
				+'</form>';
	
	/* Code socket */
	var socket 							= io.connect();
	
	
	/*******************
	**
	** AFFICHAGE CONTENU
	**
	*******************/
		  /************************/
		 /* Récupérer les mondes */
		/************************/
		recuperer('mondes');
		socket.on('recupereMonde', function(contenu){
			$('#gestionMonde_liste').append(Mustache.render(templateListeItem, contenu));
		});
		
		  /**************************/
		 /* Récupérer les familles */
		/**************************/
		$('#gestionMonde_liste').on('click', '.listeItem', function(event){
				/* Changer la sélection */
			$('#gestionMonde_liste .selection').removeClass('selection');
			$(this).addClass('selection');
			
			recuperer('familles');
		});
		socket.on('recupereFamille', function(contenu){
			$('#gestionFamille_liste').append(Mustache.render(templateFamilleItem, contenu));
		});
		
		  /**************************/
		 /* Récupérer les monstres */
		/**************************/
		$('#gestionFamille_liste').on('click', '.listeItem', function(event){
				/* Changer la sélection */
			$('#gestionFamille_liste .selection').removeClass('selection');
			$(this).addClass('selection');
			
			recuperer('monstres');
		});
		socket.on('recupereMonstre', function(contenu){
			$('#gestionMonstre_liste').append(Mustache.render(templateListeItem, contenu));
		});
		  /*********************/
		 /* Sélection monstre */
		/*********************/
		$('#gestionMonstre_liste').on('click', '.listeItem', function(event){
				/* Changer la sélection */
			$('#gestionMonstre_liste .selection').removeClass('selection');
			$(this).addClass('selection');
		});
		
		  /*************/
		 /* Affichage */
		/*************/
		socket.on('afficherMonde', function(){
			recuperer('mondes');
		});
		socket.on('afficherFamille', function(){
			recuperer('familles');
		});
		socket.on('afficherMonstre', function(){
			recuperer('monstres');
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
			if ($('#gestionMonde_liste .selection').length > 0){
				var aSupprimer 					= {};
				aSupprimer.idMonde 				= $('#gestionMonde_liste .selection').prop("id");
				socket.emit('aSupprimerMonde', aSupprimer);
			}
		});
		  /*********************/
		 /* Supprimer famille */
		/*********************/
		$('#supprimerFamille').on('click', function(event){
			if ($('#gestionFamille_liste .selection').length > 0){
				var aSupprimer 					= {};
				aSupprimer.idMonde 				= $('#gestionMonde_liste .selection').prop("id");
				aSupprimer.idFamille 			= $('#gestionFamille_liste .selection').prop("id");
				socket.emit('aSupprimerFamille', aSupprimer);
			}
		});
		  /*********************/
		 /* Supprimer monstre */
		/*********************/
		$('#supprimerMonstre').on('click', function(event){
			if ($('#gestionMonstre_liste .selection').length > 0){
				var aSupprimer 					= {};
				aSupprimer.idMonde 				= $('#gestionMonde_liste .selection').prop("id");
				aSupprimer.idFamille 			= $('#gestionFamille_liste .selection').prop("id");
				aSupprimer.idMonstre 			= $('#gestionMonstre_liste .selection').prop("id");
				socket.emit('aSupprimerMonstre', aSupprimer);
			}
		});
	
	
	/**********************
	**
	** RECUPERATION CONTENU
	**
	**********************/
		function recuperer(cible){
			var idMonde 					= $('#gestionMonde_liste .selection').prop("id");
			var idFamille 					= $('#gestionFamille_liste .selection').prop("id");
			var idMonstre 					= $('#gestionMonstre_liste .selection').prop("id");
			if (cible == 'mondes'){
				$('#gestionMonde_liste').empty();
				$('#gestionFamille_liste').empty();
				$('#gestionMonstre_liste').empty();
				socket.emit('demandeMonde');
			} else if (cible == 'familles') {
				$('#gestionFamille_liste').empty();
				$('#gestionMonstre_liste').empty();
				socket.emit('demandeFamille', idMonde);
			} else if (cible == 'monstres') {
				$('#gestionMonstre_liste').empty();
				socket.emit('demandeMonstre', idMonde, idFamille);
			}
		}
	
	
	/******************
	**
	** CREATION CONTENU
	**
	******************/
		  /**********************/
		 /* Détection du click */
		/**********************/
		$('#creerFormMonde').on('click', function(event){
			creerForm('monde');
			$('#nomMonde').focus();
		});
		$('#creerFormFamille').on('click', function(event){
			creerForm('famille');
			$('#nomFamille').focus();
		});
		$('#creerFormMonstre').on('click', function(event){
			creerForm('monstre');
			$('#nomMonstre').focus();
		});
		  /***********************************/
		 /* Fonction d'insertion du contenu */
		/***********************************/
		function creerForm(cible){
			if(cible === 'monde'){
				$('#zoneCreation').empty();
				$('#zoneCreation').append(templateCreationMonde);
			} else if (cible === 'famille'){
				$('#zoneCreation').empty();
				$('#zoneCreation').append(templateCreationFamille);
			} else if (cible === 'monstre'){
				$('#zoneCreation').empty();
				$('#zoneCreation').append(templateCreationMonstre);
			}
		}
		  /****************************/
		 /* Communication au serveur */
		/****************************/
		$('#zoneCreation').on('submit', '#formCreerMonde', function(event){
			var aCreer 						= {};
			aCreer.nom 						= $('#nomMonde').val();
			socket.emit('aCreerMonde', aCreer);
			$('#nomMonde').val('');
		});
		$('#zoneCreation').on('submit', '#formCreerFamille', function(event){
			if ($('#gestionMonde_liste .selection').length > 0){
				var aCreer 						= {};
				aCreer.nom 						= $('#nomFamille').val();
				aCreer.nbMonstresMax 			= $('#nbMonstresMax').val();
				aCreer.idMonde 					= $('#gestionMonde_liste .selection').prop("id");
				socket.emit('aCreerFamille', aCreer);
				$('#nomFamille').val('');
				$('#nbMonstresMax').val('');
			}
		});
		$('#zoneCreation').on('submit', '#formCreerMonstre', function(event){
			if ($('#gestionFamille_liste .selection').length > 0){
				var aCreer 						= {};
				aCreer.nom 						= $('#nomMonstre').val();
				aCreer.idMonde 					= $('#gestionMonde_liste .selection').prop("id");
				aCreer.idFamille 				= $('#gestionFamille_liste .selection').prop("id");
				socket.emit('aCreerMonstre', aCreer);
				$('#nomMonstre').val('');
			}
		});
});