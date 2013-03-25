jQuery(function ($){
	console.log('jQuery est reconnu');
	// Mode strict
	'use strict';
	
	/**
	** Variables
	**/
	var joueur_actif 					= 'Joueur1';
	var template_victoire 				= '<p>{{joueur}} a gagné !</p>';
	var cases 								= [
											['c00','c01','c02'],
											['c10','c11','c12'],
											['c20','c21','c22']
										];
	
	/**
	** Main
	**/
	$('.vierge').click(function(event){
		var caseCliquee = $(this).prop("id");
		
		for (var i = 0; i < cases.length; i++){
			for (var j = 0; j < cases.length; j++){
				if(cases[i][j] == caseCliquee){
					cases[i][j] 		= joueur_actif;
				}
			}
		}
		
		if (joueur_actif == 'Joueur1'){
			$(this).addClass('magenta');
			$(this).removeClass('vierge');
			controlerTerrain();
			joueur_actif 				= 'Joueur2';
			$('#joueur1').removeClass('joueur_actif');
			$('#joueur2').addClass('joueur_actif');
		}
		else if (joueur_actif == 'Joueur2'){
			$(this).addClass('jaune');
			$(this).removeClass('vierge');
			controlerTerrain();
			joueur_actif 				= 'Joueur1';
			$('#joueur2').removeClass('joueur_actif');
			$('#joueur1').addClass('joueur_actif');
		}
	});

	/**
	** Scripts - analyse du terrain et arret de partie
	**/
	// Arret de partie
	function arreterLaPartie(gagnant){
		if (gagnant == 0){
			$('#resultat').append("Match nul.");
		}
		else {
			if (gagnant == 'Joueur1'){
				resultat.joueur 	= 'Joueur 1';
			}else if (gagnant == 'Joueur2'){
				resultat.joueur 	= 'Joueur 2';
			}
			$('#resultat').append(Mustache.render(template_victoire, resultat));
		}
		$('#fin_de_partie').removeClass('cache');
	}
	
	// Analyse du terrain
	function controlerTerrain(){
		// Controle des lignes
		for ( var i = 0 ; i < cases.length ; i++ ){
			for ( var j = 0 ; j < cases.length ; j++ ){
				if(( cases[i][j] == cases[i][j+1] ) 
				&& ( cases[i][j] == cases[i][j+2] )){
					arreterLaPartie(joueur_actif);
					return 0;
				}
			}
		}
		// Controle des colonnes
		for ( var i = 0 ; i < 1 ; i++ ){
			for ( var j = 0 ; j < cases.length ; j++ ){
				if(( cases[i][j] == cases[i+1][j] ) 
				&& ( cases[i][j] == cases[i+2][j] )){
					arreterLaPartie(joueur_actif);
					return 0;
				}
			}
		}
		// Controle de la diagonale HG->BD
		if(( cases[0][0] == cases[1][1] ) 
		&& ( cases[1][1] == cases[2][2] )){
			arreterLaPartie(joueur_actif);
			return 0;
		}
		// Controle de la diagonale BG->HD
		if(( cases[2][0] == cases[1][1] ) 
		&& ( cases[1][1] == cases[0][2] )){
			arreterLaPartie(joueur_actif);
			return 0;
		}
		// controle des .vierge sur le terrain
		if ( $('.vierge').length == 0 ){
			arreterLaPartie('0');
		}
	}
});